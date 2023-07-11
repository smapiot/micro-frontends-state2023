import { createTableService, TableQuery } from "azure-storage";

export function getRegisteredUsers() {
  return new Promise<Array<string>>((resolve, reject) => {
    const q = new TableQuery().where("PartitionKey eq '2023'");
    const ts = createTableService(process.env.DB_NAME!, process.env.DB_PASS!);
    ts.queryEntities("users", q, undefined!, (err, result) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (err) {
        reject(err);
      } else {
        resolve(result.entries.map((e: any) => e.rowKey));
      }
    });
  });
}
