import supertest from 'supertest';
import app from './main';

const request = supertest(app);

describe('POST /parse-log', () => {
    it('should parse logs and return filtered logs', async () => {
        const fileContent = `
      2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code":404,"err":"Not found"}
      2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}
      2021-08-09T02:12:51.265Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}
    `;

        const response = await request
            .post('/parse-log')
            .attach('file', Buffer.from(fileContent), 'logs.log');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                timestamp: expect.any(Number),
                loglevel: 'error',
                transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
                err: 'Not found',
            },
            {
                timestamp: expect.any(Number),
                loglevel: 'warn',
                transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
                err: 'Cannot find user orders list',
            },
        ]);
    });

    it('should handle invalid file format', async () => {
        const response = await request.post('/parse-log');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
