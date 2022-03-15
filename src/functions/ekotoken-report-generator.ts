import { https } from "firebase-functions";
import ekotokenReportGenerator from "../controllers/ekotoken-report-generator.controller";
export default https.onRequest(ekotokenReportGenerator);