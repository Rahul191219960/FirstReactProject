using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;

namespace NgenV4.Service
{
    public interface    ISample1Service : IBaseService
    {
        Task<IEnumerable<Sample1ViewModelGrid>> GetList(DataSourceRequestViewModel dataSource);
        Task SaveRecord(Sample1ViewModel ar);
        Task UpdateRecord(JObject ar, int id);
        Task DeleteRecord(string SNo);
        Task<Sample1ViewModel> GetRecord(string SNo);
    }
}
