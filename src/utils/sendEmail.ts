import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: "sandbox17e161e3a91647b59899b0cbfc5f4e67.mailgun.org"
});

const sendEmail = (subject:string, html:string) => {
  const emailData = {
    from: "jeg0716@naver.com",
    to: "jeg0716@naver.com",
    subject,
    html
  }
  return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please veify your email`;
  const emailBody = `Verify your email by clicking <a href="http://uber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};