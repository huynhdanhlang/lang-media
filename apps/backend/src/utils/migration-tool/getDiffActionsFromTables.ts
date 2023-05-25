import { diff } from "deep-diff";

import sortActions from "./sortActions";
import { Json } from "../../constant/migrate.const";

export interface IAction {
  actionType:
    | "addColumn"
    | "addIndex"
    | "changeColumn"
    | "createTable"
    | "dropTable"
    | "removeColumn"
    | "removeIndex";
  tableName: string;
  attributes?: any;
  attributeName?: any;
  options?: any;
  columnName?: any;
  fields?: any[];
  depends: string[];
}

export default function getDiffActionsFromTables(
  previousStateTables: Json,
  currentStateTables: Json
) {
  const actions: IAction[] = [];
  const differences = diff(previousStateTables, currentStateTables);

  if (!differences) return actions;

  console.log(differences);

  differences.forEach((df) => {
    if (!df.path) throw new Error("Missing path");

    switch (df.kind) {
      // add new
      case "N":
        {
          // new table created
          if (df.path.length === 1) {
            const depends: string[] = [];
            const tableName = df.rhs.tableName as string;

            Object.values(df.rhs.schema).forEach((v: any) => {
              if (v.references) depends.push(v.references.model as string);
            });

            actions.push({
              actionType: "createTable",
              tableName,
              attributes: df.rhs.schema,
              options: {},
              depends,
            });

            // create indexes
            if (df.rhs.indexes)
              for (const i in df.rhs.indexes) {
                const copied = JSON.parse(JSON.stringify(df.rhs.indexes[i]));

                actions.push({
                  actionType: "addIndex",
                  tableName,
                  depends: [tableName],
                  ...copied,
                });
              }

            break;
          }

          const tableName = df.path[0];
          const depends = [tableName];

          if (df.path[1] === "schema") {
            // if (df.path.length === 3) - new field
            if (df.path.length === 3) {
              // new field
              if (df.rhs && df.rhs.references)
                depends.push(df.rhs.references.model);

              actions.push({
                actionType: "addColumn",
                tableName,
                attributeName: df.path[2],
                options: df.rhs,
                depends,
              });
              break;
            }

            // if (df.path.length > 3) - add new attribute to column (change col)
            if (df.path.length > 3)
              if (df.path[1] === "schema") {
                // new field attributes
                const options =
                  currentStateTables[tableName].schema[df.path[2]];

                if (options.references) depends.push(options.references.nodel);

                actions.push({
                  actionType: "changeColumn",
                  tableName,
                  attributeName: df.path[2],
                  options,
                  depends,
                });
                break;
              }
          }

          // new index
          if (df.path[1] === "indexes" && df.rhs) {
            const tableName = df.path[0];
            const copied = df.rhs
              ? JSON.parse(JSON.stringify(df.rhs))
              : undefined;
            const index = copied;

            index.actionType = "addIndex";
            index.tableName = tableName;
            index.depends = [tableName];
            actions.push(index);
            break;
          }
        }
        break;

      // drop
      case "D":
        {
          const tableName = df.path[0];

          if (df.path.length === 1) {
            // drop table
            const depends: string[] = [];
            Object.values(df.lhs.schema).forEach((v: any) => {
              if (v.references) depends.push(v.references.model);
            });

            actions.push({
              actionType: "dropTable",
              tableName,
              depends,
            });
            break;
          }

          if (df.path[1] === "schema") {
            // if (df.path.length === 3) - drop field
            if (df.path.length === 3) {
              // drop column
              actions.push({
                actionType: "removeColumn",
                tableName,
                columnName: df.path[2],
                depends: [tableName],
              });
              break;
            }

            // if (df.path.length > 3) - drop attribute from column (change col)
            if (df.path.length > 3) {
              const depends = [tableName];
              // new field attributes
              const options = currentStateTables[tableName].schema[df.path[2]];
              if (options.references) depends.push(options.references.model);

              actions.push({
                actionType: "changeColumn",
                tableName,
                attributeName: df.path[2],
                options,
                depends,
              });
              break;
            }
          }

          if (df.path[1] === "indexes" && df.lhs) {
            actions.push({
              actionType: "removeIndex",
              tableName,
              fields: df.lhs.fields,
              options: df.lhs.options,
              depends: [tableName],
            });
            break;
          }
        }
        break;

      // edit
      case "E":
        {
          const tableName = df.path[0];
          const depends = [tableName];

          if (df.path[1] === "schema") {
            // new field attributes
            const options = currentStateTables[tableName].schema[df.path[2]];
            if (options.references) depends.push(options.references.nodel);

            actions.push({
              actionType: "changeColumn",
              tableName,
              attributeName: df.path[2],
              options,
              depends,
            });
          }
        }
        break;

      // array change indexes
      case "A":
        console.log(
          "[Not supported] Array model changes! Problems are possible. Please, check result more carefully!"
        );
        console.log("[Not supported] Difference: ");
        console.log(JSON.stringify(df, null, 4));
        break;

      default:
        // code
        break;
    }
  });

  const result = sortActions(actions);

  return result;
}
