using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Commands
{
    public class CommandEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
