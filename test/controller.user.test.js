import { expect, assert } from 'chai';
import { createUserController, getUserController } from '../controllers/userController.js';

describe('User controller', () => {
        
        it('should return array of users', async ()=> {
            const email = 'test123456@mail.com';
            const username = 'test';
            const password = '123456';
            const user = await createUserController({
                username,
                 password, 
                 email,
                });
            console.log('user:', user)
            const result = await getUserController(user);
            assert.equal(result.length, 1);
        });

    it('should return empty array if no user is added', async () => {
        const result = await getUserController('juan', '123');
        expect(result).to.be.an('array').that.is.empty;
    });

});