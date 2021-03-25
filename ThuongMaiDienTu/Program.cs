using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMDT.Data;

namespace ThuongMaiDienTu
{
    public class Program
    {
        public static void Main()
        {
            var host = CreateHostBuilder();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<ECContext>();
                SeedData.Initialize(context);
            }

            host.Run();
        }

        private static IHost CreateHostBuilder()
        {
            return Host.CreateDefaultBuilder()
                        .ConfigureWebHostDefaults(webBuilder =>
                        {
                            webBuilder.UseStartup<Startup>();
                        })
                        .Build();
        }
    }
}
