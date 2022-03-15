import Bookshelf from "bookshelf";
import { EkoTokenReport } from "../models/ekotoken-report.model";
import { mailClient } from "./email.service";
import { sdk as FelaSdk } from "./fela.service";
import writeXlsxFile from 'write-excel-file/node';
import { dbConnection } from "./db.service";
import { Stream } from "stream";

export const fetchReportRequests = async () => {
    return await EkoTokenReport.fetchAll().then((q) => q.where(
        "status", "=", 0).fetch()).then(((r) => r.models || []));
}
export const fetchReport = async (request: Bookshelf.Model<any>) => {
    const params: any = {};
    if (request.attributes.query_params) {
        const [startDate, endDate] = request.attributes.query_params.split("|");
        params.startDate = startDate;
        params.endDate = endDate
    }
    try {
        console.log("FetchReport params", params);
        const result = await FelaSdk.get("/custom/mtnEkotokenReport", {
            params
        });
        if (!result.data || !result.data.data)
            return [];
        return result.data.data;
    } catch (error) {
        console.log("Error while fetching report", error);
        return [];
    }

}
export const excelSchema = [
    // Column #1
    {
        column: 'Description',
        type: String,
        value: (report: any) => report.description
    },
    // Column #2
    {
        column: 'Channel Name',
        type: String,
        value: (report: any) => report.channelName
    },
    // Column #3
    {
        column: 'Service',
        type: String,
        value: (report: any) => report.service
    },
    // Column #4
    {
        column: 'Recipient',
        type: String,
        value: (report: any) => report.recipient
    },
    // Column #5
    {
        column: 'Network',
        type: String,
        value: (report: any) => report.network
    },
    // Column #6
    {
        column: 'Amount',
        type: Number,
        format: '#,##0.00',
        value: (report: any) => Number(report.amount)
    },
    // Column #7
    {
        column: 'Merchant Ref',
        type: String,
        value: (report: any) => report.merchantRef
    },
    // Column #8
    {
        column: 'Confirm Code',
        type: String,
        value: (report: any) => report.confirmCode
    },
    // Column #9
    {
        column: 'Created At',
        type: Date,
        format: 'mm/dd/yyyy hh:mm:ss',
        value: (report: any) => new Date(report.createdAt)
    }
]
export const reportToExcel = async (reportId: any, report: any[] = []) => {
    console.log("processing report #" + reportId, report.length);
    if (!report || (Array.isArray(report) && report.length == 0)) return null;
    return await writeXlsxFile(report, { schema: excelSchema }) as Stream;
};
export const sendReport = async (request: Bookshelf.Model<any>, report: any[], excel: any) => {
    if (excel) return await sendReportWithExcel(request, report, excel);
    return await sendEmptyReport(request, report);
}
export const generateEmptyReportBody = (request: Bookshelf.Model<any>) =>
    `<div style ="background-color:white; border:1px solid black; border-radius:5px; text-align:center">
    <h2>Hi ${request.attributes.created_by}</h2>
    <p>Your request for selected date range ${request.attributes.query_params.split("|")} returns empty report</p> 
    <p>Request id ${request.attributes.Id}</p>
</div>
`;
export const sendEmptyReport = async (request: Bookshelf.Model<any>, report: any[]) => {
    return new Promise((resolve, reject) => mailClient.sendMail({
        to: process.env.RECIPIENT_MAIL || request.attributes.recipient_email,
        subject: "Ekotoken Report #" + request.attributes.Id,
        html: generateEmptyReportBody(request),
        from: process.env.MAIL_FROM,
        replyTo: process.env.MAIL_REPLY_TO,
    }, (error, info) => {
        if (error) return reject(error);
        resolve(info);
    }));
}
export const generateReportWithExcelBody = (request: Bookshelf.Model<any>) =>
    `<div style ="background-color:white; border:1px solid black; border-radius:5px; text-align:center">
    <h2>Hi ${request.attributes.created_by}</h2>
    <p>Your report is ready</p> 
    <p>Request id ${request.attributes.Id}</p>
</div>`;
export const sendReportWithExcel = async (request: Bookshelf.Model<any>, report: any[], excel: any) => {
    const prefix = process.env.EKOTOKEN_REPORT_FILE_PREFIX || "Ekotoken-mtn-vas-sales-report-";
    return new Promise((resolve, reject) => mailClient.sendMail({
        to: process.env.RECIPIENT_MAIL || request.attributes.recipient_email,
        subject: "Ekotoken Report #" + request.attributes.Id,
        html: generateReportWithExcelBody(request),
        attachments: [
            {
                filename: prefix + request.attributes.query_params.replace("|", "-") + "-" + request.attributes.Id + ".xlsx",
                content: excel,
            }
        ],
        from: process.env.MAIL_FROM,
        replyTo: process.env.MAIL_REPLY_TO,
    }, (error, info) => {
        if (error) return reject(error);
        resolve(info);
    }));
}
export const queueReportTask = (request: Bookshelf.Model<any>) => new Promise<void>((resolve) => queueMicrotask(async () => {
    try {
        const report = await fetchReport(request);
        const excel = await reportToExcel(request.attributes.Id, report);
        const info = await sendReport(request, report, excel);
        console.log("Report sent info:", info);
        request.set("status", 1);
        await updateReportRequestStatus(request.attributes.Id, 1);
    } catch (error) {
        console.log("Error while processing request", error);
        await updateReportRequestStatus(request.attributes.Id, 0);
    }
    resolve()
}))
export const updateReportRequestStatus = (id: number, status: number) => dbConnection(process.env.EKOTOKEN_REPORT_TABLE)
    .where("id", "=", id)
    .update({ status, });
export const generateReport = async () => {
    if (process.env.TEST_CONTROL_ID) {
        await updateReportRequestStatus(Number(process.env.TEST_CONTROL_ID), 0);
    }
    const requests = await fetchReportRequests();
    const tasks: Promise<void>[] = [];
    if (requests.length == 0) {
        console.log("Empty Generate Report Request Tasks");
    }
    for (const request of requests) {
        console.log("processing request", request.attributes);
        await updateReportRequestStatus(request.attributes.Id, 2);
        tasks.push(queueReportTask(request));
    }
    await Promise.all(tasks);
}
export default {
    fetchReport,
    generateReport
}