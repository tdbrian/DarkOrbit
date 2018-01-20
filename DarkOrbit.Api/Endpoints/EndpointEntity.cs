using System.Collections.Generic;
using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Endpoints
{
    public class EndpointEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string ServiceId { get; set; }

        public bool RequiresAuthentication { get; set; }

        public List<EndpointMethod> EndpointMethods { get; set; }
    }
}
