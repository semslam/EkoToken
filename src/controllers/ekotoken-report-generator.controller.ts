import Express from "express";
import service from "../services/ekotoken-report-generator.service";
export default async (req: Express.Request, res: Express.Response) => {
    console.log("processing ekotoken report generator request");
    queueMicrotask(async () => {
        try {
            await service.generateReport();
        } catch (error) {
            console.log("Error occure while generating report");
        }
    })
    res.send("Accepted");
}