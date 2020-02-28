using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;

namespace NgenV4.Service
{
    public interface IContactService : IBaseService
    {
        Task<IEnumerable<ContactViewModelGrid>> GetList(DataSourceRequestViewModel dataSource);
        Task SaveRecord(ContactViewModel ar);
        Task UpdateRecord(JObject ar, int id);
        Task DeleteRecord(string SNo);
        Task<ContactViewModel> GetRecord(string SNo);
    }
}
