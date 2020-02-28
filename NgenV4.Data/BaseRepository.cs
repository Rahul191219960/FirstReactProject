using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;
using NgenV4.Domain;

namespace NgenV4.Data
{
    public class BaseRepository : IBaseRepository
    {
        public int ErrorNo { get; set; }
        public string ErrorMessage { get; set; }
        public string GlobalErrorMessage { get; set; }
        public string JsonFilePath { get; set; }

        public BaseRepository()
        {
            this.GlobalErrorMessage = "Unable to process, Please contact to administrator!";
        }
        public void ErrorLog(string errorMessage)
        {

        }
        public string GetSqlReader(string key)
        {
            var dir = Directory.GetCurrentDirectory() + @"\Config\" + JsonFilePath;
            var global = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory() + @"\Config")
                .AddJsonFile("global.json");

            var sqljson = global.Build().GetSection("SqlStatement").Value;

            var builder = new ConfigurationBuilder()
                .SetBasePath(dir)
                .AddJsonFile(sqljson);

            var config = builder.Build().GetSection(key).Value;
            return config;
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

