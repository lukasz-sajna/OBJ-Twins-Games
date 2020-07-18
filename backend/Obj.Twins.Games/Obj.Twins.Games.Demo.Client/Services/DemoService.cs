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

        public DemoService(IOptions<DemoClientSettings> demoClientSettings)
        {
            if (demoClientSettings == null)
            {
                throw new NullReferenceException();
            }

            _demoClientSettings = demoClientSettings.Value;
        }

        public async Task<string> GetDemoUrlForMatch(string map, DateTime matchFinishDateTime)
        {
            var demosList = await GetDemoListAsync();

            var matchDemo = demosList.Where(x =>
                    x.Map.Equals(map) && DateTime.Compare(x.Stop.Date, matchFinishDateTime.Date) == 0)
                .OrderBy(x => x.Stop)
                .FirstOrDefault(x => DateTime.Compare(x.Stop, RemoveSecondsFromDateTime(matchFinishDateTime)) >= 0);

            return matchDemo?.Url;
        }

        private async Task<List<DemoData>> GetDemoListAsync()
        {
            var demosList = new List<DemoData>();

            using var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(_demoClientSettings.Url);

            dynamic jsonDemoData = JsonConvert.DeserializeObject(json);

            if (jsonDemoData != null)
            {
                foreach (var item in jsonDemoData)
                {
                    var demos = JsonConvert.DeserializeObject<List<DemoData>>(item.Value.ToString());
                    demosList.AddRange(demos);
                }
            }

            return demosList;
        }

        private DateTime RemoveSecondsFromDateTime(DateTime input)
        {
            return input.Second >= 30
                ? new DateTime(input.Year, input.Month, input.Day, input.Hour, input.Minute + 1, 0)
                : new DateTime(input.Year, input.Month, input.Day, input.Hour, input.Minute, 0);
        }
    }
}
