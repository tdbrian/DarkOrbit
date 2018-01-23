using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CliWrap;
using Humanizer;

namespace DarkOrbit.Api.Utilities.Go
{
    public class GoFilePaths
    {
        public static async Task<string> GetGoEnvironmentPath()
        {
            using (var cli = new Cli("go.exe"))
            {
                var output = await cli.ExecuteAsync("env");
                output.ThrowIfError();
                var fullGoPath = output.StandardOutput.Split("\r\n").FirstOrDefault(l => l.StartsWith("set GOPATH="));
                var errMsg = $"Go path not found in {nameof(GetGoEnvironmentPath)}";
                var match = Regex.Match(fullGoPath ?? throw new Exception(errMsg), @"(?<=set GOPATH=).*", RegexOptions.ECMAScript);
                if (!match.Success) throw new Exception(errMsg);
                var goPath = match.Groups.First();
                return goPath.Value;
            }
        }

        public static async Task<string> GetProjectPath(string companyName, string projectName)
        {
            var normalizedCompanyName = companyName.Kebaberize();
            var goPath = await GetGoEnvironmentPath();
            var newProjectDir = Path.Combine(goPath, "src", normalizedCompanyName, Constants.appNamePrefix + projectName.Kebaberize());
            return newProjectDir;
        }
    }
}
