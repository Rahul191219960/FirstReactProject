using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.Service
{
    public interface IBaseService
    {
        int ErrorNo { get; set; }
        string ErrorMessage { get; set; }
        void ErrorLog(string errorMessage);
        string GetGlobalMessage(string key);
        string GetAppMessage(string key);
    }
}
