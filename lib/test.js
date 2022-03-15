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
require("./providers/config");
const ekotoken_report_generator_service_1 = __importDefault(require("./services/ekotoken-report-generator.service"));
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    yield ekotoken_report_generator_service_1.default.generateReport().then(() => {
        console.log("EkotokenReportGeneratorService Tested");
    });
    process.exit(0);
});
test();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQTRCO0FBQzVCLHFIQUEwRjtBQUMxRixNQUFNLElBQUksR0FBRyxHQUFTLEVBQUU7SUFDcEIsTUFBTSwyQ0FBOEIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFBLENBQUE7QUFDRCxJQUFJLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vcHJvdmlkZXJzL2NvbmZpZ1wiO1xuaW1wb3J0IGVrb3Rva2VuUmVwb3J0R2VuZXJhdG9yU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9la290b2tlbi1yZXBvcnQtZ2VuZXJhdG9yLnNlcnZpY2VcIjtcbmNvbnN0IHRlc3QgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZWtvdG9rZW5SZXBvcnRHZW5lcmF0b3JTZXJ2aWNlLmdlbmVyYXRlUmVwb3J0KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWtvdG9rZW5SZXBvcnRHZW5lcmF0b3JTZXJ2aWNlIFRlc3RlZFwiKTtcbiAgICB9KTtcbiAgICBwcm9jZXNzLmV4aXQoMCk7XG59XG50ZXN0KClcbiJdfQ==