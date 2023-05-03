import   {createUserDto, getUserByUsernameDto, getUsersDto}   from '../dto/usersDto.js';

export const resolvers = {
    Query: {
        users: async () => await getUsersDto(),
        user: async (_, {userUsername}, context) => {
            return await getUserByUsernameDto(userUsername)
        },
    },

    Mutation: {
        addUser: async (_, {userToAdd}, context) => {
            await createUserDto(userToAdd)
        }
    }
};