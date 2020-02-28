using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace NgenV4.Service
{
    public class BaseService : IBaseService
    {
        public int ErrorNo { get; set; }
        public string ErrorMessage { get; set; }
        public BaseService()
        {
        }
        public void ErrorLog(string errorMessage)
        {

        }
        public string GetGlobalMessage(string key)
        {
            var dir = Directory.GetCurrentDirectory() + @"\Config\GlobalMessages";
            var global = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory() + @"\Config")
                .AddJsonFile("global.json");

            var js = global.Build().GetSection("GlobalMessage").Value;

            var builder = new ConfigurationBuilder()
                .SetBasePath(dir)
                .AddJsonFile(js);

            var config = builder.Build().GetSection(key).Value;
            return config;
        }
        public string GetAppMessage(string key)
        {
            var dir = Directory.GetCurrentDirectory() + @"\Config\AppMessages";
            var global = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory() + @"\Config")
                .AddJsonFile("global.json");

            var sqljson = global.Build().GetSection("AppMessage").Value;

            var builder = new ConfigurationBuilder()
                .SetBasePath(dir)
                .AddJsonFile(sqljson);

            var config = builder.Build().GetSection(key).Value;
            return config;
        }
    }
}
