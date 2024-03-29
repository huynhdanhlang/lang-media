import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { HttpCacheInterceptor } from '../utils/cache-manager.interceptor';
import ms from 'ms';
import { UserModule } from '../user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { join, resolve } from 'path';
import { VideoModule } from '../video/video.module';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { RoleModule } from '../role/role.module';
import { LoggingPlugin } from '../utils/apollo.logging';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { AuthenticationModule } from '../authentication/authentication.module';
import * as Joi from 'joi';
import { ThrottlerModule } from '@nestjs/throttler';
// import { TeleClientModule } from '../tele-client/tele-client.module';
import { R2ClientModule } from '../r2-client/r2-client.module';
import { Void } from '../utils/graphql';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NX_JWT_SECRET: Joi.string().required(),
        NX_JWT_EXPIRATION_TIME: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    CacheModule.register({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        const ttl = config.get('NX_CACHE_TTL');
        const driver = config.get('NX_CACHE_DRIVER');
        // Later, if needed, create a cache factory to instantiate different drivers based on config.
        if (driver === 'redis') {
          return {
            ttl: ms(ttl), // using ms package to parse 15m to timestamp.
            store: require('cache-manager-redis-store'),
            host: driver.host,
            port: driver.port,
            isGlobal: true,
          };
        }
        return {
          ttl: ms(ttl),
          isGlobal: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const maxAge = parseInt(configService.get('NX_GRAPHQL_CACHE_MAX_AGE'));
        const apolloConfig: ApolloDriverConfig = {
          autoSchemaFile: join(
            process.cwd(),
            'apps/backend/src/graphql/schema.graphql'
          ),
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(
              process.cwd(),
              'apps/backend/src/graphql/graphqlTypes.ts'
            ),
            outputAs: 'interface',
          },
          // schema.gql will automatically be created
          playground: {
            endpoint: configService.get("GRAPHQL_ENDPOINT"),
          },
          plugins: [
            ApolloServerPluginCacheControl({ defaultMaxAge: maxAge }),
            responseCachePlugin(),
          ],
          context: ({ req, res }) => ({ req, res }),
        };
        return apolloConfig;
      },
    }),
    VideoModule,
    TagModule,
    CategoryModule,
    RoleModule,
    AuthenticationModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    // TeleClientModule,
    R2ClientModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: HttpCacheInterceptor,
    },
    LoggingPlugin,
  ],
})
export class AppModule {}
