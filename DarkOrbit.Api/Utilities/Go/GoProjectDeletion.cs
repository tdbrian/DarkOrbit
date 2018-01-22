using System.IO;
using System.Threading.Tasks;
using DarkOrbit.Api.MicroServices;
using DarkOrbit.Api.Utilities.FileSystem;

namespace DarkOrbit.Api.Utilities.Go
{
    public class GoProjectDeletion
    {
        public static async Task RemoveProject(string companyName, MicroServiceEntity entity)
        {
            var path = await GoFilePaths.GetProjectPath(companyName, entity.Name);
            if (Directory.Exists(path))
            {
                DeleteHelper.DeleteDirectory(path);
            }
        }
    }
}
