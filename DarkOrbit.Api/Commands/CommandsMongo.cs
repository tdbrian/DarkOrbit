using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.Database;
using MongoDB.Driver;

namespace DarkOrbit.Api.Commands
{
    public class CommandsMongo
    {
        private readonly IMongoCollection<CommandEntity> _commandsCollection;

        public CommandsMongo(CustomerMongoDb customerMongoDb)
        {
            _commandsCollection = customerMongoDb.CommandsCollection;
        }

        public async Task<CommandEntity> GetById(string id)
        {
            return (await _commandsCollection.FindAsync(x => x.Deleted == false && x.Id == id)).FirstOrDefault();
        }

        public async Task<List<CommandEntity>> GetAll()
        {
            return (await _commandsCollection.FindAsync(x => x.Deleted == false)).ToList();
        }

        public async Task<UpdateResult> Update(CommandEntity command)
        {
            var update = new UpdateDefinitionBuilder<CommandEntity>()
                .Set(x => x.Description, command.Description)
                .Set(x => x.Name, command.Name)
                .Set(x => x.UpdatedBy, command.UpdatedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _commandsCollection.UpdateOneAsync(x => x.Id == command.Id, update);
        }

        public async Task Create(CommandEntity command)
        {
            command.Created = DateTime.Now;
            command.Deleted = false;
            await _commandsCollection.InsertOneAsync(command);
        }

        public async Task<UpdateResult> Remove(string id, string removedBy)
        {
            var update = new UpdateDefinitionBuilder<CommandEntity>()
                .Set(x => x.Deleted, true)
                .Set(x => x.UpdatedBy, removedBy)
                .Set(x => x.LastUpdated, DateTime.Now);

            return await _commandsCollection.UpdateOneAsync(x => x.Id == id, update);
        }
    }
}
