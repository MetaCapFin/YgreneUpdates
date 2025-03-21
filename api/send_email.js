const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, company, questions } = req.body;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Replace with your email
                pass: 'your-email-password'   // Replace with your email password
            }
        });

        let mailOptions = {
            from: email,
            to: 'carlos.alvarez@ygrene.com',
            subject: 'Form Submission from Landing Page',
            text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nCompany: ${company}\nQuestions: ${questions}`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
