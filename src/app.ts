import express from 'express';
import cors from 'cors';
import { getDatabase } from './config/mongo';
import { initialFirebase } from './config/firebase';
import { adminDb, gameDb } from './vars';
import router from './api/index';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

//logging
//apis
app.use('/api', router);
//db
export const dbAdmin = getDatabase(adminDb);
export const dbGame = getDatabase(gameDb);
//firebase
export const firebase = initialFirebase();
export const fcm = firebase.messaging();

app.get('/api/test', (req, res) => {
  res.json({ success: 'Hello World!' });
});
export default app;
