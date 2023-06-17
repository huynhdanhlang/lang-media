import axios from 'axios';
import { HTTP_METHOD } from 'next/dist/server/web/http';

const SERVER_PATH = process.env.NEXT_PUBLIC_BASE_API;
interface IFetcher {
  url: string;
  method: HTTP_METHOD;
  data: any;
  isApiServer: boolean;
}
export const fetcher = async (options: IFetcher) => {
  const { data, method, url, isApiServer } = options;
  const config = {
    baseURL: isApiServer ? SERVER_PATH + url : url,
  };

  if (method == 'GET') {
    config['params'] = data;
  } else {
    config['data'] = data;
    config['method'] = method;
  }
  return await axios.request(config);
};
