using System;
using System.IO;
using System.Threading.Tasks;
using CliWrap;

namespace DarkOrbit.Api.Utilities.Go
{
    public class GoCommands
    {
        private const string GoExec = "go.exe";
        private const string GoFormatterExec = "gofmt.exe";

        public static async void FormatFile(string goFilePath)
        {
            if (!File.Exists(goFilePath)) throw new ArgumentException("Argument projectPath does not exist");

            using (var cli = new Cli(GoFormatterExec))
            {
                var output = await cli.ExecuteAsync($"-w {goFilePath}");
                output.ThrowIfError();
            }
        }

        public static async Task Build(string projectPath)
        {
            if (!Directory.Exists(projectPath)) throw new ArgumentException("Argument projectPath does not exist");

            using (var cli = new Cli(GoExec, projectPath))
            {
                var status = await cli.ExecuteAsync("build");
                if (status.HasError)
                {
                    Console.WriteLine("Go build error occurred:", status.StandardError);
                }
                else
                {
                    Console.WriteLine($"Build completed at {projectPath}");
                }
            }
        }
    }
}
