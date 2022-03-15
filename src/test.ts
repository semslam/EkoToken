import "./providers/config";
import ekotokenReportGeneratorService from "./services/ekotoken-report-generator.service";
const test = async () => {
    await ekotokenReportGeneratorService.generateReport().then(() => {
        console.log("EkotokenReportGeneratorService Tested");
    });
    process.exit(0);
}
test()
