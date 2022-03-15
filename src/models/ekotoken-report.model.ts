import { dbClient } from "../services/db.service";
export const EkoTokenReport = dbClient.model('EkoTokenReport', {
  tableName: process.env.EKOTOKEN_REPORT_TABLE,
});