using System.Collections.Generic;

namespace Obj.Twins.Games.Api.Health
{
    public class HealthCheckResponse
    {
        public string Status { get; set; }

        public IEnumerable<HealthCheck> Checks { get; set; }

        public string Duration { get; set; }
    }
}
