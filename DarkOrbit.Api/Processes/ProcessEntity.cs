using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Processes
{
    public class ProcessEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
