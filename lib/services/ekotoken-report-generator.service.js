"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.updateReportRequestStatus = exports.queueReportTask = exports.sendReportWithExcel = exports.generateReportWithExcelBody = exports.sendEmptyReport = exports.generateEmptyReportBody = exports.sendReport = exports.reportToExcel = exports.excelSchema = exports.fetchReport = exports.fetchReportRequests = void 0;
const ekotoken_report_model_1 = require("../models/ekotoken-report.model");
const email_service_1 = require("./email.service");
const fela_service_1 = require("./fela.service");
const node_1 = __importDefault(require("write-excel-file/node"));
const db_service_1 = require("./db.service");
const fetchReportRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ekotoken_report_model_1.EkoTokenReport.fetchAll().then((q) => q.where("status", "=", 0).fetch()).then(((r) => r.models || []));
});
exports.fetchReportRequests = fetchReportRequests;
const fetchReport = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {};
    if (request.attributes.query_params) {
        const [startDate, endDate] = request.attributes.query_params.split("|");
        params.startDate = startDate;
        params.endDate = endDate;
    }
    try {
        console.log("FetchReport params", params);
        const result = yield fela_service_1.sdk.get("/custom/mtnEkotokenReport", {
            params
        });
        if (!result.data || !result.data.data)
            return [];
        return result.data.data;
    }
    catch (error) {
        console.log("Error while fetching report", error);
        return [];
    }
});
exports.fetchReport = fetchReport;
exports.excelSchema = [
    // Column #1
    {
        column: 'Description',
        type: String,
        value: (report) => report.description
    },
    // Column #2
    {
        column: 'Channel Name',
        type: String,
        value: (report) => report.channelName
    },
    // Column #3
    {
        column: 'Service',
        type: String,
        value: (report) => report.service
    },
    // Column #4
    {
        column: 'Recipient',
        type: String,
        value: (report) => report.recipient
    },
    // Column #5
    {
        column: 'Network',
        type: String,
        value: (report) => report.network
    },
    // Column #6
    {
        column: 'Amount',
        type: Number,
        format: '#,##0.00',
        value: (report) => Number(report.amount)
    },
    // Column #7
    {
        column: 'Merchant Ref',
        type: String,
        value: (report) => report.merchantRef
    },
    // Column #8
    {
        column: 'Confirm Code',
        type: String,
        value: (report) => report.confirmCode
    },
    // Column #9
    {
        column: 'Created At',
        type: Date,
        format: 'mm/dd/yyyy hh:mm:ss',
        value: (report) => new Date(report.createdAt)
    }
];
const reportToExcel = (reportId, report = []) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("processing report #" + reportId, report.length);
    if (!report || (Array.isArray(report) && report.length == 0))
        return null;
    return yield (0, node_1.default)(report, { schema: exports.excelSchema });
});
exports.reportToExcel = reportToExcel;
const sendReport = (request, report, excel) => __awaiter(void 0, void 0, void 0, function* () {
    if (excel)
        return yield (0, exports.sendReportWithExcel)(request, report, excel);
    return yield (0, exports.sendEmptyReport)(request, report);
});
exports.sendReport = sendReport;
const generateEmptyReportBody = (request) => `<div style ="background-color:white; border:1px solid black; border-radius:5px; text-align:center">
    <h2>Hi ${request.attributes.created_by}</h2>
    <p>Your request for selected date range ${request.attributes.query_params.split("|")} returns empty report</p> 
    <p>Request id ${request.attributes.Id}</p>
</div>
`;
exports.generateEmptyReportBody = generateEmptyReportBody;
const sendEmptyReport = (request, report) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => email_service_1.mailClient.sendMail({
        to: process.env.RECIPIENT_MAIL || request.attributes.recipient_email,
        subject: "Ekotoken Report #" + request.attributes.Id,
        html: (0, exports.generateEmptyReportBody)(request),
        from: process.env.MAIL_FROM,
        replyTo: process.env.MAIL_REPLY_TO,
    }, (error, info) => {
        if (error)
            return reject(error);
        resolve(info);
    }));
});
exports.sendEmptyReport = sendEmptyReport;
const generateReportWithExcelBody = (request) => `<div style ="background-color:white; border:1px solid black; border-radius:5px; text-align:center">
    <h2>Hi ${request.attributes.created_by}</h2>
    <p>Your report is ready</p> 
    <p>Request id ${request.attributes.Id}</p>
</div>`;
exports.generateReportWithExcelBody = generateReportWithExcelBody;
const sendReportWithExcel = (request, report, excel) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => email_service_1.mailClient.sendMail({
        to: process.env.RECIPIENT_MAIL || request.attributes.recipient_email,
        subject: "Ekotoken Report #" + request.attributes.Id,
        html: (0, exports.generateReportWithExcelBody)(request),
        attachments: [
            {
                filename: "Ekotoken-Report-" + request.attributes.Id + ".xlsx",
                content: excel,
            }
        ],
        from: process.env.MAIL_FROM,
        replyTo: process.env.MAIL_REPLY_TO,
    }, (error, info) => {
        if (error)
            return reject(error);
        resolve(info);
    }));
});
exports.sendReportWithExcel = sendReportWithExcel;
const queueReportTask = (request) => new Promise((resolve) => queueMicrotask(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield (0, exports.fetchReport)(request);
        const excel = yield (0, exports.reportToExcel)(request.attributes.Id, report);
        const info = yield (0, exports.sendReport)(request, report, excel);
        console.log("Report sent info:", info);
        request.set("status", 1);
        yield (0, exports.updateReportRequestStatus)(request.attributes.Id, 1);
    }
    catch (error) {
        console.log("Error while processing request", error);
        yield (0, exports.updateReportRequestStatus)(request.attributes.Id, 0);
    }
    resolve();
})));
exports.queueReportTask = queueReportTask;
const updateReportRequestStatus = (id, status) => (0, db_service_1.dbConnection)(process.env.EKOTOKEN_REPORT_TABLE)
    .where("id", "=", id)
    .update({ status, });
exports.updateReportRequestStatus = updateReportRequestStatus;
const generateReport = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.TEST_CONTROL_ID) {
        yield (0, exports.updateReportRequestStatus)(Number(process.env.TEST_CONTROL_ID), 0);
    }
    const requests = yield (0, exports.fetchReportRequests)();
    const tasks = [];
    if (requests.length == 0) {
        console.log("Empty Generate Report Request Tasks");
    }
    for (const request of requests) {
        console.log("processing request", request.attributes);
        yield (0, exports.updateReportRequestStatus)(request.attributes.Id, 2);
        tasks.push((0, exports.queueReportTask)(request));
    }
    yield Promise.all(tasks);
});
exports.generateReport = generateReport;
exports.default = {
    fetchReport: exports.fetchReport,
    generateReport: exports.generateReport
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWtvdG9rZW4tcmVwb3J0LWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2Vrb3Rva2VuLXJlcG9ydC1nZW5lcmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyRUFBaUU7QUFDakUsbURBQTZDO0FBQzdDLGlEQUFnRDtBQUNoRCxpRUFBa0Q7QUFDbEQsNkNBQTRDO0FBR3JDLE1BQU0sbUJBQW1CLEdBQUcsR0FBUyxFQUFFO0lBQzFDLE9BQU8sTUFBTSxzQ0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDdEQsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQyxDQUFBLENBQUE7QUFIWSxRQUFBLG1CQUFtQix1QkFHL0I7QUFDTSxNQUFNLFdBQVcsR0FBRyxDQUFPLE9BQTZCLEVBQUUsRUFBRTtJQUMvRCxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFDdkIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRTtRQUNqQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtLQUMzQjtJQUNELElBQUk7UUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FB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QVcsRUFBWCxtQkFBVztJQUNYLGNBQWMsRUFBZCxzQkFBYztDQUNqQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvb2tzaGVsZiBmcm9tIFwiYm9va3NoZWxmXCI7XG5pbXBvcnQgeyBFa29Ub2tlblJlcG9ydCB9IGZyb20gXCIuLi9tb2RlbHMvZWtvdG9rZW4tcmVwb3J0Lm1vZGVsXCI7XG5pbXBvcnQgeyBtYWlsQ2xpZW50IH0gZnJvbSBcIi4vZW1haWwuc2VydmljZVwiO1xuaW1wb3J0IHsgc2RrIGFzIEZlbGFTZGsgfSBmcm9tIFwiLi9mZWxhLnNlcnZpY2VcIjtcbmltcG9ydCB3cml0ZVhsc3hGaWxlIGZyb20gJ3dyaXRlLWV4Y2VsLWZpbGUvbm9kZSc7XG5pbXBvcnQgeyBkYkNvbm5lY3Rpb24gfSBmcm9tIFwiLi9kYi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdHJlYW0gfSBmcm9tIFwic3RyZWFtXCI7XG5cbmV4cG9ydCBjb25zdCBmZXRjaFJlcG9ydFJlcXVlc3RzID0gYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiBhd2FpdCBFa29Ub2tlblJlcG9ydC5mZXRjaEFsbCgpLnRoZW4oKHEpID0+IHEud2hlcmUoXG4gICAgICAgIFwic3RhdHVzXCIsIFwiPVwiLCAwKS5mZXRjaCgpKS50aGVuKCgocikgPT4gci5tb2RlbHMgfHwgW10pKTtcbn1cbmV4cG9ydCBjb25zdCBmZXRjaFJlcG9ydCA9IGFzeW5jIChyZXF1ZXN0OiBCb29rc2hlbGYuTW9kZWw8YW55PikgPT4ge1xuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHJlcXVlc3QuYXR0cmlidXRlcy5xdWVyeV9wYXJhbXMpIHtcbiAgICAgICAgY29uc3QgW3N0YXJ0RGF0ZSwgZW5kRGF0ZV0gPSByZXF1ZXN0LmF0dHJpYnV0ZXMucXVlcnlfcGFyYW1zLnNwbGl0KFwifFwiKTtcbiAgICAgICAgcGFyYW1zLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgcGFyYW1zLmVuZERhdGUgPSBlbmREYXRlXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmV0Y2hSZXBvcnQgcGFyYW1zXCIsIHBhcmFtcyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZlbGFTZGsuZ2V0KFwiL2N1c3RvbS9tdG5Fa290b2tlblJlcG9ydFwiLCB7XG4gICAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzdWx0LmRhdGEgfHwgIXJlc3VsdC5kYXRhLmRhdGEpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgZmV0Y2hpbmcgcmVwb3J0XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxufVxuZXhwb3J0IGNvbnN0IGV4Y2VsU2NoZW1hID0gW1xuICAgIC8vIENvbHVtbiAjMVxuICAgIHtcbiAgICAgICAgY29sdW1uOiAnRGVzY3JpcHRpb24nLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHZhbHVlOiAocmVwb3J0OiBhbnkpID0+IHJlcG9ydC5kZXNjcmlwdGlvblxuICAgIH0sXG4gICAgLy8gQ29sdW1uICMyXG4gICAge1xuICAgICAgICBjb2x1bW46ICdDaGFubmVsIE5hbWUnLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHZhbHVlOiAocmVwb3J0OiBhbnkpID0+IHJlcG9ydC5jaGFubmVsTmFtZVxuICAgIH0sXG4gICAgLy8gQ29sdW1uICMzXG4gICAge1xuICAgICAgICBjb2x1bW46ICdTZXJ2aWNlJyxcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICB2YWx1ZTogKHJlcG9ydDogYW55KSA9PiByZXBvcnQuc2VydmljZVxuICAgIH0sXG4gICAgLy8gQ29sdW1uICM0XG4gICAge1xuICAgICAgICBjb2x1bW46ICdSZWNpcGllbnQnLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHZhbHVlOiAocmVwb3J0OiBhbnkpID0+IHJlcG9ydC5yZWNpcGllbnRcbiAgICB9LFxuICAgIC8vIENvbHVtbiAjNVxuICAgIHtcbiAgICAgICAgY29sdW1uOiAnTmV0d29yaycsXG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgdmFsdWU6IChyZXBvcnQ6IGFueSkgPT4gcmVwb3J0Lm5ldHdvcmtcbiAgICB9LFxuICAgIC8vIENvbHVtbiAjNlxuICAgIHtcbiAgICAgICAgY29sdW1uOiAnQW1vdW50JyxcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBmb3JtYXQ6ICcjLCMjMC4wMCcsXG4gICAgICAgIHZhbHVlOiAocmVwb3J0OiBhbnkpID0+IE51bWJlcihyZXBvcnQuYW1vdW50KVxuICAgIH0sXG4gICAgLy8gQ29sdW1uICM3XG4gICAge1xuICAgICAgICBjb2x1bW46ICdNZXJjaGFudCBSZWYnLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHZhbHVlOiAocmVwb3J0OiBhbnkpID0+IHJlcG9ydC5tZXJjaGFudFJlZlxuICAgIH0sXG4gICAgLy8gQ29sdW1uICM4XG4gICAge1xuICAgICAgICBjb2x1bW46ICdDb25maXJtIENvZGUnLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHZhbHVlOiAocmVwb3J0OiBhbnkpID0+IHJlcG9ydC5jb25maXJtQ29kZVxuICAgIH0sXG4gICAgLy8gQ29sdW1uICM5XG4gICAge1xuICAgICAgICBjb2x1bW46ICdDcmVhdGVkIEF0JyxcbiAgICAgICAgdHlwZTogRGF0ZSxcbiAgICAgICAgZm9ybWF0OiAnbW0vZGQveXl5eSBoaDptbTpzcycsXG4gICAgICAgIHZhbHVlOiAocmVwb3J0OiBhbnkpID0+IG5ldyBEYXRlKHJlcG9ydC5jcmVhdGVkQXQpXG4gICAgfVxuXVxuZXhwb3J0IGNvbnN0IHJlcG9ydFRvRXhjZWwgPSBhc3luYyAocmVwb3J0SWQ6IGFueSwgcmVwb3J0OiBhbnlbXSA9IFtdKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJwcm9jZXNzaW5nIHJlcG9ydCAjXCIgKyByZXBvcnRJZCwgcmVwb3J0Lmxlbmd0aCk7XG4gICAgaWYgKCFyZXBvcnQgfHwgKEFycmF5LmlzQXJyYXkocmVwb3J0KSAmJiByZXBvcnQubGVuZ3RoID09IDApKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXdhaXQgd3JpdGVYbHN4RmlsZShyZXBvcnQsIHsgc2NoZW1hOiBleGNlbFNjaGVtYSB9KSBhcyBTdHJlYW07XG59O1xuZXhwb3J0IGNvbnN0IHNlbmRSZXBvcnQgPSBhc3luYyAocmVxdWVzdDogQm9va3NoZWxmLk1vZGVsPGFueT4sIHJlcG9ydDogYW55W10sIGV4Y2VsOiBhbnkpID0+IHtcbiAgICBpZiAoZXhjZWwpIHJldHVybiBhd2FpdCBzZW5kUmVwb3J0V2l0aEV4Y2VsKHJlcXVlc3QsIHJlcG9ydCwgZXhjZWwpO1xuICAgIHJldHVybiBhd2FpdCBzZW5kRW1wdHlSZXBvcnQocmVxdWVzdCwgcmVwb3J0KTtcbn1cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUVtcHR5UmVwb3J0Qm9keSA9IChyZXF1ZXN0OiBCb29rc2hlbGYuTW9kZWw8YW55PikgPT5cbiAgICBgPGRpdiBzdHlsZSA9XCJiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOyBib3JkZXI6MXB4IHNvbGlkIGJsYWNrOyBib3JkZXItcmFkaXVzOjVweDsgdGV4dC1hbGlnbjpjZW50ZXJcIj5cbiAgICA8aDI+SGkgJHtyZXF1ZXN0LmF0dHJpYnV0ZXMuY3JlYXRlZF9ieX08L2gyPlxuICAgIDxwPllvdXIgcmVxdWVzdCBmb3Igc2VsZWN0ZWQgZGF0ZSByYW5nZSAke3JlcXVlc3QuYXR0cmlidXRlcy5xdWVyeV9wYXJhbXMuc3BsaXQoXCJ8XCIpfSByZXR1cm5zIGVtcHR5IHJlcG9ydDwvcD4gXG4gICAgPHA+UmVxdWVzdCBpZCAke3JlcXVlc3QuYXR0cmlidXRlcy5JZH08L3A+XG48L2Rpdj5cbmA7XG5leHBvcnQgY29uc3Qgc2VuZEVtcHR5UmVwb3J0ID0gYXN5bmMgKHJlcXVlc3Q6IEJvb2tzaGVsZi5Nb2RlbDxhbnk+LCByZXBvcnQ6IGFueVtdKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IG1haWxDbGllbnQuc2VuZE1haWwoe1xuICAgICAgICB0bzogcHJvY2Vzcy5lbnYuUkVDSVBJRU5UX01BSUwgfHwgcmVxdWVzdC5hdHRyaWJ1dGVzLnJlY2lwaWVudF9lbWFpbCxcbiAgICAgICAgc3ViamVjdDogXCJFa290b2tlbiBSZXBvcnQgI1wiICsgcmVxdWVzdC5hdHRyaWJ1dGVzLklkLFxuICAgICAgICBodG1sOiBnZW5lcmF0ZUVtcHR5UmVwb3J0Qm9keShyZXF1ZXN0KSxcbiAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9GUk9NLFxuICAgICAgICByZXBseVRvOiBwcm9jZXNzLmVudi5NQUlMX1JFUExZX1RPLFxuICAgIH0sIChlcnJvciwgaW5mbykgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICByZXNvbHZlKGluZm8pO1xuICAgIH0pKTtcbn1cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVJlcG9ydFdpdGhFeGNlbEJvZHkgPSAocmVxdWVzdDogQm9va3NoZWxmLk1vZGVsPGFueT4pID0+XG4gICAgYDxkaXYgc3R5bGUgPVwiYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTsgYm9yZGVyOjFweCBzb2xpZCBibGFjazsgYm9yZGVyLXJhZGl1czo1cHg7IHRleHQtYWxpZ246Y2VudGVyXCI+XG4gICAgPGgyPkhpICR7cmVxdWVzdC5hdHRyaWJ1dGVzLmNyZWF0ZWRfYnl9PC9oMj5cbiAgICA8cD5Zb3VyIHJlcG9ydCBpcyByZWFkeTwvcD4gXG4gICAgPHA+UmVxdWVzdCBpZCAke3JlcXVlc3QuYXR0cmlidXRlcy5JZH08L3A+XG48L2Rpdj5gO1xuZXhwb3J0IGNvbnN0IHNlbmRSZXBvcnRXaXRoRXhjZWwgPSBhc3luYyAocmVxdWVzdDogQm9va3NoZWxmLk1vZGVsPGFueT4sIHJlcG9ydDogYW55W10sIGV4Y2VsOiBhbnkpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gbWFpbENsaWVudC5zZW5kTWFpbCh7XG4gICAgICAgIHRvOiBwcm9jZXNzLmVudi5SRUNJUElFTlRfTUFJTCB8fCByZXF1ZXN0LmF0dHJpYnV0ZXMucmVjaXBpZW50X2VtYWlsLFxuICAgICAgICBzdWJqZWN0OiBcIkVrb3Rva2VuIFJlcG9ydCAjXCIgKyByZXF1ZXN0LmF0dHJpYnV0ZXMuSWQsXG4gICAgICAgIGh0bWw6IGdlbmVyYXRlUmVwb3J0V2l0aEV4Y2VsQm9keShyZXF1ZXN0KSxcbiAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogXCJFa290b2tlbi1SZXBvcnQtXCIgKyByZXF1ZXN0LmF0dHJpYnV0ZXMuSWQgKyBcIi54bHN4XCIsXG4gICAgICAgICAgICAgICAgY29udGVudDogZXhjZWwsXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGZyb206IHByb2Nlc3MuZW52Lk1BSUxfRlJPTSxcbiAgICAgICAgcmVwbHlUbzogcHJvY2Vzcy5lbnYuTUFJTF9SRVBMWV9UTyxcbiAgICB9LCAoZXJyb3IsIGluZm8pID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgcmVzb2x2ZShpbmZvKTtcbiAgICB9KSk7XG59XG5leHBvcnQgY29uc3QgcXVldWVSZXBvcnRUYXNrID0gKHJlcXVlc3Q6IEJvb2tzaGVsZi5Nb2RlbDxhbnk+KSA9PiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4gcXVldWVNaWNyb3Rhc2soYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcG9ydCA9IGF3YWl0IGZldGNoUmVwb3J0KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBleGNlbCA9IGF3YWl0IHJlcG9ydFRvRXhjZWwocmVxdWVzdC5hdHRyaWJ1dGVzLklkLCByZXBvcnQpO1xuICAgICAgICBjb25zdCBpbmZvID0gYXdhaXQgc2VuZFJlcG9ydChyZXF1ZXN0LCByZXBvcnQsIGV4Y2VsKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXBvcnQgc2VudCBpbmZvOlwiLCBpbmZvKTtcbiAgICAgICAgcmVxdWVzdC5zZXQoXCJzdGF0dXNcIiwgMSk7XG4gICAgICAgIGF3YWl0IHVwZGF0ZVJlcG9ydFJlcXVlc3RTdGF0dXMocmVxdWVzdC5hdHRyaWJ1dGVzLklkLCAxKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoaWxlIHByb2Nlc3NpbmcgcmVxdWVzdFwiLCBlcnJvcik7XG4gICAgICAgIGF3YWl0IHVwZGF0ZVJlcG9ydFJlcXVlc3RTdGF0dXMocmVxdWVzdC5hdHRyaWJ1dGVzLklkLCAwKTtcbiAgICB9XG4gICAgcmVzb2x2ZSgpXG59KSlcbmV4cG9ydCBjb25zdCB1cGRhdGVSZXBvcnRSZXF1ZXN0U3RhdHVzID0gKGlkOiBudW1iZXIsIHN0YXR1czogbnVtYmVyKSA9PiBkYkNvbm5lY3Rpb24ocHJvY2Vzcy5lbnYuRUtPVE9LRU5fUkVQT1JUX1RBQkxFKVxuICAgIC53aGVyZShcImlkXCIsIFwiPVwiLCBpZClcbiAgICAudXBkYXRlKHsgc3RhdHVzLCB9KTtcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVJlcG9ydCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuVEVTVF9DT05UUk9MX0lEKSB7XG4gICAgICAgIGF3YWl0IHVwZGF0ZVJlcG9ydFJlcXVlc3RTdGF0dXMoTnVtYmVyKHByb2Nlc3MuZW52LlRFU1RfQ09OVFJPTF9JRCksIDApO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0cyA9IGF3YWl0IGZldGNoUmVwb3J0UmVxdWVzdHMoKTtcbiAgICBjb25zdCB0YXNrczogUHJvbWlzZTx2b2lkPltdID0gW107XG4gICAgaWYgKHJlcXVlc3RzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW1wdHkgR2VuZXJhdGUgUmVwb3J0IFJlcXVlc3QgVGFza3NcIik7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVxdWVzdCBvZiByZXF1ZXN0cykge1xuICAgICAgICBjb25zb2xlLmxvZyhcInByb2Nlc3NpbmcgcmVxdWVzdFwiLCByZXF1ZXN0LmF0dHJpYnV0ZXMpO1xuICAgICAgICBhd2FpdCB1cGRhdGVSZXBvcnRSZXF1ZXN0U3RhdHVzKHJlcXVlc3QuYXR0cmlidXRlcy5JZCwgMik7XG4gICAgICAgIHRhc2tzLnB1c2gocXVldWVSZXBvcnRUYXNrKHJlcXVlc3QpKTtcbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwodGFza3MpO1xufVxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGZldGNoUmVwb3J0LFxuICAgIGdlbmVyYXRlUmVwb3J0XG59Il19