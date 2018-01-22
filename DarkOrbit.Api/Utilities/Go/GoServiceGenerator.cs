using System.IO;
using System.Threading.Tasks;
using DarkOrbit.Api.MicroServices;

namespace DarkOrbit.Api.Utilities.Go
{
    public class GoServiceGenerator
    {
        public static async Task Generate(string companyName, MicroServiceEntity entity)
        {
            var newProjectDir = await GoFilePaths.GetProjectPath(companyName, entity.Name);

            if (!Directory.Exists(newProjectDir))
            {
                Directory.CreateDirectory(newProjectDir);
            }

            await GoFileGenerator.GenerateMainFile(newProjectDir, "localhost", "3000");
        }
    }
}
