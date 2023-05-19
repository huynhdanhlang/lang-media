import { CACHE_TTL_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import {
  Injectable,
  ExecutionContext,
  CACHE_KEY_METADATA,
  CallHandler,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { isNil, isFunction } from 'lodash';
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected cachedRoutes = new Map();
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    const ttlValueOrFactory =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    if (!key) {
      return next.handle();
    }
    try {
      const value = await this.cacheManager.get(key);
      if (!isNil(value)) {
        return of(value);
      }
      const ttl = isFunction(ttlValueOrFactory)
        ? await ttlValueOrFactory(context)
        : ttlValueOrFactory;
      return next.handle().pipe(
        tap((response) => {
          const args = isNil(ttl) ? [key, response] : [key, response, { ttl }];
          this.cacheManager.set(...args);
        })
      );
    } catch {
      return next.handle();
    }
  }

  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    // if there is no request, the incoming request is graphql, therefore bypass response caching.
    // later we can get the type of request (query/mutation) and if query get its field name, and attributes and cache accordingly. Otherwise, clear the cache in case of the request type is mutation.
    if (!request) {
      return undefined;
    }
    const { httpAdapter } = this.httpAdapterHost;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler()
    );

    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }
    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
    if (!isGetRequest) {
      setTimeout(async () => {
        for (const values of this.cachedRoutes.values()) {
          for (const value of values) {
            // you don't need to worry about the cache manager as you are extending their interceptor which is using caching manager as you've seen earlier.
            await this.cacheManager.del(value);
          }
        }
      }, 0);
      return undefined;
    }
    // to always get the base url of the incoming get request url.
    const key = httpAdapter.getRequestUrl(request).split('?')[0];
    if (
      this.cachedRoutes.has(key) &&
      !this.cachedRoutes.get(key).includes(httpAdapter.getRequestUrl(request))
    ) {
      this.cachedRoutes.set(key, [
        ...this.cachedRoutes.get(key),
        httpAdapter.getRequestUrl(request),
      ]);
      return httpAdapter.getRequestUrl(request);
    }
    this.cachedRoutes.set(key, [httpAdapter.getRequestUrl(request)]);
    return httpAdapter.getRequestUrl(request);
  }
}
