using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DarkOrbit.Api.ServiceManager
{
    public class ServiceManagerManager
    {
        private readonly ServiceManagerMongo _serviceManagersRepo;

        public ServiceManagerManager(ServiceManagerMongo serviceManagersRepo)
        {
            _serviceManagersRepo = serviceManagersRepo;
        }

        public Task<List<ServiceManagerEntity>> GetLiveServiceStatuses()
        {
            throw new NotImplementedException();
        }

        public Task StartService(ServiceManagerEntity managerEntity)
        {
            throw new NotImplementedException();
        }

        public Task StopService(ServiceManagerEntity managerEntity)
        {
            throw new NotImplementedException();
        }

        public Task RestartService(ServiceManagerEntity managerEntity)
        {
            throw new NotImplementedException();
        }
    }
}
