using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using NgenV4.Domain.Entities;
using NgenV4.Domain.Repositories;
using Newtonsoft.Json;

namespace NgenV4.Data.Repositories
{
    public class TodoRepository : RepositoryBase, ITodoRepository
    {
        public TodoRepository(IDbTransaction transaction) : base(transaction)
        {

        }
        public async Task<IEnumerable<TodoGrid>> GetList(DataSource dataSource)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@PageNo", 1);
                p.Add("@PageSize", dataSource.PageSize);

                var result = await Query<TodoGrid>("spTodoGetList", param: p);
                return result;
            }
            catch (Exception ex)
            {
                 this.ErrorNo = 1001;
                this.ErrorMessage = "TodoRepository:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoRepository:GetList() - " + ex.ToString());
                return null;
            }
        }
        public async Task<bool> DeleteRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                await Query<Todo>("spTodoDelete", param: p);
                return true;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8004;
                this.ErrorMessage = "TodoRepository:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoRepository:DeleteRecord() - " + ex.ToString());
                return false;
            }
        }

        public async Task<IEnumerable<Todo>> GetRecord(string SNo)
        {
            try
            {
                // StringBuilder sb = new StringBuilder();
                // Todo result = new Todo();
                // var p = new DynamicParameters();
                // p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                // p.Add("@StatementType", "Get", DbType.String, ParameterDirection.Input);
                // using()
                // using (SqlCommand cmd = new SqlCommand("spTodoCrud"))
                // {
                //     cmd.CommandType = CommandType.StoredProcedure;
                //     cmd.Parameters.Add("@SNo", SqlDbType.Int).Value = int.Parse(SNo);
                //     cmd.Parameters.Add("@StatementType", SqlDbType.Text).Value = "Get";
                //     var c = await cmd.ExecuteReaderAsync();
                //     while (c.Read())
                //     {
                //         sb.Append(c.GetString(0));
                //     }
                //  result = JsonConvert.DeserializeObject<Todo>(sb.ToString());
                // }
                StringBuilder sb = new StringBuilder();
                Todo result = new Todo();
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                //There is only need of SNO here
                // p.Add("@category", "");
                // p.Add("@categorySNo", 0);
                // p.Add("@lastname", "");
                // p.Add("@firstname", "");
                // p.Add("@jobtitle", "");
                // p.Add("@company", "");
                // p.Add("@email", "");
                // p.Add("@web", "");
                // p.Add("@phone", "");
                // p.Add("@phonehome", "");
                // p.Add("@phonecell", "");
                // p.Add("@fax", "");
                // p.Add("@address", "");
                // p.Add("@city", "");
                // p.Add("@state", "");
                // p.Add("@zip", "");
                // p.Add("@country", "");
                // p.Add("@notes", "");
                // p.Add("@c_date", "");
                // p.Add("@u_date", "");
                // using (IDbConnection conn = Connection)
                // {
                //     // conn.ChangeDatabase("nGenV4");
                //     // conn.BeginTransaction();
                //     //     IDbTransaction transaction;
                //     //    conn.BeginTransaction();
                //     conn.Close();
                //     conn.Open();
                //     conn.BeginTransaction();
                // var reader = conn.ExecuteReader("spTodoCrud", param: p, commandType: CommandType.StoredProcedure, commandTimeout: 0);
                // while (reader.Read())
                // {
                //     sb.Append(reader.GetString(0));
                // }
                // result = JsonConvert.DeserializeObject<Todo>(sb.ToString());
                // result = await QuerySingleOrDefault<Todo>("spTodoCrud",param:p);
                var Todos = await Query<Todo>("spTodoGet", param: p);
                //result = QuerySingleOrDefault<Todo>("spTodoCrud",param:p);
                // }
                //  var result = Execute("spTodoCrud",param: p);

                return Todos;
            }
            catch (Exception ex)
            {
                this.ErrorNo = 8002;
                this.ErrorMessage = "TodoRepository:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoRepository:GetRecord() - " + ex.ToString());
                return null;
            }
        }

        public async Task SaveRecord(Todo td)
        {
            try
            {
                // var p = new DynamicParameters();
                // p.Add("@SNo");
                // p.Add("@lastname", ar.lastname);
                // p.Add("@firstname", ar.firstname);
                // p.Add("@jobtitle", ar.jobtitle);
                // p.Add("@company", ar.company);
                // p.Add("@email", ar.email);
                // p.Add("@web", ar.web);
                // p.Add("@category", ar.category);
                // p.Add("@categorySNo", 0);
                // p.Add("@phone", ar.phone);
                // p.Add("@phonehome", ar.phonehome);
                // p.Add("@phonecell", ar.phonecell);
                // p.Add("@fax", ar.fax);
                // p.Add("@address", ar.address);
                // p.Add("@city", ar.city);
                // p.Add("@state", ar.state);
                // p.Add("@zip", ar.zip);
                // p.Add("@country", ar.country);
                // p.Add("@notes", ar.notes);
                // p.Add("@c_date", ar.c_date);
                // p.Add("@u_date", ar.u_date);
                //p.Add("@error",DbType.String, direction:ParameterDirection.Output);
                // p.Add("@OutParam", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

                // await Query<Todo>("spTodoSave", param: p);
                //var retVal = p.Get<int>("@error");
            }
            catch (Exception ex)
            {
                this.ErrorNo = 9003;
                this.ErrorMessage = "TodoRepository:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoRepository:SaveRecord() - " + ex.ToString());
            }
        }

        public async Task UpdateRecord(Todo ar)
        {
            try
            {
                // var p = new DynamicParameters();
                // p.Add("@SNo", ar.SNo);
                // p.Add("@lastname", ar.lastname);
                // p.Add("@firstname", ar.firstname);
                // p.Add("@jobtitle", ar.jobtitle);
                // p.Add("@company", ar.company);
                // p.Add("@email", ar.email);
                // p.Add("@web", ar.web);
                // p.Add("@category", ar.category);
                // p.Add("@categorySNo", 0);
                // p.Add("@phone", ar.phone);
                // p.Add("@phonehome", ar.phonehome);
                // p.Add("@phonecell", ar.phonecell);
                // p.Add("@fax", ar.fax);
                // p.Add("@address", ar.address);
                // p.Add("@city", ar.city);
                // p.Add("@state", ar.state);
                // p.Add("@zip", ar.zip);
                // p.Add("@country", ar.country);
                // p.Add("@notes", ar.notes);
                // p.Add("@c_date", ar.c_date);
                // p.Add("@u_date", ar.u_date);
                // //  p.Add("@OutParam", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                // await Query<Todo>("spTodoUpdate", param: p);
                // int b = p.Get<int>("@OutParam");
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8001;
                this.ErrorMessage = "TodoRepository:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoRepository:UpdateRecord() - " + ex.ToString());
            }
        }
        public async Task<bool> IsEmailExists(string email, string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                if (!string.IsNullOrEmpty(SNo))
                {
                    p.Add("@SNo", int.Parse(SNo));
                    p.Add("@email", email);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Todo>("spTodoCheckEmail", param: p);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                else
                {
                    p.Add("@SNo");
                    p.Add("@email", email);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Todo>("spTodoCheckEmail", param: p);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                return false;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "TodoRepository:IsEmailExists() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoRepository:IsEmailExists() - " + ex.ToString());
                return false;
            }
        }
        public async Task<bool> IsPhoneExists(string phone, string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                if (!string.IsNullOrEmpty(SNo))
                {
                    p.Add("@SNo", int.Parse(SNo));
                    p.Add("@Phone", phone);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Todo>("spTodoCheckPhone", param: p);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                else
                {
                    p.Add("@SNo");
                    p.Add("@Phone", phone);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Todo>("spTodoCheckPhone", param: p);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                return false;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "TodoRepository:IsPhoneExists() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoRepository:IsPhoneExists() - " + ex.ToString());
                return false;
            }
        }
    }
}
