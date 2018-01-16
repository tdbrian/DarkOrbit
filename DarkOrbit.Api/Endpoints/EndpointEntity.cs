using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Endpoints
{
    public class EndpointActions
    {
        public bool IncludeGetOne { get; set; }

        public bool IncludeGetMultiple { get; set; }

        public bool IncludePut { get; set; }

        public bool IncludePost { get; set; }

        public bool IncludeDelete { get; set; }
    }

    public class EndpointEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public EndpointActions EndpointActions { get; set; }
    }
}
