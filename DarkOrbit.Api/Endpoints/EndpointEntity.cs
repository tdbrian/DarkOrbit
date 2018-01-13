using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Endpoints
{
    public class EndpointEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
