const nodemailer = require('nodemailer');
const sendLiveMailStatus = sails.config.custom.sendLiveMailStatus;
const sendgridId = sails.config.custom.sendgridId;
const sendgridUser = sails.config.custom.sendgridUser;
const sendgridSMTP = sails.config.custom.sendgridSMTP;
const sendgridPort = sails.config.custom.sendgridPort | 0;

module.exports = {

    sendEmailToStaff: async (emailTo, subject, content) => {
        try {
            if (!sendLiveMailStatus) {
                return;
            }

            const transporter = nodemailer.createTransport({
                host: sendgridSMTP,
                port: sendgridPort,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: sendgridUser,
                    pass: sendgridId,
                }
            });

            let mailOptions = {
                from: sails.config.custom.fromEmail,
                to: emailTo,
                subject: subject,
            };

            mailOptions.text = '';
            mailOptions.html = content;

            const info = await transporter.sendMail(mailOptions);

            sails.log.info('Message sent: ', info.messageId);

            EventService.createServerEvent(0, 'SENDGRID', 'SENDGRID', 'email_sent', {
                email: emailTo,
                from: sails.config.custom.fromEmail,
                subject: subject,
                messageId: info.messageId
            }, {}, '0.0.0.0');

        } catch (exception) {
            sails.log.error('EMAIL ERROR : ' + exception);
        }
    },

};
