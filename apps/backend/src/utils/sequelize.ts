import { Attributes, Model, Op, WhereOptions } from 'sequelize';
const sequelizeSymbol = ['like', 'in', 'ne', 'eq', 'iLike'];
function injectSequelizeFunc(where: any, notNulls = []) {
  if (!where) return where;
  let whereToQuery = Object.assign(where, {});

  Object.entries(where).forEach(([key, value]) => {
    notNulls.forEach((key) => {
      whereToQuery = Object.assign(whereToQuery, {
        [key]: {
          [Op.ne]: null,
        },
      });
    });
    if (typeof value !== 'string') {
      sequelizeSymbol.forEach((symbol) => {
        if (value[symbol]) {
          if (symbol === 'like' || symbol === 'iLike') {
            where[key] = {
              [Op[symbol]]: `%${value[symbol]}%`,
            };
          } else {
            where[key] = {
              [Op[symbol]]: value[symbol],
            };
          }
        }
      });
    }
  });
  return where;
}

export { injectSequelizeFunc };
