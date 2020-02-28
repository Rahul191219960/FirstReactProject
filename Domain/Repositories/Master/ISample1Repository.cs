using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using NgenV4.Domain.Entities;

namespace NgenV4.Domain.Repositories
{
    public interface ISample1Repository : IBaseRepository
    {
        Task SaveRecord(Sample1 ar);
        Task UpdateRecord(JObject ar, int id);
        Task<bool> DeleteRecord(string SNo);
        Task<Sample1> GetRecord(string SNo);
        Task<IEnumerable<Sample1>> GetList(DataSource dataSource);
    }
}