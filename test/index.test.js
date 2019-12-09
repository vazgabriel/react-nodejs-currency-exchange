require('reflect-metadata');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const typeorm = require('typeorm');
const i18n = require('../build/config/i18n');
const routes = require('../build/routes');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Start express app
const app = express();

typeorm.createConnection().then(() => {
  // Call middlewares
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  // I18N
  app.use(i18n.default);

  // Set routes
  app.use(routes.default);

  // start express server
  app.listen(8080);
});

describe('Node.js API', () => {
  describe('Currency Controller', () => {
    it('[/currencies/value?from=1&to=2&value=5] should return a number', done => {
      chai
        .request(app)
        .get('/currencies/value?from=1&to=2&value=5')
        .end((err, res) => {
          chai.expect(res.body.value).to.be.a('number');
          done();
        });
    });
  });
});
