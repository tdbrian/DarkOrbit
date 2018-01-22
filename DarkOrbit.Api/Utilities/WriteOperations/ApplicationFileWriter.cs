using System.IO;
using System.Threading.Tasks;
using DarkOrbit.Api.MicroServices;
using DarkOrbit.Api.Utilities.Go;

namespace DarkOrbit.Api.Utilities.WriteOperations
{
    public class ApplicationFileWriter
    {
        public async Task WriteNewProject(string companyName, MicroServiceEntity entity)
        {
            var newProjectDir = await GoFilePaths.GetProjectPath(companyName, entity.Name);

            if (!Directory.Exists(newProjectDir))
            {
                Directory.CreateDirectory(newProjectDir);
            }


        }
    }
}
