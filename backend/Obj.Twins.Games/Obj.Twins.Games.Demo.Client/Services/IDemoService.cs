using System;
using System.Threading.Tasks;

namespace Obj.Twins.Games.Demo.Client.Services
{
    public interface IDemoService
    {
        string GetDemoUrlForMatch(string map, DateTime matchFinishDateTime);

        Task RefreshMatchDemoList();
    }
}