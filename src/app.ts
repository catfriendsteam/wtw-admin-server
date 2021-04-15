import express from 'express';
import morgan from 'morgan';
import { getDatabase } from './config/mongo';
import { adminDb, gameDb } from './vars';
import router from './api/index';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());

//logging
app.use(morgan('common'));
//apis
app.use('/api', router);
//db
export const dbAdmin = getDatabase(adminDb);
export const dbGame = getDatabase(gameDb);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
export default app;
