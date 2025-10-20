import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transponder = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro)

    const mailOptions = {
        from: '"Signalist <signalist@cbstack.pro>"',
        to: email,
        subject: `Welcome to Signalist - your stock market toolkit is ready`,
        text: `Welcome to Signalist! We're excited to have you on board.`,
        html: htmlTemplate,
    }

    await  transponder.sendMail(mailOptions)
}