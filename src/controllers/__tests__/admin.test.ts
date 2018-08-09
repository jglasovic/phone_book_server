// tslint:disable:no-unused-expression
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

import App from '../../app';

chai.use(chaiHttp);
const Server = new App().config();
const { expect, request } = chai;

describe('Admin login', () => {
  it('should return token', async () => {
    const response = await request(Server)
      .post('/login')
      .send({ username: 'admin', password: 'test1234' });
    expect(response).to.have.status(200);
    expect(response).to.be.json;
    expect(response.body['Token']).to.be.string;
  });
});
