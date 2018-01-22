using System.Threading.Tasks;
using DarkOrbit.Api.Utilities.WriteOperations;

namespace DarkOrbit.Api.MicroServices
{
    public class MicroServiceManager
    {
        /// <summary>
        /// Generates micro-service go application and puts it in the user's
        /// go application directory under dark orbit space for their company.
        /// </summary>
        /// <param name="entity">The micro-service entity to generate the project.</param>
        public async Task GenerateService(MicroServiceEntity entity)
        {
            const string companyName = "tbrian.darkorbit.io";
            var fw = new ApplicationFileWriter();
            await fw.WriteNewProject(companyName, entity);
        }
    }
}
