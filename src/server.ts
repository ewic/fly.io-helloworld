import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import pgPromise from 'pg-promise';

const pgp = pgPromise();

const app = express();
const port = process.env.PORT || 3000;

const dbURL = process.env.DATABASE_URL

const db = pgp(`${dbURL}/flydb`);

const getUsers = async () => {
  return await db.any('SELECT * FROM accounts');
}

app.use(bodyParser.json());
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  const users = await getUsers();

  console.log(users);

  let out = '<h1>Users</h1><br />';
  users.forEach(user => {
    out += `<p>${user.name}</p>`
  })

  res.send(out);
}) 

app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('POST Hello World!');
}) 

app.post('/test', (req: Request, res: Response) => {

  res.send('POST request')
}) 


app.listen( port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

