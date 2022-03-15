import nodemailer from "nodemailer";
// create reusable transporter object using the default SMTP transport
export const mailClient = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST as string,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER_NAME as string, // generated ethereal user
        pass: process.env.MAIL_USER_PASS as string, // generated ethereal password
    },
    from: process.env.MAIL_FROM,
    replyTo: process.env.MAIL_REPLY_TO,
});