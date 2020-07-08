using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Obj.Twins.Games.Api.Config;
using Obj.Twins.Games.ServerStatistics.Persistence;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureCors(this IServiceCollection services, CorsSettings corsSettings, string policyName)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(policyName,corsBuilder => corsBuilder
                    .WithOrigins(corsSettings.AllowedUrls.Split(";").Select(x => x.Trim()).ToArray())
                    .AllowAnyMethod().AllowAnyHeader().AllowCredentials()
                );
            });

            return services;
        }

        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "OBJ Twins Games Stats API",
                    Version = "v1"
                });
            });

            return services;
        }

        public static IServiceCollection ConfigureSignalR(this IServiceCollection services)
        {
            services.AddSignalR();

            return services;
        }

        public static IServiceCollection ConfigureHealthChecks(this IServiceCollection services)
        {
            services.AddHealthChecks()
                .AddDbContextCheck<StatsDbContext>()
                .AddDbContextCheck<ServerStatsDbContext>();

            return services;
        }
    }
}
