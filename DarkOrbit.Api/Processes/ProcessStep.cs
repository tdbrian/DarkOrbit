namespace DarkOrbit.Api.Processes
{
    public class ProcessStep
    {
        public string Name { get; set; }

        public string ParentStep { get; set; }

        public int Order { get; set; }

        public int NestedDepth { get; set; }

        public string Type { get; set; }
    }
}