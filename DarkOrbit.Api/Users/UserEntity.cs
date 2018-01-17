using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Users
{
    public class UserEntity : MongoDbEntityBase
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
