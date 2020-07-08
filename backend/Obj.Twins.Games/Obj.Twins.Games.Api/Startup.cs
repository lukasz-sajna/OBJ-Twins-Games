using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using MediatR;
using Microsoft.AspNetCore.HttpOverrides;
using Obj.Twins.Games.Api.Config;
using Obj.Twins.Games.Api.Extensions;
using Obj.Twins.Games.DataSync;
using Obj.Twins.Games.DataSync.Hubs;
using Obj.Twins.Games.Demo.Client;
using Obj.Twins.Games.ServerStatistics;
using Obj.Twins.Games.Statistics;
using Obj.Twins.Games.Steam.Client;
// ReSharper disable UnusedMember.Global

namespace Obj.Twins.Games.Api
{
    public class Startup
    {
        public Startup(IHostEnvironment env)
        {
            if (env == null)
            {
                return;
            }

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.ConfigureCors(Configuration.GetSection(nameof(CorsSettings)).Get<CorsSettings>(), Const.DefaultCorsPolicy);
            services.ConfigureSwagger();
            services.ConfigureSignalR();
            services.ConfigureHealthChecks();
            services.AddMediatR(typeof(Startup));

            services.AddStatistics(Configuration.GetConnectionString("DefaultConnection"));
            services.AddServerStatistics(Configuration.GetConnectionString("ServerStatsConnection"));
            services.AddDataSync();
            services.AddSteamApiClient(Configuration);
            services.AddDemoClient(Configuration);

            services.AddHangfire(x => x.UseSqlServerStorage(Configuration.GetConnectionString("DefaultConnection"),
                new SqlServerStorageOptions {QueuePollInterval = TimeSpan.FromSeconds(20)}));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCustomSwagger();
                app.UseHangfireDashboard(options: new DashboardOptions {StatsPollingInterval = 5000});
            }

            //app.UseHttpsRedirection();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                // Read and use headers coming from reverse proxy: X-Forwarded-For X-Forwarded-Proto
                // This is particularly important so that HttpContent.Request.Scheme will be correct behind a SSL terminating proxy
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                                   ForwardedHeaders.XForwardedProto
            });

            app.UseCors(Const.DefaultCorsPolicy);
            app.UpdateDatabase();
            app.UseHangfire();
            app.UseRouting();
            app.UseAuthorization();
            app.ConfigureCustomExceptionMiddleware();
            app.UseEndpoints(endpoints => { endpoints.MapControllers();
                endpoints.MapHub<StatisticsHub>($"{Const.SignalRHubsPathRoot}/stats");
            });
            app.UseCustomHealthCheck();
        }
    }
}
