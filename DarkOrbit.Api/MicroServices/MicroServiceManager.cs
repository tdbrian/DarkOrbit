using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.ApplicationsRunner;
using DarkOrbit.Api.Utilities.Go;

namespace DarkOrbit.Api.MicroServices
{
    public class MicroServiceManager
    {
        private const string companyName = "tbrian.darkorbit.io";

        /// <summary>
        /// Generates micro-service go application and puts it in the user's
        /// go application directory under dark orbit space for their company.
        /// </summary>
        /// <param name="entity">The micro-service entity to generate the project.</param>
        public async Task GenerateService(MicroServiceEntity entity)
        {
            await GoServiceGenerator.Generate(companyName, entity);
            await ApplicationsRunner.Start(companyName, entity);
        }

        public async Task DeleteService(MicroServiceEntity entity)
        {
            await GoProjectDeletion.RemoveProject(companyName, entity);
        }
    }
}
