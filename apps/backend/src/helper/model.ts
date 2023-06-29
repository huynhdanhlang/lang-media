import { WhereOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';

interface IServiceCheckExisted<T> {
  where: WhereOptions<T>;
  service: typeof Model<T>;
}
export async function checkIsExisted<T>(options: IServiceCheckExisted<T>) {
  const { where, service } = options;
  // @ts-ignore
  return await service.findOne<T>({
    where,
  });
}
