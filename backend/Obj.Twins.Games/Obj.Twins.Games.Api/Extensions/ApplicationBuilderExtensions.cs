using System;
using System.Linq;
using Hangfire;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Obj.Twins.Games.Api.Health;
using Obj.Twins.Games.Api.Helpers;
using Obj.Twins.Games.Api.Middleware;
using Obj.Twins.Games.DataSync.Components.Commands;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Obj.Twins.Games.Api.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static void UseCustomSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(config => { config.SwaggerEndpoint("/swagger/v1/swagger.json", "OBJ Twins Games Stats API v1"); });
        }

        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }

        public static void UseCustomHealthCheck(this IApplicationBuilder app)
        {
            app.UseHealthChecks("/health", new HealthCheckOptions
            {
                AllowCachingResponses = false,
                ResponseWriter = async (context, report) =>
                {
                    context.Response.ContentType = "application/json";
                    var response = new HealthCheckResponse
                    {
                        Status = report.Status.ToString(),
                        Checks = report.Entries.Select(x =>
                            new HealthCheck
                            {
                                Component = x.Key,
                                Status = x.Value.Status.ToString(),
                                Description = x.Value.Description,
                                Duration = x.Value.Duration.ToString()
                            }),
                        Duration = report.TotalDuration.ToString()
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(response)).ConfigureAwait(true);
                }
            });
        }

        public static void UseHangfire(this IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();

            app.UseHangfireServer(new BackgroundJobServerOptions
            {
                Activator = new DependencyJobActivator(serviceScope.ServiceProvider),
                WorkerCount = Environment.ProcessorCount * 5, Queues = new[] {Queues.SyncPlayers, Queues.SyncMatches, Queues.SyncDemos}
            });
            
            GlobalConfiguration.Configuration.UseSerializerSettings(new JsonSerializerSettings
                {TypeNameHandling = TypeNameHandling.Objects});

            HangFireHelpers.Mediator = serviceScope.ServiceProvider.GetService<IMediator>();

            RecurringJob.AddOrUpdate(() => HangFireHelpers.SyncMatches(new SyncMatchesCommand()), "*/5 * * * *", TimeZoneInfo.Utc, Queues.SyncMatches);
            RecurringJob.AddOrUpdate(() => HangFireHelpers.SyncPlayersSteamData(new SyncPlayerSteamDataCommand()), Cron.Hourly, TimeZoneInfo.Utc, Queues.SyncPlayers);
            RecurringJob.AddOrUpdate(() => HangFireHelpers.SyncMatchesDemo(new SyncMatchesDemoCommand()), "*/5 * * * *", TimeZoneInfo.Utc, Queues.SyncDemos);
        }

        public static IApplicationBuilder UpdateDatabase(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            Statistics.Installer.MigrateStatisticsDb(serviceScope.ServiceProvider);

            return app;
        }
    }
}
