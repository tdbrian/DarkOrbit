using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Events
{
    public class EventEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
