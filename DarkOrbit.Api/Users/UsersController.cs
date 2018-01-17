using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DarkOrbit.Api.Users
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UsersMongo _usersRepo;

        public UsersController(UsersMongo endpointsRepo)
        {
            _usersRepo = endpointsRepo;
        }

        [HttpGet]
        public async Task<List<UserEntity>> Get()
        {
            return await _usersRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<UserEntity> Get(string id)
        {
            return await _usersRepo.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody]UserEntity entity)
        {
            await _usersRepo.Create(entity);
        }

        [HttpPut("{id}")]
        public async Task Put([FromBody]UserEntity entity)
        {
            await _usersRepo.Update(entity);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _usersRepo.Remove(id, "nonamesyet");
        }
    }
}
