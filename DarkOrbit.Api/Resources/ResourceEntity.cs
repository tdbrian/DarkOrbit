using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Resources
{
    public class ResourceEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
