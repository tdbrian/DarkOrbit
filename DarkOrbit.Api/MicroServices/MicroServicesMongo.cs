using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DarkOrbit.Api.MicroServices
{
    public class MicroServicesMongo
    {
        private readonly IMongoCollection<MicroServiceEntity> _microServicesCollection;

        public MicroServicesMongo(CustomerMongoDb customerMongoDb)
        {
            _microServicesCollection = customerMongoDb.MicroServicesCollection;
        }

        public async Task<MicroServiceEntity> GetById(ObjectId id)
        {
            return (await _microServicesCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<MicroServiceEntity>> GetAll()
        {
            return (await _microServicesCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(MicroServiceEntity microService)
        {
            var update = new UpdateDefinitionBuilder<MicroServiceEntity>()
                .Set(x => x.Description, microService.Description)
                .Set(x => x.Name, microService.Name)
                .Set(x => x.UpdatedBy, microService.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _microServicesCollection.UpdateOneAsync(x => x.Id == microService.Id, update);
        }

        public async Task Create(MicroServiceEntity microService)
        {
            microService.Id = ObjectId.GenerateNewId();
            microService.Created = DateTime.Now;
            microService.Deleted = false;
            await _microServicesCollection.InsertOneAsync(microService);
        }

        public async Task<UpdateResult> Remove(ObjectId id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<MicroServiceEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _microServicesCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
