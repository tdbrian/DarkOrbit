using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.Events
{
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
        private readonly EventsMongo _eventsRepo;

        public EventsController(EventsMongo eventsRepo)
        {
            _eventsRepo = eventsRepo;
        }

        [HttpGet]
        public async Task<List<EventEntity>> Get()
        {
            return await _eventsRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<EventEntity> Get(string id)
        {
            return await _eventsRepo.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody]EventEntity entity)
        {
            await _eventsRepo.Create(entity);
        }

        [HttpPut("{id}")]
        public async Task Put([FromBody]EventEntity entity)
        {
            await _eventsRepo.Update(entity);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _eventsRepo.Remove(id, "nonamesyet");
        }
    }
}
