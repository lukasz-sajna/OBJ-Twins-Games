using System;
using System.Threading.Tasks;

namespace Obj.Twins.Games.Demo.Client.Services
{
    public interface IDemoService
    {
        Task<string> GetDemoUrlForMatch(string map, DateTime matchFinishDateTime);
    }
}