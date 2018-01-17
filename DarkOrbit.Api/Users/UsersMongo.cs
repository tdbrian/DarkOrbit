using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Driver;

namespace DarkOrbit.Api.Users
{
    public class UsersMongo
    {
        private readonly IMongoCollection<UserEntity> _usersCollection;

        public UsersMongo(CustomerMongoDb customerMongoDb)
        {
            _usersCollection = customerMongoDb.UsersCollection;
        }

        public async Task<UserEntity> GetById(string id)
        {
            return (await _usersCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<UserEntity>> GetAll()
        {
            return (await _usersCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(UserEntity user)
        {
            var update = new UpdateDefinitionBuilder<UserEntity>()
                .Set(x => x.FirstName, user.FirstName)
                .Set(x => x.LastName, user.LastName)
                .Set(x => x.UpdatedBy, user.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _usersCollection.UpdateOneAsync(x => x.Id == user.Id, update);
        }

        public async Task Create(UserEntity user)
        {
            user.Created = DateTime.Now;
            user.Deleted = false;
            await _usersCollection.InsertOneAsync(user);
        }

        public async Task<UpdateResult> Remove(string id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<UserEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _usersCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
