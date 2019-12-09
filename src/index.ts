import 'reflect-metadata';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import i18n from './config/i18n';
import routes from './routes';

const PORT = 8080;

createConnection()
  .then(async connection => {
    // Start express app
    const app = express();

    // Call middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // I18N
    app.use(i18n);

    // Set routes
    app.use(routes);

    // Static using (React frontend)
    app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

    // Redirect not found routes to React index.html
    app.use('*', (req, res) => {
      return res.sendFile('index.html', {
        root: path.resolve(__dirname, '..', 'public'),
      });
    });

    // start express server
    app.listen(PORT, () => {
      console.log(`Express server has started on port ${PORT}.`);
    });
  })
  .catch(error => console.log(error));
