using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.MicroServices
{
    [Route("api/[controller]")]
    public class MicroServicesController : Controller
    {
        private readonly MicroServicesMongo _microServicesRepo;
        private readonly MicroServiceManager _serviceManager;

        public MicroServicesController(MicroServicesMongo microServicesRepo, MicroServiceManager serviceManager)
        {
            _microServicesRepo = microServicesRepo;
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<List<MicroServiceEntity>> Get()
        {
            return await _microServicesRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<MicroServiceEntity> Get(string id)
        {
            return await _microServicesRepo.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody]MicroServiceEntity entity)
        {
            await _microServicesRepo.Create(entity);
            await _serviceManager.GenerateService(entity);
        }

        [HttpPut("{id}")]
        public async Task Put([FromBody]MicroServiceEntity entity)
        {
            await _microServicesRepo.Update(entity);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _microServicesRepo.Remove(id, "nonamesyet");
        }
    }
}
