using NgenV4.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Domain.Repositories
{
    public interface IAutoCompleteRepository : IBaseRepository
    {
        Task<AutoComplete> GetAutoCompletes(string autoCompleteNames);
        Task<IEnumerable<object>> GetOptions(int a, string b, string c, string d, string e, string f);
        Task<IEnumerable<object>> GetOptions(string procedureName, List<ProcedureParams> param);
    }
}
