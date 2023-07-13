import { TableQuery } from "azure-storage";
import { eg, getTableService } from "./common";

const tableName = "users";
const currentPartition = "2023";

export async function setRegisteredUser(user: string) {
  const hasUser = await getRegisteredUser(user);

  if (!hasUser) {
    await new Promise<void>((resolve, reject) => {
      const ts = getTableService();

      ts.insertEntity(
        tableName,
        {
          PartitionKey: eg.String(currentPartition),
          RowKey: eg.String(encodeURIComponent(user.toLowerCase())),
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

export function getRegisteredUser(user: string) {
  return new Promise<string>((resolve, reject) => {
    const userId = encodeURIComponent(user.toLowerCase());
    const q = new TableQuery()
      .where(`PartitionKey eq ? && RowKey eq ?`, currentPartition, userId)
      .top(1);
    const ts = getTableService();

    ts.queryEntities(tableName, q, undefined!, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.entries.map((e: any) => e.RowKey._)[0]);
      }
    });
  });
}

export function getRegisteredUsers() {
  return new Promise<Array<string | undefined>>((resolve, reject) => {
    const q = new TableQuery().where("PartitionKey eq ?", currentPartition);
    const ts = getTableService();

    ts.queryEntities(tableName, q, undefined!, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.entries.map((e: any) => e.RowKey._));
      }
    });
  });
}
