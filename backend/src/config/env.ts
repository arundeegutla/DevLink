import 'dotenv/config'

export const env = {
    PORT: process.env.PORT || 3000,
    SERVICE_ACCOUNT: process.env.SERVICE_ACCOUNT || null,
  };
