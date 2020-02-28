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
    public class ContactRepository : RepositoryBase, IContactRepository
    {
        public ContactRepository(IDbTransaction transaction) : base(transaction)
        {
            this.JsonFilePath = @"Master\Contact";
        }
        public async Task<IEnumerable<Contact>> GetList(DataSource dataSource)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@PageNo", dataSource.PageNo);
                p.Add("@PageSize", dataSource.PageSize);
                p.Add("@WhereClause", dataSource.WhereClause);
                p.Add("@SortField", dataSource.SortField);
                p.Add("@SortDirection", dataSource.SortDirection);

                var result = await Query<Contact>("spContactGetList", p, CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                 this.ErrorNo = 1001;
                this.ErrorMessage = "ContactRepository:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactRepository:GetList() - " + ex.ToString());
                return null;
            }
        }
        public async Task<bool> DeleteRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                await Query<Contact>("spContactDelete", param: p, CommandType.StoredProcedure);
                return true;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8004;
                this.ErrorMessage = "ContactRepository:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactRepository:DeleteRecord() - " + ex.ToString());
                return false;
            }
        }

        public async Task<Contact> GetRecord(string SNo)
        {
            try
            {                
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);              
                var contacts = await Query<Contact>(this.GetSqlReader("ReadOneCommand"), param: p);
                return contacts.FirstOrDefault();
            }
            catch (Exception ex)
            {
                this.ErrorNo = 8002;
                this.ErrorMessage = "ContactRepository:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactRepository:GetRecord() - " + ex.ToString());
                return null;
            }
        }

        public async Task SaveRecord(Contact ar)
        {
            try
            {
                ar.c_date = DateTime.UtcNow;
                ar.u_date = DateTime.UtcNow;
                await InsertAync<Contact>(ar);
            }
            catch (Exception ex)
            {
                this.ErrorNo = 9003;
                this.ErrorMessage = "ContactRepository:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactRepository:SaveRecord() - " + ex.ToString());
            }
        }

        public async Task UpdateRecord(JObject obj, int id)
        {
            try
            {
                await ExecuteDynamic(obj, "Contact", "id", id);
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8001;
                this.ErrorMessage = "ContactRepository:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactRepository:UpdateRecord() - " + ex.ToString());
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
                    var getresult = await Query<Contact>("spContactCheckEmail", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                else
                {
                    p.Add("@SNo");
                    p.Add("@email", email);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Contact>("spContactCheckEmail", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                return false;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "ContactRepository:IsEmailExists() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactRepository:IsEmailExists() - " + ex.ToString());
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
                    var getresult = await Query<Contact>("spContactCheckPhone", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                else
                {
                    p.Add("@SNo");
                    p.Add("@Phone", phone);
                    p.Add("@get", DbType.Int32, direction: ParameterDirection.Output);
                    var getresult = await Query<Contact>("spContactCheckPhone", param: p, CommandType.StoredProcedure);
                    int getresults = p.Get<int>("@get");
                    if (getresults == 1)
                        return true;
                }
                return false;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "ContactRepository:IsPhoneExists() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactRepository:IsPhoneExists() - " + ex.ToString());
                return false;
            }
        }
    }
}
