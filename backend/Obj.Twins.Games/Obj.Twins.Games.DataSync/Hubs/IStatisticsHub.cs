using System.Threading.Tasks;

namespace Obj.Twins.Games.DataSync.Hubs
{
    public interface IStatisticsHub
    {
        Task NotifyStatisticsChanged();
    }
}
