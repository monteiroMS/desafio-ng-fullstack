import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import signInRouter from './routes/signin';
import loginRouter from './routes/login';
import transactionRouter from './routes/transaction';
import userRouter from './routes/user';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
  
app
  .use(signInRouter)
  .use(loginRouter)
  .use(transactionRouter)
  .use(userRouter);

app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`);
});