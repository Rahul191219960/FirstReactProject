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
using System.Linq;
using Newtonsoft.Json.Linq;

namespace NgenV4.Data.Repositories
{
    public class Sample1Repository : RepositoryBase, ISample1Repository
    {
        private string tableName = "Employee";
        public Sample1Repository(IDbTransaction transaction) : base(transaction)
        {
            this.JsonFilePath = @"Master\Sample1";
        }
        public async Task<IEnumerable<Sample1>> GetList(DataSource dataSource)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@PageNo", dataSource.PageNo);
                p.Add("@PageSize", dataSource.PageSize);

                var result = await Query<Sample1>(this.GetSqlReader("ReadAllSample"), param: p);
                return result;
            }
            catch (Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "Sample1Repository:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("Sample1Repository:GetList() - " + ex.ToString());
                return null;
            }
        }
        public async Task<bool> DeleteRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@Id", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                await Query<Sample1>(this.GetSqlReader("DeleteCommand"), param: p);
                return true;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8004;
                this.ErrorMessage = "Sample1Repository:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("Sample1Repository:DeleteRecord() - " + ex.ToString());
                return false;
            }
        }

        public async Task<Sample1> GetRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                var Sample1s = await ExecuteReaderAsync<List<Sample1>>(this.GetSqlReader("ReadOneCommand"), param: p);

                // var pp = new DynamicParameters();
                // pp.Add("@EmployeeSNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                // var res = await Query<Employeecity>(this.GetSqlReader("ReadAutoCommand"), param: pp);
                // Sample1s.FirstOrDefault().city = res.ToList();
                return Sample1s.FirstOrDefault();
            }
            catch (Exception ex)
            {
                this.ErrorNo = 8002;
                this.ErrorMessage = "Sample1Repository:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("Sample1Repository:GetRecord() - " + ex.ToString());
                return null;
            }
        }

        public async Task SaveRecord(Sample1 sp)
        {
            try
            {
                var x = await InsertAync<Sample1>(sp);
                var obj = sp.city;
                obj.ForEach(e => e.EmployeeSNo = x);
                var a = await InsertAync<List<Employeecity>>(obj);
                // await BulkInsert<AutoCompleteData>(sp.city,"",1);
            }
            catch (Exception ex)
            {
                this.ErrorNo = 9003;
                this.ErrorMessage = "Sample1Repository:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("Sample1Repository:SaveRecord() - " + ex.ToString());
            }
        }

        public async Task UpdateRecord(JObject obj, int id)
        {
            try
            {
                var x = obj.SelectToken("city").ToObject<List<Employeecity>>();
                obj.Remove("city");
                await ExecuteDynamic(obj, tableName, "id", id);
                if (x != null && x.Count > 0)
                {
                    //Delete Previous city for this document 
                    var p = new DynamicParameters();
                    p.Add("@EmployeeSNo", id, DbType.Int32, ParameterDirection.Input);
                    await Query<Employeecity>(this.GetSqlReader("DeleteCityCommand"), param: p);

                    //Add New Cities
                    x.ForEach(e => e.EmployeeSNo = id);
                    var a = await InsertAync<List<Employeecity>>(x);
                }
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8001;
                this.ErrorMessage = "Sample1Repository:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("Sample1Repository:UpdateRecord() - " + ex.ToString());
            }
        }
    }
}
