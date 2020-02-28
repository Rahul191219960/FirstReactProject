using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.Domain.Entities;

namespace NgenV4.Domain.Repositories
{
    public interface IUsersRepository : IBaseRepository
    {
        Task SaveRecord(Users ar);
        Task UpdateRecord(JObject ar, int id);
        Task<bool> DeleteRecord(string SNo);
        Task<Users> GetRecord(string SNo);
        Task<IEnumerable<Users>> GetList(DataSource dataSource);
    }
}
