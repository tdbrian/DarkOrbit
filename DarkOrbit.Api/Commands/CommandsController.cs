using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.Commands
{
    [Route("api/[controller]")]
    public class CommandsController : Controller
    {
        private readonly CommandsMongo _commandsRepo;

        public CommandsController(CommandsMongo commandsRepo)
        {
            _commandsRepo = commandsRepo;
        }

        [HttpGet]
        public async Task<List<CommandEntity>> Get()
        {
            return await _commandsRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<CommandEntity> Get(string id)
        {
            return await _commandsRepo.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody]CommandEntity entity)
        {
            await _commandsRepo.Create(entity);
        }

        [HttpPut("{id}")]
        public async Task Put([FromBody]CommandEntity entity)
        {
            await _commandsRepo.Update(entity);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _commandsRepo.Remove(id, "nonamesyet");
        }
    }
}
