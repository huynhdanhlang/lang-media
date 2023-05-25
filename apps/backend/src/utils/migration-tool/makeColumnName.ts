import { snakeCase } from "./snakeCase";

export const makeColumnName = (classPropertyName: string, useSnakeCase?: boolean): string => {
  return useSnakeCase ? snakeCase(classPropertyName) : classPropertyName;
};
