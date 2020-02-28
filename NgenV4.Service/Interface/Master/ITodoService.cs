using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using NgenV4.ViewModel;

namespace NgenV4.Service
{
    public interface ITodoService : IBaseService
    {
        Task<IEnumerable<TodoViewModelGrid>> GetList(DataSourceViewModel dataSource);
        Task SaveRecord(TodoViewModel ar);
        Task UpdateRecord(TodoViewModel ar);
        Task DeleteRecord(string SNo);
        Task<IEnumerable<TodoViewModel>> GetRecord(string SNo);
    }
}
