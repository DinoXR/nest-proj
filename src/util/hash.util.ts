import crypto from 'crypto';

export const hashSecretCognito = (username: string) => {
  return crypto
    .createHmac('SHA256', process.env.COGNITO_CLIENT_SECRET)
    .update(username + process.env.COGNITO_CLIENT_ID)
    .digest('base64');
};
