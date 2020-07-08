using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Obj.Twins.Games.Demo.Client.Config;
using Obj.Twins.Games.Demo.Client.Services;

namespace Obj.Twins.Games.Demo.Client
{
    public static class Installer
    {
        public static void AddDemoClient(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection.Configure<DemoClientSettings>(configuration.GetSection(nameof(DemoClientSettings)));

            serviceCollection.AddSingleton<IDemoService, DemoService>();
        }
    }
}
