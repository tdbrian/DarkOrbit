using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Driver;

namespace DarkOrbit.Api.ServiceManager
{
    public class ServiceManagerMongo
    {
        private readonly IMongoCollection<ServiceManagerEntity> _erviceManagersCollection;

        public ServiceManagerMongo(CustomerMongoDb customerMongoDb)
        {
            _erviceManagersCollection = customerMongoDb.ServiceManagersCollection;
        }

        public async Task<ServiceManagerEntity> GetById(string id)
        {
            return (await _erviceManagersCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<ServiceManagerEntity>> GetAll()
        {
            return (await _erviceManagersCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(ServiceManagerEntity serviceManager)
        {
            var update = new UpdateDefinitionBuilder<ServiceManagerEntity>()
                .Set(x => x.RunningServices, serviceManager.RunningServices)
                .Set(x => x.UpdatedBy, serviceManager.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _erviceManagersCollection.UpdateOneAsync(x => x.Id == serviceManager.Id, update);
        }

        public async Task Create(ServiceManagerEntity serviceManager)
        {
            serviceManager.Created = DateTime.Now;
            serviceManager.Deleted = false;
            await _erviceManagersCollection.InsertOneAsync(serviceManager);
        }

        public async Task<UpdateResult> Remove(string id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<ServiceManagerEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _erviceManagersCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
