"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdk = void 0;
const axios_1 = __importDefault(require("axios"));
exports.sdk = axios_1.default.create({
    baseURL: process.env.FELA_ENDPOINT,
    headers: {
        Authorization: "Bearer " + process.env.FELA_TOKEN
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVsYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2ZlbGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDYixRQUFBLEdBQUcsR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDO0lBQzVCLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWE7SUFDbEMsT0FBTyxFQUFFO1FBQ0wsYUFBYSxFQUFFLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7S0FDcEQ7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpb3MgZnJvbSBcImF4aW9zXCI7XG5leHBvcnQgY29uc3Qgc2RrID0gQXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiBwcm9jZXNzLmVudi5GRUxBX0VORFBPSU5ULFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyBwcm9jZXNzLmVudi5GRUxBX1RPS0VOXG4gICAgfVxufSk7Il19