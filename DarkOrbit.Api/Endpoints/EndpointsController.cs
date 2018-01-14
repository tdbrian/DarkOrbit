using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.Endpoints
{
    [Route("api/[controller]")]
    public class EndpointsController : Controller
    {
        private readonly EndpointsMongo _endpointsRepo;

        public EndpointsController(EndpointsMongo microServicesRepo)
        {
            _endpointsRepo = microServicesRepo;
        }

        [HttpGet]
        public async Task<List<EndpointEntity>> Get()
        {
            return await _endpointsRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<EndpointEntity> Get(string id)
        {
            return await _endpointsRepo.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody]EndpointEntity entity)
        {
            await _endpointsRepo.Create(entity);
        }

        [HttpPut("{id}")]
        public async Task Put([FromBody]EndpointEntity entity)
        {
            await _endpointsRepo.Update(entity);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _endpointsRepo.Remove(id, "nonamesyet");
        }
    }
}
