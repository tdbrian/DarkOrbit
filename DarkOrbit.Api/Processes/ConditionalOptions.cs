using System.Collections.Generic;

namespace DarkOrbit.Api.Processes
{
    public class ConditionalOptions
    {
        public LogicBlock Logic { get; set; }

        public int Order { get; set; }

        public List<ProcessStep> Steps { get; set; }
    }
}