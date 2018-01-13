using System;
using MongoDB.Bson;

namespace DarkOrbit.Api.Utilities.Database
{
    public abstract class MongoDbEntityBase
    {
        public ObjectId Id { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public bool Deleted { get; set; }
    }
}
