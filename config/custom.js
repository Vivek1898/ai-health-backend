/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

    awsAccessKeyId  : process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsApiVersion: process.env.AWS_API_VERSION,
    awsAssetUrl: process.env.AWS_ASSET_URL,

    serverEnv: process.env.SERVER_ENV,

    sendgridSMTP: process.env.SENDGRID_SMTP,
    sendgridUser: process.env.SENDGRID_USER,
    sendgridPort: process.env.SENDGRID_PORT,
    sendgridId: process.env.SENDGRID_ID,
    sendLiveMailStatus: process.env.SEND_LIVE_MAIL_STATUS === 'live',

    redisUrl: process.env.REDIS_URL,

    dashboardBaseUrl: process.env.DASHBOARD_BASE_URL,
    fromEmail: process.env.FROM_EMAIL,

    facebookToken: process.env.FACEBOOK_TOKEN,
    facebookApiUrl: process.env.FACEBOOK_API_URL,
};
