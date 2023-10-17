import express from 'express';
import testRouter from './routes/test';
import { errorMiddleware } from './middleware/error';
import { env } from './config/env';
import { dbTest } from './services/test';

const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/test', testRouter);

// TODO: Finish Error Middleware
// Set up error handling middleware
app.use(errorMiddleware);


// Start the server
app.listen(env.PORT, () => {
  dbTest();
  console.log(`Server listening on port ${env.PORT}`);
});

export default app;
