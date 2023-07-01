import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
const sequelizeSymbol = ['like', 'in', 'ne', 'eq', 'iLike'];
interface IInjectSequelizeFunc {
  where?: any;
  notNulls?: any[];
}

function setNotNullField(where: any, notNulls: any[]) {
  if(!notNulls) return where;
  notNulls.forEach((key) => {
    where = Object.assign(where, {
      [key]: {
        [Op.ne]: null,
      },
    });
  });
  return where;
}

function injectSequelizeFunc(options: IInjectSequelizeFunc) {
  const { notNulls, where = {} } = options;
  let whereToQuery = Object.assign(where, {});
  whereToQuery = setNotNullField(whereToQuery, notNulls);
  if (isEmpty(whereToQuery)) {
    return whereToQuery;
  }
  Object.entries(whereToQuery).forEach(([key, value]) => {
    if (typeof value !== 'string') {
      sequelizeSymbol.forEach((symbol) => {
        if (value[symbol]) {
          if (symbol === 'like' || symbol === 'iLike') {
            whereToQuery[key] = {
              [Op[symbol]]: `%${value[symbol]}%`,
            };
          } else {
            whereToQuery[key] = {
              [Op[symbol]]: value[symbol],
            };
          }
        }
      });
    }
  });
  return whereToQuery;
}

export { injectSequelizeFunc };
