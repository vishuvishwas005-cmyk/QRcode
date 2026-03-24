const request = require('supertest');
const app = require('../index.js');

describe('QR App Health Check', () => {
  it('should respond to POST /generate with valid input', async () => {
    const response = await request(app)
      .post('/generate')
      .send({ text: 'https://example.com' })
      .expect(200);
    
    expect(response.body).toHaveProperty('qrCode');
    expect(response.body.qrCode).toMatch(/^data:image\/png;base64,/);
  });

  it('should return 400 for missing text', async () => {
    const response = await request(app)
      .post('/generate')
      .send({})
      .expect(400);
    
    expect(response.body).toHaveProperty('error', 'Text is required');
  });
});

