// mail: codingninjas2k16@gmail.com
// password: slwvvlczduktvhdj
import nodemailer from 'nodemailer'
async function sendMail(email, job_designation) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codingninjas2k16@gmail.com',
            pass: 'slwvvlczduktvhdj',
        }
    });

    const mailOptions = {
        from: 'codingninjas2k16',
        to: email,
        subject: `Application to Job ${job_designation}`,
        text: 'This is a confirmation mail'
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent Successfully', result);
    } catch (err) { console.log('Email not Sent!', err) }
}
export default sendMail;