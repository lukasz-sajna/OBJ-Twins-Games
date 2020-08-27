using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Obj.Twins.Games.DataSync.Hubs
{
    public class StatisticsHub : Hub
    {
        public async Task NotifyStatisticsChanged()
        {
            await Clients.All.SendAsync("StatsRefreshed");
        }
    }
}
