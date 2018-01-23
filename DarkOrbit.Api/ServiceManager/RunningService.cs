namespace DarkOrbit.Api.ServiceManager
{
    public class RunningService
    {
        public string Branch { get; set; }

        public string Version { get; set; }

        public int Port { get; set; }

        public string Host { get; set; }

        public string Status { get; set; }

        public int RestartCounter { get; set; }
    }

    public class RunningServiceStatuses
    {
        public static string Running = "Running";
        public static string Stopped = "Stopped";
        public static string Crashed = "Crashed";
    }
}