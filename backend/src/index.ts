import * as express from 'express';
import statusCodes from './helpers/statusCodes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

console.log(PORT);

app.get('/', (_req, res) => {
  res.status(statusCodes.OK).send('IT\'S WORKING!')
});

app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`);
});