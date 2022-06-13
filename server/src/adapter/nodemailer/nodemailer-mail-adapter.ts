import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "871d6babbf6c82",
      pass: "6b552bbf5a3252",
    },
  });

  
export class NodemailerMailAdapter implements MailAdapter {

  async sendMail({subject,body}: SendMailData): Promise<void> {
    await transport.sendMail({
      from: "Equipre fidget<test@test.com>",
      to: "Douglas <Douglas@test.com>",
      subject: subject,
      html: body,
    });
  }
}
