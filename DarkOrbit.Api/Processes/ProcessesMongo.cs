using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Driver;

namespace DarkOrbit.Api.Processes
{
    public class ProcessesMongo
    {
        private readonly IMongoCollection<ProcessEntity> _processsServicesCollection;

        public ProcessesMongo(CustomerMongoDb customerMongoDb)
        {
            _processsServicesCollection = customerMongoDb.ProcessesCollection;
        }

        public async Task<ProcessEntity> GetById(string id)
        {
            return (await _processsServicesCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<ProcessEntity>> GetAll()
        {
            return (await _processsServicesCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(ProcessEntity process)
        {
            var update = new UpdateDefinitionBuilder<ProcessEntity>()
                .Set(x => x.Description, process.Description)
                .Set(x => x.Name, process.Name)
                .Set(x => x.UpdatedBy, process.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _processsServicesCollection.UpdateOneAsync(x => x.Id == process.Id, update);
        }

        public async Task Create(ProcessEntity process)
        {
            process.Created = DateTime.Now;
            process.Deleted = false;
            await _processsServicesCollection.InsertOneAsync(process);
        }

        public async Task<UpdateResult> Remove(string id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<ProcessEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _processsServicesCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
