import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as path from 'path';
import { createConnection } from 'typeorm';
import * as ORM_CONFIG from '../ormconfig.json';
import i18n from './config/i18n';
import routes from './routes';

const PORT = 8080;

createConnection(ORM_CONFIG)
  .then(async connection => {
    // Start express app
    const app = express();

    // Call middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // I18N
    app.use(i18n);

    // Set Uploads as Static
    app.use(
      '/public',
      express.static(path.resolve(__dirname, '..', 'public'))
    );

    // Set routes
    app.use(routes);

    // start express server
    app.listen(PORT, () => {
      console.log(`Express server has started on port ${PORT}.`);
    });
  })
  .catch(error => console.log(error));
