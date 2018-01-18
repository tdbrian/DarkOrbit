using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Driver;

namespace DarkOrbit.Api.Endpoints
{
    public class EndpointsMongo
    {
        private readonly IMongoCollection<EndpointEntity> _endpointsServicesCollection;

        public EndpointsMongo(CustomerMongoDb customerMongoDb)
        {
            _endpointsServicesCollection = customerMongoDb.EndpointCollection;
        }

        public async Task<EndpointEntity> GetById(string id)
        {
            return (await _endpointsServicesCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<EndpointEntity>> GetByServiceId(string serviceId)
        {
            return (await _endpointsServicesCollection.FindAsync(x => x.Deleted == false && x.ServiceId == serviceId)).ToList();
        }

        public async Task<List<EndpointEntity>> GetAll()
        {
            return (await _endpointsServicesCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(EndpointEntity endpointsService)
        {
            var update = new UpdateDefinitionBuilder<EndpointEntity>()
                .Set(x => x.Description, endpointsService.Description)
                .Set(x => x.Name, endpointsService.Name)
                .Set(x => x.UpdatedBy, endpointsService.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now)
                .Set(x => x.EndpointActions, endpointsService.EndpointActions);

            return await _endpointsServicesCollection.UpdateOneAsync(x => x.Id == endpointsService.Id, update);
        }

        public async Task Create(EndpointEntity endpointsService)
        {
            endpointsService.Created = DateTime.Now;
            endpointsService.Deleted = false;
            await _endpointsServicesCollection.InsertOneAsync(endpointsService);
        }

        public async Task<UpdateResult> Remove(string id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<EndpointEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _endpointsServicesCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
