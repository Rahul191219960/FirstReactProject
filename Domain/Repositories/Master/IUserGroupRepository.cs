using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.Domain.Entities;

namespace NgenV4.Domain.Repositories
{
    public interface IUserGroupRepository : IBaseRepository
    {
        Task SaveRecord(UserGroup ar);
        Task UpdateRecord(JObject ar, int id);
        Task<bool> DeleteRecord(string SNo);
        Task<UserGroup> GetRecord(string SNo);
        Task<IEnumerable<UserGroup>> GetList(DataSource dataSource);
    }
}
