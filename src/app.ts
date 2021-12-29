import express, { Application, Response } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/haloo', (_, res: Response) => {
  res.send('lyngen');
});

export default app;
