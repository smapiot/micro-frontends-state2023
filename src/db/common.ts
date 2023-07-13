import { createTableService, TableUtilities } from "azure-storage";

export function getTableService() {
  const ts = createTableService(process.env.DB_NAME!, process.env.DB_PASS!);
  return ts;
}

export const eg = TableUtilities.entityGenerator;
