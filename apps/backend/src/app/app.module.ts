import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { HttpCacheInterceptor } from '../utils/cache-manager.interceptor';
import ms from 'ms';
import { UserModule } from '../user/user.module';
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
    UserModule
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
