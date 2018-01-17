using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Driver;

namespace DarkOrbit.Api.Events
{
    public class EventsMongo
    {
        private readonly IMongoCollection<EventEntity> _eventsCollection;

        public EventsMongo(CustomerMongoDb customerMongoDb)
        {
            _eventsCollection = customerMongoDb.EventsCollection;
        }

        public async Task<EventEntity> GetById(string id)
        {
            return (await _eventsCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<EventEntity>> GetAll()
        {
            return (await _eventsCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(EventEntity eventEntity)
        {
            var update = new UpdateDefinitionBuilder<EventEntity>()
                .Set(x => x.Description, eventEntity.Description)
                .Set(x => x.Name, eventEntity.Name)
                .Set(x => x.UpdatedBy, eventEntity.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _eventsCollection.UpdateOneAsync(x => x.Id == eventEntity.Id, update);
        }

        public async Task Create(EventEntity eventEntity)
        {
            eventEntity.Created = DateTime.Now;
            eventEntity.Deleted = false;
            await _eventsCollection.InsertOneAsync(eventEntity);
        }

        public async Task<UpdateResult> Remove(string id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<EventEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _eventsCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
