using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;

namespace DarkOrbit.Api.Utilities.Ports
{
    public class MachinePorts
    {
        /// <summary>
        /// Checks for used ports and retrieves the first free port
        /// </summary>
        /// <returns>the free port or 0 if it did not find a free port</returns>
        public static int GetAvailablePort(int startingPort)
        {
            var portArray = new List<int>();
            var properties = IPGlobalProperties.GetIPGlobalProperties();

            //getting active connections
            var connections = properties.GetActiveTcpConnections();
            portArray.AddRange(from n in connections
                where n.LocalEndPoint.Port >= startingPort
                select n.LocalEndPoint.Port);

            //getting active tcp listeners - WCF service listening in tcp
            var endPoints = properties.GetActiveTcpListeners();
            portArray.AddRange(from n in endPoints
                where n.Port >= startingPort
                select n.Port);

            //getting active udp listeners
            endPoints = properties.GetActiveUdpListeners();
            portArray.AddRange(from n in endPoints
                where n.Port >= startingPort
                select n.Port);

            portArray.Sort();

            for (var i = startingPort; i < ushort.MaxValue; i++)
            {
                if (!portArray.Contains(i))
                {
                    return i;
                }
            }

            return 0;
        }
    }
}
