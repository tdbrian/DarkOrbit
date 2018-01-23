using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.ServiceManager
{
    public class ServiceManagerEntity : MongoDbEntityBase
    {
        public string ServiceId { get; set; }

        public RunningService[] RunningServices { get; set; }
    }
}
