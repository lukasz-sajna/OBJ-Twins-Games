using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Obj.Twins.Games.Api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IWebHostEnvironment webHostEnvironment)
        {
            _next = next;
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
        }

        // ReSharper disable once UnusedMember.Global
        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error: ");
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            string message;

            HttpStatusCode status;
            switch (exception)
            {
                default:
                    status = HttpStatusCode.InternalServerError;
                    message = exception.Message;
                    break;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)status;

            if (IsDevelopmentOrTestEnvironment())
            {
                var body = new
                {
                    message,
                    exceptionMessage = exception.Message,
                    exceptionText = exception.ToString(),
                    exception
                };

                return context.Response.WriteAsync(JsonConvert.SerializeObject(body));
            }
            else
            {
                var body = new
                {
                    message
                };

                return context.Response.WriteAsync(JsonConvert.SerializeObject(body));
            }
        }

        private bool IsDevelopmentOrTestEnvironment()
        {
            return _webHostEnvironment.IsDevelopment();
        }
    }
}
