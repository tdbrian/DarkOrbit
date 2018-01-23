using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.ServiceManager
{
    [Route("api/[controller]")]
    public class ServiceManagerController : Controller
    {
        private readonly ServiceManagerMongo _serviceManagersRepo;
        private readonly ServiceManagerManager _serviceManager;

        public ServiceManagerController(ServiceManagerMongo serviceManagersRepo, ServiceManagerManager serviceManager)
        {
            _serviceManagersRepo = serviceManagersRepo;
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<List<ServiceManagerEntity>> Get()
        {
            return await _serviceManagersRepo.GetAll();
        }

        [HttpGet]
        [Route("live")]
        public async Task<List<ServiceManagerEntity>> GetLive()
        {
            return await _serviceManager.GetLiveServiceStatuses();
        }

        [HttpGet("{id}")]
        public async Task<ServiceManagerEntity> Get(string id)
        {
            return await _serviceManagersRepo.GetById(id);
        }

        [HttpPut]
        [Route("start")]
        public async Task Start([FromBody]ServiceManagerEntity entity)
        {
            await _serviceManager.StartService(entity);
        }

        [HttpPut]
        [Route("stop")]
        public async Task Stop([FromBody]ServiceManagerEntity entity)
        {
            await _serviceManager.StopService(entity);
        }

        [HttpPut]
        [Route("restart")]
        public async Task Restart([FromBody]ServiceManagerEntity entity)
        {
            await _serviceManager.RestartService(entity);
        }
    }
}
