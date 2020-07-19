using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Obj.Twins.Games.Demo.Client.Config;
using Obj.Twins.Games.Demo.Client.Models;

namespace Obj.Twins.Games.Demo.Client.Services
{
    public class DemoService : IDemoService
    {
        private readonly DemoClientSettings _demoClientSettings;

        private readonly List<DemoData> _matchDemos = new List<DemoData>();

        public DemoService(IOptions<DemoClientSettings> demoClientSettings)
        {
            if (demoClientSettings == null)
            {
                throw new NullReferenceException();
            }

            _demoClientSettings = demoClientSettings.Value;
        }

        public string GetDemoUrlForMatch(string map, DateTime matchFinishDateTime)
        {
            var matchDemo = _matchDemos
                .Where(x => x.Map.Equals(map) && x.Stop.Date.CompareTo(matchFinishDateTime.Date) == 0)
                .OrderBy(x => x.Stop)
                .FirstOrDefault(x => x.Stop.CompareTo(RemoveSecondsFromDateTime(matchFinishDateTime)) >= 0);

            return matchDemo?.Url;
        }

        public async Task RefreshMatchDemoList()
        {
            _matchDemos.Clear();

            using var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(_demoClientSettings.Url);

            dynamic jsonDemoData = JsonConvert.DeserializeObject(json);

            if (jsonDemoData != null)
            {
                foreach (var item in jsonDemoData)
                {
                    var demos = JsonConvert.DeserializeObject<List<DemoData>>(item.Value.ToString());
                    _matchDemos.AddRange(demos);
                }
            }
        }

        private static DateTime RemoveSecondsFromDateTime(DateTime input)
        {
            return input.Second >= 30
                ? new DateTime(input.Year, input.Month, input.Day, input.Hour, input.Minute + 1, 0)
                : new DateTime(input.Year, input.Month, input.Day, input.Hour, input.Minute, 0);
        }
    }
}
