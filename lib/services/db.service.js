"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = exports.dbConnection = void 0;
const knex_1 = __importDefault(require("knex"));
const bookshelf_1 = __importDefault(require("bookshelf"));
exports.dbConnection = (0, knex_1.default)({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        charset: process.env.DB_CHARSET || 'utf8'
    }
});
exports.dbClient = (0, bookshelf_1.default)(exports.dbConnection);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9kYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF3QjtBQUN4QiwwREFBa0M7QUFDckIsUUFBQSxZQUFZLEdBQUcsSUFBQSxjQUFJLEVBQUM7SUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztJQUM3QixVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO1FBQ3pCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7UUFDN0IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztRQUNqQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1FBQ2pDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxNQUFNO0tBQzVDO0NBQ0osQ0FBQyxDQUFBO0FBQ1csUUFBQSxRQUFRLEdBQUcsSUFBQSxtQkFBUyxFQUFDLG9CQUFtQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga25leCBmcm9tICdrbmV4JztcbmltcG9ydCBib29rc2hlbGYgZnJvbSAnYm9va3NoZWxmJztcbmV4cG9ydCBjb25zdCBkYkNvbm5lY3Rpb24gPSBrbmV4KHtcbiAgICBjbGllbnQ6IHByb2Nlc3MuZW52LkRCX0NMSUVOVCxcbiAgICBjb25uZWN0aW9uOiB7XG4gICAgICAgIGhvc3Q6IHByb2Nlc3MuZW52LkRCX0hPU1QsXG4gICAgICAgIHVzZXI6IHByb2Nlc3MuZW52LkRCX1VTRVJOQU1FLFxuICAgICAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQsXG4gICAgICAgIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5EQl9EQVRBQkFTRSxcbiAgICAgICAgY2hhcnNldDogcHJvY2Vzcy5lbnYuREJfQ0hBUlNFVCB8fCAndXRmOCdcbiAgICB9XG59KVxuZXhwb3J0IGNvbnN0IGRiQ2xpZW50ID0gYm9va3NoZWxmKGRiQ29ubmVjdGlvbiBhcyBhbnkpOyJdfQ==