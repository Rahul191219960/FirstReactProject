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
    public class FormModelRepository : RepositoryBase, IFormModelRepository
    {
        public FormModelRepository(IDbTransaction transaction) : base(transaction)
        {

        }
        public async Task<FormModel> GetRecord(string modelName)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@ModelName", modelName);

                var result = await ExecuteReaderAsync<List<FormModel>>("spFormModel_GetRecord", param: p, CommandType.StoredProcedure);
                return result.FirstOrDefault();
            }
            catch(Exception ex){
                return null;
            }
        }
    }
}
