using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using NgenV4.Domain.Entities;

namespace NgenV4.Domain.Repositories
{
    public interface ITodoRepository : IBaseRepository
    {
        Task SaveRecord(Todo ar);
        Task UpdateRecord(Todo ar);
        Task<bool> DeleteRecord(string SNo);
        Task<IEnumerable<Todo>> GetRecord(string SNo);
        Task<IEnumerable<TodoGrid>> GetList(DataSource dataSource);
        Task<bool> IsEmailExists(string email , string SNo);
        Task<bool> IsPhoneExists(string phone , string SNo);
    }
}
