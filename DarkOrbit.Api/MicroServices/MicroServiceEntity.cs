using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.MicroServices
{
    public class MicroServiceEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
