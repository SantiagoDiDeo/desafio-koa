import connectToDb from '../DB/config/connectToDb.js';
import { userModel } from '../DB/model/modelMongo.js';

export  class userMongoDao {
  
    saveUser = async (username, password,email) => {
        await connectToDb();
        const user = new userModel(username, password,email);
        if (user) {
          return await user.save();    
        }
      throw new Error(`Ya existe el usuario ${username}`);
    };

    getUsers = async () => {
      await connectToDb();
      const allUsers =  await userModel.find({})
      return allUsers;
    };

    getUserByUsername = async (username) => {
      await connectToDb();
      await userModel.findOne({ username: username})
    };

    deleteUser = async (username, password) => {
      await connectToDb();
      const deletedUser =  await userModel.deleteOne(username, password );
      return deletedUser;
    };

    updateUser = async (id, userToUpdate) => {
        return await userModel.updateOne(
            { _id: id },
            { $set: { ...userToUpdate } }
        );
    };
  };