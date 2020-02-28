using Dapper;
using NgenV4.Domain.Entities;
using NgenV4.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace NgenV4.Data.Repositories
{
    // internal class AutoCompleteData
    // {
    //     public string value { get; set; }
    //     public string label { get; set; }
    //     public string templateColumn { get; set; }
    // }
    public class AutoCompleteRepository : RepositoryBase, IAutoCompleteRepository
    {
        public AutoCompleteRepository(IDbTransaction transaction) : base(transaction)
        {

        }
        public async Task<AutoComplete> GetAutoCompletes(string autoCompleteNames)
        {
            var p = new DynamicParameters();
            p.Add("@AutoCompleteNames", autoCompleteNames);
            try
            {
                var result = await QueryFirstOrDefaultAsync<AutoComplete>("spAutoCompletes", param: p, CommandType.StoredProcedure);
                return result;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<IEnumerable<object>> GetOptions(int a, string b, string c, string d, string e, string f)
        {
            var p = new DynamicParameters();
            p.Add("@PageSize", a);
            p.Add("@WhereCondition", b);
            p.Add("@TableName", c);
            p.Add("@KeyColumn", d);
            p.Add("@TextColumn", e);
            p.Add("@TemplateColumn", f);
            try
            {
                var result = await Query<AutoCompleteData>("AutoCompleteGetList", param: p, CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<IEnumerable<object>> GetOptions(string procedureName, List<ProcedureParams> param)
        {
            var p = new DynamicParameters();
            for (var i = 0; i < param.Count; i++)
            {
                p.Add(param[i].Key, param[i].Value);
            }
            try
            {
                var result = await Query<AutoCompleteData>(procedureName, param: p);
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
