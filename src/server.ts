import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('GET Hello World!');
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

