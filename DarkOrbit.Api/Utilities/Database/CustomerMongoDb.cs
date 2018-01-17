﻿using DarkOrbit.Api.Endpoints;
using DarkOrbit.Api.MicroServices;
using DarkOrbit.Api.Processes;
using DarkOrbit.Api.Resources;
using DarkOrbit.Api.Users;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace DarkOrbit.Api.Utilities.Database
{
    public class CustomerMongoDb
    {
        public IMongoCollection<MicroServiceEntity> MicroServicesCollection { get; }

        public IMongoCollection<EndpointEntity> EndpointCollection { get; set; }

        public IMongoCollection<ResourceEntity> ResourcesCollection { get; set; }

        public IMongoCollection<ProcessEntity> ProcessesCollection { get; set; }

        public IMongoCollection<UserEntity> UsersCollection { get; set; }

        public CustomerMongoDb(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("CustomerMongoDb"));
            var database = client.GetDatabase("DarkOrbit");

            MicroServicesCollection = database.GetCollection<MicroServiceEntity>("MicroServices");
            EndpointCollection = database.GetCollection<EndpointEntity>("Endpoints");
            ResourcesCollection = database.GetCollection<ResourceEntity>("Resources");
            ProcessesCollection = database.GetCollection<ProcessEntity>("Processes");
            UsersCollection = database.GetCollection<UserEntity>("Users");
        }
    }
}
