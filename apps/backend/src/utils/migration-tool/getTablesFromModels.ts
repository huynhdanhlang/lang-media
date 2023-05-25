import type {
  Model,
  ModelAttributeColumnOptions,
  ModelStatic
} from "sequelize/types";
import type { Sequelize } from "sequelize-typescript";
import { makeColumnName } from "./makeColumnName";
import parseIndex from "./parseIndex";
import reverseSequelizeColType from "./reverseSequelizeColType";
import reverseSequelizeDefValueType from "./reverseSequelizeDefValueType";

export type ReverseModelsOptions = {
  useSnakeCase?: boolean;
}

export default function reverseModels(
  sequelize: Sequelize,
  models: Record<string, ModelStatic<Model>>,
  options: ReverseModelsOptions = {},
) {
  const tables = {};
  for (const [, model] of Object.entries(models)) {
    const attributes: {
      [key: string]: ModelAttributeColumnOptions;
    } = model.rawAttributes;

    const resultAttributes = {};

    for (const [column, attribute] of Object.entries(attributes)) {
      let rowAttribute: { [x: string]: unknown } = {};

      if (attribute.defaultValue) {
        const _val = reverseSequelizeDefValueType(attribute.defaultValue);
        if (_val.notSupported) {
          console.log(
            `[Not supported] Skip defaultValue column of attribute ${model}:${column}`
          );
        }
        rowAttribute.defaultValue = _val;
      }

      if (attribute.type === undefined) {
        console.log(
          `[Not supported] Skip column with undefined type ${model}:${column}`
        );
        continue;
      }

      const seqType: string = reverseSequelizeColType(
        sequelize,
        attribute.type
      );
      if (seqType === "Sequelize.VIRTUAL") {
        console.log(
          `[SKIP] Skip Sequelize.VIRTUAL column "${column}"", defined in model "${model}"`
        );
        continue;
      }

      rowAttribute = {
        seqType,
      };
      [
        "allowNull",
        "unique",
        "primaryKey",
        "autoIncrement",
        "autoIncrementIdentity",
        "comment",
        "references",
        "onUpdate",
        "onDelete",
        // "validate",
      ].forEach((key) => {
        if (attribute[key] !== undefined) rowAttribute[key] = attribute[key];
      });

      resultAttributes[makeColumnName(column, options.useSnakeCase)] = rowAttribute;
    } // attributes in model

    tables[model.tableName] = {
      tableName: model.tableName,
      schema: resultAttributes,
    };

    const indexOut: { [x: string]: unknown } = {};
    if (
      model.options &&
      model.options.indexes &&
      model.options.indexes.length > 0
    )
      for (const _i in model.options.indexes) {
        const index = parseIndex(model.options.indexes[_i]);
        indexOut[`${index.hash}`] = index;
        delete index.hash;
      }

    tables[model.tableName].indexes = indexOut;
  } // model in models

  return tables;
}
