import express from 'express';
import testRouter from './routes/test';
import userRouter from './routes/user'
import { errorMiddleware } from './middleware/error';
import { env } from './config/env';
import { dbTest } from './services/test';
import { authenticateJWT } from './middleware/auth';

const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authenticateJWT);

// Set up routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);
app.use('/test', testRouter);

// TODO: Finish Error Middleware
// Set up error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});

export default app;
