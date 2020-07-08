using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Obj.Twins.Games.Steam.Client.Config;
using Obj.Twins.Games.Steam.Client.Services;

namespace Obj.Twins.Games.Steam.Client
{
    public static class Installer
    {
        public static IServiceCollection AddSteamApiClient(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            var steamApiSettings = configuration.GetSection(nameof(SteamApiSettings));

            serviceCollection.Configure<SteamApiSettings>(steamApiSettings);
            serviceCollection.AddTransient<ISteamService, SteamService>();

            return serviceCollection;
        }
    }
}
