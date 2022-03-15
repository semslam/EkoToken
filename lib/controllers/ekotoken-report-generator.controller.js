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
const ekotoken_report_generator_service_1 = __importDefault(require("../services/ekotoken-report-generator.service"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("processing ekotoken report generator request");
    queueMicrotask(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield ekotoken_report_generator_service_1.default.generateReport();
        }
        catch (error) {
            console.log("Error occure while generating report");
        }
    }));
    res.send("Accepted");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWtvdG9rZW4tcmVwb3J0LWdlbmVyYXRvci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2Vrb3Rva2VuLXJlcG9ydC1nZW5lcmF0b3IuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLHNIQUFvRTtBQUNwRSxrQkFBZSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUM1RCxjQUFjLENBQUMsR0FBUyxFQUFFO1FBQ3RCLElBQUk7WUFDQSxNQUFNLDJDQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDbEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBzZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9la290b2tlbi1yZXBvcnQtZ2VuZXJhdG9yLnNlcnZpY2VcIjtcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXE6IEV4cHJlc3MuUmVxdWVzdCwgcmVzOiBFeHByZXNzLlJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJwcm9jZXNzaW5nIGVrb3Rva2VuIHJlcG9ydCBnZW5lcmF0b3IgcmVxdWVzdFwiKTtcbiAgICBxdWV1ZU1pY3JvdGFzayhhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBzZXJ2aWNlLmdlbmVyYXRlUmVwb3J0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9jY3VyZSB3aGlsZSBnZW5lcmF0aW5nIHJlcG9ydFwiKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmVzLnNlbmQoXCJBY2NlcHRlZFwiKTtcbn0iXX0=