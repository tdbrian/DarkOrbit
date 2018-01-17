using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.Processes
{
    [Route("api/[controller]")]
    public class ProcessesController : Controller
    {
        private readonly ProcessesMongo _processesRepo;

        public ProcessesController(ProcessesMongo processesRepo)
        {
            _processesRepo = processesRepo;
        }

        [HttpGet]
        public async Task<List<ProcessEntity>> Get()
        {
            return await _processesRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ProcessEntity> Get(string id)
        {
            return await _processesRepo.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody]ProcessEntity entity)
        {
            await _processesRepo.Create(entity);
        }

        [HttpPut("{id}")]
        public async Task Put([FromBody]ProcessEntity entity)
        {
            await _processesRepo.Update(entity);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _processesRepo.Remove(id, "nonamesyet");
        }
    }
}
