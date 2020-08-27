using System;
using System.Reflection;
using MediatR.Registration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Statistics
{
    public static class Installer
    {
        private static Assembly Assembly => Assembly.GetExecutingAssembly();

        public static void AddStatistics(this IServiceCollection serviceCollection, string connectionString)
        {
            ServiceRegistrar.AddMediatRClasses(serviceCollection, new[] {Assembly});

            serviceCollection.AddDbContext<StatisticsDbContext>(options =>
                    options.UseSqlServer(connectionString,
                        x => x.MigrationsHistoryTable("__EFMigrationsHistory", "Stats")),
                ServiceLifetime.Transient);
        }

        public static void MigrateStatisticsDb(IServiceProvider serviceProvider)
        {
            using var dbContext = serviceProvider.GetService<StatisticsDbContext>();
            dbContext.Database.Migrate();
        }
    }
}
