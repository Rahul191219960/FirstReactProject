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
    public class CountryRepository : RepositoryBase, ICountryRepository
    {
        public CountryRepository(IDbTransaction transaction) : base(transaction)
        {
            this.JsonFilePath = @"Master\Country";
        }
        public async Task<IEnumerable<Country>> GetList(DataSource dataSource)
        {
            try
            {

                var p = new DynamicParameters();
                p.Add("@PageNo", dataSource.PageNo);
                p.Add("@PageSize", dataSource.PageSize);

               var result = await Query<Country>(this.GetSqlReader("ReadAllSample"), param: p);
                return result;
            }
            catch (Exception ex)
            {
                 this.ErrorNo = 1001;
                this.ErrorMessage = "CountryRepository:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("CountryRepository:GetList() - " + ex.ToString());
                return null;
            }
        }
        public async Task<bool> DeleteRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                await Query<Country>("spContactDelete", param: p, CommandType.StoredProcedure);
                return true;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8004;
                this.ErrorMessage = "CountryRepository:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("CountryRepository:DeleteRecord() - " + ex.ToString());
                return false;
            }
        }

        public async Task<Country> GetRecord(string SNo)
        {
            try
            {                
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);              
                var contacts = await Query<Country>(this.GetSqlReader("ReadOneCommand"), param: p);
                return contacts.FirstOrDefault();
            }
            catch (Exception ex)
            {
                this.ErrorNo = 8002;
                this.ErrorMessage = "CountryRepository:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("CountryRepository:GetRecord() - " + ex.ToString());
                return null;
            }
        }

        public async Task SaveRecord(Country ar)
        {
            try
            {
              //  ar.c_date = DateTime.UtcNow;
               // ar.u_date = DateTime.UtcNow;
                await InsertAync<Country>(ar);
            }
            catch (Exception ex)
            {
                this.ErrorNo = 9003;
                this.ErrorMessage = "CountryRepository:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("CountryRepository:SaveRecord() - " + ex.ToString());
            }
        }

        public async Task UpdateRecord(JObject obj, int id)
        {
            try
            {
                await ExecuteDynamic(obj, "Country", "id", id);
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8001;
                this.ErrorMessage = "CountryRepository:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("CountryRepository:UpdateRecord() - " + ex.ToString());
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
                    var getresult = await Query<Country>("spContactCheckEmail", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                else
                {
                    p.Add("@SNo");
                    p.Add("@email", email);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Country>("spContactCheckEmail", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                return false;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "CountryRepository:IsEmailExists() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("CountryRepository:IsEmailExists() - " + ex.ToString());
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
                    var getresult = await Query<Country>("spContactCheckPhone", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                else
                {
                    p.Add("@SNo");
                    p.Add("@Phone", phone);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Country>("spContactCheckPhone", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                return false;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "CountryRepository:IsPhoneExists() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("CountryRepository:IsPhoneExists() - " + ex.ToString());
                return false;
            }
        }
    }
}
