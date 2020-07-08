using System.ComponentModel;
using Hangfire;
using MediatR;
using Obj.Twins.Games.DataSync.Components.Commands;

namespace Obj.Twins.Games.Api.Helpers
{
    public static class HangFireHelpers
    {
        public static IMediator Mediator { private get; set; }

        [AutomaticRetry(Attempts = 0)]
        [DisplayName("Processing command {0}")]
        public static void SyncMatches(SyncMatchesCommand command)
        {
            Mediator.Send(command);
        }

        [AutomaticRetry(Attempts = 3)]
        [DisplayName("Processing command {0}")]
        public static void SyncPlayersSteamData(SyncPlayerSteamDataCommand command)
        {
            Mediator.Send(command);
        }

        [AutomaticRetry(Attempts = 3)]
        [DisplayName("Processing command {0}")]
        public static void SyncMatchesDemo(SyncMatchesDemoCommand command)
        {
            Mediator.Send(command);
        }
    }
}
