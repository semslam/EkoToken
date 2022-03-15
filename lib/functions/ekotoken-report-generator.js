"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const ekotoken_report_generator_controller_1 = __importDefault(require("../controllers/ekotoken-report-generator.controller"));
exports.default = firebase_functions_1.https.onRequest(ekotoken_report_generator_controller_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWtvdG9rZW4tcmVwb3J0LWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvZWtvdG9rZW4tcmVwb3J0LWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyQztBQUMzQywrSEFBMEY7QUFDMUYsa0JBQWUsMEJBQUssQ0FBQyxTQUFTLENBQUMsOENBQXVCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0dHBzIH0gZnJvbSBcImZpcmViYXNlLWZ1bmN0aW9uc1wiO1xuaW1wb3J0IGVrb3Rva2VuUmVwb3J0R2VuZXJhdG9yIGZyb20gXCIuLi9jb250cm9sbGVycy9la290b2tlbi1yZXBvcnQtZ2VuZXJhdG9yLmNvbnRyb2xsZXJcIjtcbmV4cG9ydCBkZWZhdWx0IGh0dHBzLm9uUmVxdWVzdChla290b2tlblJlcG9ydEdlbmVyYXRvcik7Il19