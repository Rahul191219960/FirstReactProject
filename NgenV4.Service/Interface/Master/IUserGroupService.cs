using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;

namespace NgenV4.Service
{
    public interface    IUserGroupService : IBaseService
    {
        Task<IEnumerable<UserGroupViewModelGrid>> GetList(DataSourceRequestViewModel dataSource);
        Task SaveRecord(UserGroupViewModel ar);
        Task UpdateRecord(JObject ar, int id);
        Task DeleteRecord(string SNo);
        Task<UserGroupViewModel> GetRecord(string SNo);
    }
}
