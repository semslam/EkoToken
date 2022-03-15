import Bookshelf from "bookshelf";
import { Stream } from "stream";
export declare const fetchReportRequests: () => Promise<Bookshelf.Model<any>[]>;
export declare const fetchReport: (request: Bookshelf.Model<any>) => Promise<any>;
export declare const excelSchema: ({
    column: string;
    type: StringConstructor;
    value: (report: any) => any;
    format?: undefined;
} | {
    column: string;
    type: NumberConstructor;
    format: string;
    value: (report: any) => number;
} | {
    column: string;
    type: DateConstructor;
    format: string;
    value: (report: any) => Date;
})[];
export declare const reportToExcel: (reportId: any, report?: any[]) => Promise<Stream | null>;
export declare const sendReport: (request: Bookshelf.Model<any>, report: any[], excel: any) => Promise<unknown>;
export declare const generateEmptyReportBody: (request: Bookshelf.Model<any>) => string;
export declare const sendEmptyReport: (request: Bookshelf.Model<any>, report: any[]) => Promise<unknown>;
export declare const generateReportWithExcelBody: (request: Bookshelf.Model<any>) => string;
export declare const sendReportWithExcel: (request: Bookshelf.Model<any>, report: any[], excel: any) => Promise<unknown>;
export declare const queueReportTask: (request: Bookshelf.Model<any>) => Promise<void>;
export declare const updateReportRequestStatus: (id: number, status: number) => import("knex").Knex.QueryBuilder<any, number>;
export declare const generateReport: () => Promise<void>;
declare const _default: {
    fetchReport: (request: Bookshelf.Model<any>) => Promise<any>;
    generateReport: () => Promise<void>;
};
export default _default;
