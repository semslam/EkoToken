"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./providers/config");
const express = __importStar(require("express"));
const ekotoken_report_generator_controller_1 = __importDefault(require("./controllers/ekotoken-report-generator.controller"));
const port = Number(process.env.PORT || 3000);
const app = express.default();
app.use(express.json());
app.use("/ekotoken-report-generator", ekotoken_report_generator_controller_1.default);
app.listen(port, () => {
    console.log("App Started on port", port);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBNEI7QUFDNUIsaURBQW1DO0FBQ25DLDhIQUFtRztBQUVuRyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7QUFDOUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSw4Q0FBaUMsQ0FBQyxDQUFDO0FBQ3pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9wcm92aWRlcnMvY29uZmlnXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgZWtvVG9rZW5SZXBvcnRHZW5lcmF0b3JDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJzL2Vrb3Rva2VuLXJlcG9ydC1nZW5lcmF0b3IuY29udHJvbGxlclwiO1xuXG5jb25zdCBwb3J0ID0gTnVtYmVyKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCk7XG5jb25zdCBhcHAgPSBleHByZXNzLmRlZmF1bHQoKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpXG5hcHAudXNlKFwiL2Vrb3Rva2VuLXJlcG9ydC1nZW5lcmF0b3JcIiwgZWtvVG9rZW5SZXBvcnRHZW5lcmF0b3JDb250cm9sbGVyKTtcbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQXBwIFN0YXJ0ZWQgb24gcG9ydFwiLCBwb3J0KTtcbn0pO1xuIl19