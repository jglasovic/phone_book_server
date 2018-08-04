// tslint:disable:no-unused-expression
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

import App from '../../app';

chai.use(chaiHttp);
const Server = new App().config();
const { expect, request } = chai;

describe('Assets controller', async () => {
  let token: string;
  before(async () => {
    const response = await request(Server)
      .post('/login')
      .send({ username: 'admin', password: 'test1234' });
    token = response.body['Token'];
  });

  describe('get all Assets', () => {
    it('should return all assets via /assets', async () => {
      const response = await request(Server)
        .get('/api/v1/assets')
        .set('x-access-token', token);
      expect(response).to.have.status(200);
      expect(response).to.be.json;
    });
  });
  describe('get single Asset', () => {
    it('should return single asset via /assets/:id', async () => {
      const response = await request(Server)
        .get('/api/v1/assets/5')
        .set('x-access-token', token);
      expect(response).to.have.status(200);
      expect(response).to.be.json;
    });
  });
});
