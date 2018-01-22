using System.IO;
using System.Threading.Tasks;
using CliWrap;
using DarkOrbit.Api.MicroServices;
using DarkOrbit.Api.Utilities.Go;
using Humanizer;

namespace DarkOrbit.Api.Utilities.ApplicationsRunner
{
    public class ApplicationsRunner
    {
        public static async Task Start(string companyName, MicroServiceEntity entity)
        {
            var projectName = entity.Name.Kebaberize();
            var projectPath = await GoFilePaths.GetProjectPath(companyName, entity.Name);

            await GoCommands.Build(projectPath);

            using (var cli = new Cli(Path.Combine(projectPath, projectName + ".exe")))
            {
                cli.ExecuteAndForget();
            }
        }
    }
}
