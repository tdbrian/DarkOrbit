using DarkOrbit.Api.Endpoints;
using DarkOrbit.Api.MicroServices;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace DarkOrbit.Api.Utilities.Database
{
    public class CustomerMongoDb
    {
        public IMongoCollection<MicroServiceEntity> MicroServicesCollection { get; }

        public IMongoCollection<EndpointEntity> EndpointCollection { get; set; }

        public CustomerMongoDb(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("CustomerMongoDb"));
            var database = client.GetDatabase("DarkOrbit");

            MicroServicesCollection = database.GetCollection<MicroServiceEntity>("MicroServices");
            EndpointCollection = database.GetCollection<EndpointEntity>("Endpoints");
        }
    }
}
