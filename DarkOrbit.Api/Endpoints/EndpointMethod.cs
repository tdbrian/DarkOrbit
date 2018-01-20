using System.Collections.Generic;

namespace DarkOrbit.Api.Endpoints
{
    public class EndpointMethod
    {
        public string Type { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ProcessId { get; set; }

        public List<string> SubRouteFragments { get; set; }
    }
}