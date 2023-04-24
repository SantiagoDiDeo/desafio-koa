import { expect, assert } from 'chai';
import { createUserController, getUserController } from '../controllers/userController.js';

describe('User controller', () => {
    it('should return array of users', async ()=> {
        const user = await createUserController({
            email: 'santiago@gmail.com',
            username: 'santiago',
            password: '123456'
        });
        const result = await getUserController(user);
        assert.equal(result.length, 1);
    });

    it('should return empty array if no user is added', async () => {
        const result = await getUserController();
        expect(result).to.be.an('array').that.is.empty;
    });
});