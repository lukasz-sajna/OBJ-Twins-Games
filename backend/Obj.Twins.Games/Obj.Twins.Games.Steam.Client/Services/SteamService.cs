using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Obj.Twins.Games.Steam.Client.Config;
using Obj.Twins.Games.Steam.Client.Contracts;

namespace Obj.Twins.Games.Steam.Client.Services
{
    public class SteamService : ISteamService
    {
        private readonly SteamApiSettings _steamApiSettings;

        public SteamService(IOptions<SteamApiSettings> steamApiSettings)
        {
            this._steamApiSettings = steamApiSettings.Value;
        }

        public async Task<PlayerSummariesResponse> GetPlayerSummary(string steamId)
        {
            using var httpClient = new HttpClient();
            var response =
                await httpClient.GetStringAsync(string.Format(Endpoints.PlayerSummaries, _steamApiSettings.Key,
                    steamId));

            return JsonConvert.DeserializeObject<PlayerSummariesResponse>(response);
        }
    }
}
