using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Obj.Twins.Games.ServerStatistics.Persistence;

namespace Obj.Twins.Games.ServerStatistics
{
    public static class Installer
    {
        public static void AddServerStatistics(this IServiceCollection serviceCollection, string connectionString)
        {

            serviceCollection.AddDbContext<ServerStatsDbContext>(options =>
                options.UseMySQL(connectionString), ServiceLifetime.Transient);
        }
    }
}
