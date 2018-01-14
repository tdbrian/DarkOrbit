using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DarkOrbit.Api.Utilities.Database
{
    public abstract class MongoDbEntityBase
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public bool Deleted { get; set; }
    }
}
