using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.Domain.Entities;

namespace NgenV4.Domain.Repositories
{
    public interface ICountryRepository : IBaseRepository
    {
        Task SaveRecord(Country ar);
        Task UpdateRecord(JObject ar, int id);
        Task<bool> DeleteRecord(string SNo);
        Task<Country> GetRecord(string SNo);
        Task<IEnumerable<Country>> GetList(DataSource dataSource);
        Task<bool> IsEmailExists(string email , string SNo);
        Task<bool> IsPhoneExists(string phone , string SNo);
    }
}
