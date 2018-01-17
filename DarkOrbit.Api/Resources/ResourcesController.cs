using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.Resources
{
    [Route("api/[controller]")]
    public class ResourcesController : Controller
    {
        private readonly ResourcesMongo _resourcesRepo;

        public ResourcesController(ResourcesMongo microServicesRepo)
        {
            _resourcesRepo = microServicesRepo;
        }

        [HttpGet]
        public async Task<List<ResourceEntity>> Get()
        {
            return await _resourcesRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ResourceEntity> Get(string id)
        {
            return await _resourcesRepo.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody]ResourceEntity entity)
        {
            await _resourcesRepo.Create(entity);
        }

        [HttpPut("{id}")]
        public async Task Put([FromBody]ResourceEntity entity)
        {
            await _resourcesRepo.Update(entity);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _resourcesRepo.Remove(id, "nonamesyet");
        }
    }
}
