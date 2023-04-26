import { expect, assert } from 'chai';
import { createUserController, deleteUserController, getUserController } from '../controllers/userController.js';

describe('User controller', () => {
        
        // it('should return empty array if no user is added', async () => {
        //     const result = await getUserController();
        //     expect(result).to.be.an('array').that.is.empty;
            
        // });

        // it('should return array of users', async ()=> {
        //     const email = 'test123456@mail.com';
        //     const username = 'test';
        //     const password = '123456';
        //     const user = await createUserController(username,password, email,);
        //     console.log('user:', user)
        //     const result = await getUserController();
        //     assert.equal(result.length, 1);
        //     expect(result).to.be.an('array').length(1)
        // });

        // it('should delete user by id', async () => {
        //     const username =  'test';
        //     const password = '123456';
        //     const usersBeforeDeletion = await getUserController();
        //     const result = await deleteUserController({username, password});
        //     const usersAfterDeletion = await getUserController();
        //     expect(usersAfterDeletion).to.be.an('array').that.is.empty;
        //     expect(usersBeforeDeletion.length).to.equal(usersAfterDeletion.length + 1);
        // });

});