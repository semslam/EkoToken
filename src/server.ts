import "./providers/config";
import * as express from "express";
import ekoTokenReportGeneratorController from "./controllers/ekotoken-report-generator.controller";

const port = Number(process.env.PORT || 3000);
const app = express.default();
app.use(express.json())
app.use("/ekotoken-report-generator", ekoTokenReportGeneratorController);
app.listen(port, () => {
    console.log("App Started on port", port);
});
