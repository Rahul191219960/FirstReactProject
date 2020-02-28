using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;

namespace NgenV4.Service
{
    public interface    IUsersService : IBaseService
    {
        Task<IEnumerable<UsersViewModelGrid>> GetList(DataSourceRequestViewModel dataSource);
        Task SaveRecord(UsersViewModel ar);
        Task UpdateRecord(JObject ar, int id);
        Task DeleteRecord(string SNo);
        Task<UsersViewModel> GetRecord(string SNo);
    }
}
