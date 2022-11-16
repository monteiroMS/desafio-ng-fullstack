import * as express from 'express';
import * as dotenv from 'dotenv';
import signInRouter from './routes/signin';
import loginRouter from './routes/login';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
  
app
  .use(signInRouter)
  .use(loginRouter);

app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`);
});