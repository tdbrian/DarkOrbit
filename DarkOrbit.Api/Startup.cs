using DarkOrbit.Api.Commands;
using DarkOrbit.Api.Endpoints;
using DarkOrbit.Api.Events;
using DarkOrbit.Api.MicroServices;
using DarkOrbit.Api.Processes;
using DarkOrbit.Api.Resources;
using DarkOrbit.Api.ServiceManager;
using DarkOrbit.Api.Users;
using DarkOrbit.Api.Utilities.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace DarkOrbit.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "DarkOrbit", Version = "v1" });
            });

            services.AddSingleton<CustomerMongoDb>();
            services.AddTransient<MicroServicesMongo>();
            services.AddTransient<EndpointsMongo>();
            services.AddTransient<ProcessesMongo>();
            services.AddTransient<ResourcesMongo>();
            services.AddTransient<UsersMongo>();
            services.AddTransient<CommandsMongo>();
            services.AddTransient<EventsMongo>();
            services.AddTransient<MicroServiceManager>();
            services.AddTransient<ServiceManagerMongo>();
            services.AddTransient<ServiceManagerManager>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "DarkOrbit");
            });
            app.UseMvc();
        }
    }
}
