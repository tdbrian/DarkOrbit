using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Driver;

namespace DarkOrbit.Api.Resources
{
    public class ResourcesMongo
    {
        private readonly IMongoCollection<ResourceEntity> _resourcesServicesCollection;

        public ResourcesMongo(CustomerMongoDb customerMongoDb)
        {
            _resourcesServicesCollection = customerMongoDb.ResourcesCollection;
        }

        public async Task<ResourceEntity> GetById(string id)
        {
            return (await _resourcesServicesCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<ResourceEntity>> GetAll()
        {
            return (await _resourcesServicesCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(ResourceEntity resource)
        {
            var update = new UpdateDefinitionBuilder<ResourceEntity>()
                .Set(x => x.Description, resource.Description)
                .Set(x => x.Name, resource.Name)
                .Set(x => x.UpdatedBy, resource.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _resourcesServicesCollection.UpdateOneAsync(x => x.Id == resource.Id, update);
        }

        public async Task Create(ResourceEntity resource)
        {
            resource.Created = DateTime.Now;
            resource.Deleted = false;
            await _resourcesServicesCollection.InsertOneAsync(resource);
        }

        public async Task<UpdateResult> Remove(string id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<ResourceEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _resourcesServicesCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
