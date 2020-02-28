using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.Domain
{
    public interface IBaseRepository
    {
        int ErrorNo { get; set; }
        string ErrorMessage { get; set; }
        string GlobalErrorMessage { get; set; }
        void ErrorLog(string errorMessage);
        string JsonFilePath { get; set; }
        string GetSqlReader(string key);
        string GetGlobalMessage(string key);
        string GetAppMessage(string key);
    }
}
