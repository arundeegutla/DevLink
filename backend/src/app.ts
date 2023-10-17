import express from 'express';
import testRouter from './routes/test';
import { errorMiddleware } from './middleware/error';
import { env } from './config/env';

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
  console.log(`Server listening on port ${env.PORT}`);
});

export default app;
