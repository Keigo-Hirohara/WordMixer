const request = require('supertest');
const app = require('../../app');
const {connectMongo, disconnectMongo} = require('../../services/mongo');

describe('Ideas API', () => {
    beforeAll(async () => {
        await connectMongo();
    });

    afterAll(async () => {
        await disconnectMongo();
    });

    describe('Test GET /idea', () => {
        test('It should response with 200 success', async () => {
            const response = await request(app)
                .get('/idea')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /idea', () => {
        const completeIdeaData = {
            idea: 'テスト + アイデア',
            desc: '詳細味入力（テスト）'
        };
        test('It should response with 201 success', async () => {
            const response = await request(app)
                .post('/idea')
                .send(completeIdeaData)
                .expect('Content-Type', /json/)
                .expect(201);
                expect(response.body).toStrictEqual(completeIdeaData);
        });

        test('It should catch Missing required properties', async () => {
            const response = await request(app)
                .post('/idea')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'new idea is not defined!!'
            });
        });
    });
});