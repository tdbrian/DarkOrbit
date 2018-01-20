using System.Collections.Generic;
using DarkOrbit.Api.Utilities.Database;

namespace DarkOrbit.Api.Processes
{
    public class ProcessEntity : MongoDbEntityBase
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public List<ProcessStep> Steps { get; set; }

        public List<Input> Inputs { get; set; }

        public List<Output> Outputs { get; set; }
    }
}
