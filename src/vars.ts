import * as yup from 'yup';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? undefined : '.env',
});

export const { mongoHost, mongoPort, mongoUser, mongoPass, mongoDb } = yup
  .object({
    mongoHost: yup.string().default(`127.0.0.1`),
    mongoPort: yup.number().integer().default(27017),
    mongoUser: yup.string(),
    mongoPass: yup.string(),
    mongoDb: yup.string(),
  })
  .validateSync(process.env);
