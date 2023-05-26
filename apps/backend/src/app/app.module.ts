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
import { join } from 'path';
import { VideoModule } from '../video/video.module';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CacheModule.register({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const cache = config.get('cache');
        const driver = config.get(cache.driver);
        // Later, if needed, create a cache factory to instantiate different drivers based on config.
        if (cache.driver === 'redis') {
          return {
            ttl: ms(cache.ttl), // using ms package to parse 15m to timestamp.
            store: require('cache-manager-redis-store'),
            host: driver.host,
            port: driver.port,
            isGlobal: true,
          };
        }
        return {
          ttl: ms(cache.ttl),
          isGlobal: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/backend/src/schema.graphql'),
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/backend/src/graphqlTypes.ts'),
        outputAs: 'interface',
      },
      // schema.gql will automatically be created
      playground: true,
    }),
    VideoModule,
    TagModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule {}
