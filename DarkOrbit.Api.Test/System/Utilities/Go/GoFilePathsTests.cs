using DarkOrbit.Api.Utilities.Go;
using Xunit;

namespace DarkOrbit.Api.Test.System.Utilities.Go
{
    public class GoFilePathsTests
    {
        [Fact]
        public async void GetGoEnvironmentPath_SuccessfullyGetsPath()
        {
            var path = await GoFilePaths.GetGoEnvironmentPath();
            Assert.NotNull(path);
            Assert.IsType<string>("C:\\Users\\tbrian\\go");
            Assert.True(path.Length > 1);
        }
    }
}
