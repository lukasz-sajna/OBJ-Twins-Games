using System;
using Hangfire.Dashboard;

namespace Obj.Twins.Games.Api.Helpers
{
    public class HangFireAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {
            return true;
        }
    }
}
