using System.Threading.Tasks;
using Obj.Twins.Games.Steam.Client.Contracts;

namespace Obj.Twins.Games.Steam.Client.Services
{
    public interface ISteamService
    {
        Task<PlayerSummariesResponse> GetPlayerSummary(string steamId);
    }
}