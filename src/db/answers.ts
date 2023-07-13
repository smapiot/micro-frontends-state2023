import { TableQuery } from "azure-storage";
import { eg, getTableService } from "./common";
import { setRegisteredUser } from "./users";

const tableName = "answers2023";

export function setQuestionResponse(
  user: string,
  question: string,
  answer: string
) {
  setRegisteredUser(user);

  return new Promise<void>((resolve, reject) => {
    const ts = getTableService();

    ts.insertOrReplaceEntity(
      tableName,
      {
        PartitionKey: eg.String(question),
        RowKey: eg.String(encodeURIComponent(user.toLowerCase())),
        Answer: eg.String(answer),
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

export function getQuestionResponse(user: string, question: string) {
  return new Promise<string | undefined>((resolve, reject) => {
    const userId = encodeURIComponent(user.toLowerCase());
    const q = new TableQuery()
      .where(`PartitionKey eq ? && RowKey eq ?`, question, userId)
      .top(1);
    const ts = getTableService();

    ts.queryEntities(tableName, q, undefined!, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.entries.map((e: any) => e.Answer._)[0]);
      }
    });
  });
}
