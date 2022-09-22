const request = require('supertest');
const yup = require('yup');
const db = require('../models');
const app = require('../app');
const appRequest = request(app);

afterAll(() => {
  return db.sequelize.close();
});

const getTestUser = () => ({
  firstName: 'Test',
  lastName: 'Tested',
  email: `test${Date.now()}@gmail.com`,
  password: 'testPass123',
  birthday: '1985-10-21',
  isMale: true,
});

const user = getTestUser();

const userResponseSuccess = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  //password: yup.string().required(),
  birthday: yup.date(),
  isMale: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

const responseSuccess = yup.object({
  data: yup.array().of(userResponseSuccess),
});

describe('sign up test:', () => {
  test('user should be able to sign up success', async () => {
    const response = await appRequest.post('/api/users/').send(user);
    expect(response.statusCode).toBe(201);
    expect(responseSuccess.isValidSync(response.body)).toBe(true);
  });
  test('user repeat sign up (not unique email) to expect status 409', async () => {
    const response = await appRequest.post('/api/users/').send(user);
    expect(response.statusCode).toBe(409);
  });
  test('user with empty body to expect status 400', async () => {
    const response = await appRequest.post('/api/users/').send({});
    expect(response.statusCode).toBe(400);
  });
});
