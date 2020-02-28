using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dapper.Contrib.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace NgenV4.Data.Repositories
{
    public abstract class RepositoryBase : BaseRepository
    {
        private readonly IDbTransaction _transaction;




        private IDbConnection Connection { get { return _transaction.Connection; } }

        public RepositoryBase(IDbTransaction transaction)
        {
            _transaction = transaction;
        }

        protected T ExecuteScalar<T>(string sql, object param)
        {
            return Connection.ExecuteScalar<T>(sql, param, _transaction);
        }

        protected async Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param, CommandType type = CommandType.Text)
        {
            return await Connection.QueryFirstOrDefaultAsync<T>(sql, param, _transaction, commandType: type);
        }

        protected async Task<dynamic> QueryFirstOrDefaultAsync(string sql, object param, CommandType type = CommandType.Text)
        {
            return await Connection.QueryFirstOrDefaultAsync(sql, param, _transaction, commandType: type);
        }

        protected async Task<T> ExecuteReaderAsync<T>(string sql, object param, CommandType type = CommandType.Text)
        {
            StringBuilder sb = new StringBuilder();
            var reader = await Connection.ExecuteReaderAsync(sql, param, _transaction, commandType: type);
            while (reader.Read())
            {
                sb.Append(reader.GetString(0));
            }
            return JsonConvert.DeserializeObject<T>(sb.ToString());
        }

        protected async Task<IEnumerable<T>> Query<T>(string sql, object param = null, CommandType type = CommandType.Text)
        {
            return await Connection.QueryAsync<T>(sql, param, _transaction, commandType: type);
        }

        protected async Task Execute(string sql, object param, CommandType type = CommandType.Text)
        {
            await Connection.ExecuteAsync(sql, param, _transaction, commandType: type);
        }

        protected void MultipleQuery(string sql, out int count, out dynamic list, object param = null)
        {
            var d = Connection.QueryMultiple(sql, param, _transaction);
            count = d.Read<int>().Single();
            list = d.Read<dynamic>().ToList();

        }

        protected int CountRecordQuery(string sql, object param = null)
        {
            return Connection.ExecuteScalar<int>(sql, param, _transaction);
        }
        protected async Task<long> InsertAync<T>(T obj) where T : class
        {
            return await Connection.InsertAsync(obj, _transaction);
        }
        protected async Task<bool> UpdateAsync<T>(T obj) where T : class
        {
            return await Connection.UpdateAsync(obj, _transaction);
        }
        protected async Task<bool> DeleteAsync<T>(T obj) where T : class
        {
            return await Connection.DeleteAsync(obj, _transaction);
        }
        protected async Task<T> GetAsync<T>(int id) where T : class
        {
            return await Connection.GetAsync<T>(id, _transaction);
        }
        protected async Task ExecuteDynamic(JObject obj, string tableName, string key, int keyValue)
        {
            try
            {
                var convertedJson = JsonConvert.DeserializeObject<Dictionary<string, string>>(obj.ToString());
                var p = new DynamicParameters();
                var query = new StringBuilder("Update " + tableName + " Set ");
                var count = 0;
                foreach (var (k, v) in convertedJson)
                {
                    count++;
                    if (convertedJson.Count == count)
                        query.Append(k + "=@" + k);
                    else
                        query.Append(k + "=@" + k + ",");
                    p.Add("@" + k, v);
                }
                query.Append(" where " + key + "=" + keyValue);

                await Connection.ExecuteAsync(query.ToString(), p, _transaction, commandType: CommandType.Text);
            }
            catch (Exception e)
            {

            }
        }
        // protected async Task<long> BulkInsert<T>(List<T> list, string tablename, int parentSNo) where T : class
        // {
        //     string values = "INSERT INTO PROCESS_LOGS VALUES(";
        //     IEnumerable<PropertyInfo> t = typeof(T).GetProperties();
        //     foreach (var prop in t)
        //     {
        //         values = values + "@" + prop.Name.ToString() + ",";
        //     }
        //     values = values + ")";
        //     foreach (var item in list)
        //     {
        //         string processQuery = "INSERT INTO PROCESS_LOGS VALUES (@A, @B)";
        //         Connection.Execute(processQuery, item);
        //     }
        // }
        
    }
}
