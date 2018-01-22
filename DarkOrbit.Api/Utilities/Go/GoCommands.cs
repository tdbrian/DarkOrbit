using System;
using System.IO;
using CliWrap;

namespace DarkOrbit.Api.Utilities.Go
{
    public class GoCommands
    {
        /// <summary>
        /// Uses go file formatter to correctly format a go file.
        /// </summary>
        /// <param name="path">Path to the go file being formatted.</param>
        public static async void RunGoFileFormatter(string path)
        {
            if (!File.Exists(path)) throw new ArgumentException("Argument path does not exist");

            using (var cli = new Cli("gofmt.exe"))
            {
                var output = await cli.ExecuteAsync($"-w {path}");
                output.ThrowIfError();
            }
        }
    }
}
