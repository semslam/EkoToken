import knex from 'knex';
import bookshelf from 'bookshelf';
export const dbConnection = knex({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        charset: process.env.DB_CHARSET || 'utf8'
    }
})
export const dbClient = bookshelf(dbConnection as any);