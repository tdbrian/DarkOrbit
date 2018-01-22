using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;

namespace DarkOrbit.Api.Utilities.Go
{
    public class GoFileGenerator
    {
        public static async Task GenerateMainFile(string projectDirectory, string host, string port)
        {
            var mainFilePath = Path.Combine(projectDirectory, "main.go");
            if (!File.Exists(mainFilePath))
            {
                // Package line
                var mainFileLines = new List<string> {GeneratePackage("main")};

                // Import block
                var importBlock = GenerateImports(new List<string> { "github.com/gin-gonic/gin" });
                mainFileLines = mainFileLines.Concat(importBlock).ToList();

                // Contents
                var contents = new List<string>
                {
                    "r := gin.Default()",
                    "r.GET(\"/health-check\", healthCheck)",
                    $"r.Run(\"{host}:{port}\")",
                };

                // Main function
                mainFileLines = mainFileLines.Concat(GenerateFunction("main", contents)).ToList();

                // Write main file
                await File.WriteAllLinesAsync(mainFilePath, mainFileLines);

                GoCommands.RunGoFileFormatter(mainFilePath);
            }
        }

        public static List<string> AddNewLine(List<string> content)
        {
            content.Add(Environment.NewLine);
            return content;
        }

        public static string GeneratePackage(string name)
        {
            return $"package {name}";
        }

        public static List<string> GenerateImports(List<string> packages)
        {
            // Surround each package with quotes
            packages = packages.Select(l => $"\"{l}\"").ToList();

            var importLines = new List<string> {"import ("};
            importLines = importLines.Concat(packages).ToList();
            importLines.Add(")");
            return importLines;
        }

        public static List<string> GenerateFunction(string name, List<string> innerLines, List<string> args = null)
        {
            var argumentsString = "()";
            if (args != null)
            {
                argumentsString = "(" + string.Join(", ", args) + ")";
            }

            var lines = new List<string> {"func " + name + argumentsString + " {"};
            lines = lines.Concat(innerLines).ToList();
            lines.Add("}");
            return lines;
        }

        public static async Task GenerateHealthcheckFile(string projectDirectory, string name)
        {
            var mainFilePath = Path.Combine(projectDirectory, $"{name.Kebaberize()}.go");
            if (File.Exists(mainFilePath)) return;
            
            // Package line
            var mainFileLines = new List<string> { GeneratePackage("main") };

            // Import block
            var importBlock = GenerateImports(new List<string> { "github.com/gin-gonic/gin" });
            mainFileLines = mainFileLines.Concat(importBlock).ToList();

            // Arguments
            var arguments = new List<string> { "c *gin.Context" };

            // Contents
            var contents = new List<string>
            {
                "c.JSON(200, gin.H{",
                "\"status\": \"running\",",
                "})"
            };

            // Main function
            mainFileLines = mainFileLines.Concat(GenerateFunction("healthCheck", contents, arguments)).ToList();

            // Write main file
            await File.WriteAllLinesAsync(mainFilePath, mainFileLines);

            GoCommands.RunGoFileFormatter(mainFilePath);
        } 
    }
}
