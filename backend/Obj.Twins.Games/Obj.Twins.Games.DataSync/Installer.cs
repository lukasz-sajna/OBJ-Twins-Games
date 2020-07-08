using System.Reflection;
using MediatR.Registration;
using Microsoft.Extensions.DependencyInjection;

namespace Obj.Twins.Games.DataSync
{
    public static class Installer
    {
        private static Assembly Assembly => Assembly.GetExecutingAssembly();

        public static void AddDataSync(this IServiceCollection serviceCollection)
        {
            ServiceRegistrar.AddMediatRClasses(serviceCollection, new[] { Assembly });
        }
    }
}
