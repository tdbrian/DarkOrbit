using System;
using System.IO;
using System.Threading.Tasks;
using CliWrap;
using DarkOrbit.Api.MicroServices;
using DarkOrbit.Api.Utilities.Go;
using DarkOrbit.Api.Utilities.Ports;
using Humanizer;

namespace DarkOrbit.Api.Utilities.ApplicationsRunner
{
    public class ApplicationsRunner
    {
        public static async Task Start(string companyName, MicroServiceEntity entity)
        {
            var projectName = Constants.appNamePrefix + entity.Name.Kebaberize();
            var projectPath = await GoFilePaths.GetProjectPath(companyName, entity.Name);

            await GoCommands.Build(projectPath);
            var buildPath = Path.Combine(projectPath, projectName + ".exe");

            var port = MachinePorts.GetAvailablePort(3000);
            var runLocation = $"localhost:{port}";
            Console.WriteLine($"Attempting to run {entity.Name} at {runLocation}");

            using (var cli = new Cli(buildPath))
            {
                cli.ExecuteAndForget(runLocation);
                Console.WriteLine($"{entity.Name} running at {runLocation}");
            }
        }
    }
}
