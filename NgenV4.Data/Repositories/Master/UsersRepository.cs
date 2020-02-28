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
    public class UsersRepository : RepositoryBase, IUsersRepository
    {
        private string tableName = "Users";
        public UsersRepository(IDbTransaction transaction) : base(transaction)
        {
            this.JsonFilePath = @"Master\Users";
        }
        public async Task<IEnumerable<Users>> GetList(DataSource dataSource)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@PageNo", dataSource.PageNo);
                p.Add("@PageSize", dataSource.PageSize);

                var result = await Query<Users>(this.GetSqlReader("ReadAllCommand"), param: p);
                return result;
            }
            catch (Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "UsersRepository:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersRepository:GetList() - " + ex.ToString());
                return null;
            }
        }
        public async Task<bool> DeleteRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@Id", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                var Userss = await Query<Users>(this.GetSqlReader("DeleteCommand"), param: p);
                return true;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8004;
                this.ErrorMessage = "UsersRepository:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersRepository:DeleteRecord() - " + ex.ToString());
                return false;
            }
        }

        public async Task<Users> GetRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                var Userss = await Query<Users>(this.GetSqlReader("ReadOneCommand"), param: p);
                return Userss.FirstOrDefault();
            }
            catch (Exception ex)
            {
                this.ErrorNo = 8002;
                this.ErrorMessage = "UsersRepository:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersRepository:GetRecord() - " + ex.ToString());
                return null;
            }
        }

        public async Task SaveRecord(Users sp)
        {
            try
            {

                sp.UserExpiryDate = DateTime.UtcNow;
                sp.PasswordExpiryDate = DateTime.UtcNow;
                sp.LastLoggedOn = DateTime.UtcNow;
                sp.LastFailedLoggedOn = DateTime.UtcNow;
                sp.NextPasswordChangeDate = DateTime.UtcNow;
                sp.CreatedOn = DateTime.UtcNow;
                sp.UpdatedOn = DateTime.UtcNow;
                sp.UserExpiryDate = DateTime.UtcNow;
                sp.GUIDGeneratedDateTime = DateTime.UtcNow;
                sp.LastResetOnUserSNo = DateTime.UtcNow;
                sp.LastChangeDateTime = DateTime.UtcNow;

                var x = await InsertAync<Users>(sp);
            }
            catch (Exception ex)
            {
                this.ErrorNo = 9003;
                this.ErrorMessage = "UsersRepository:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersRepository:SaveRecord() - " + ex.ToString());
            }
        }

        public async Task UpdateRecord(JObject obj, int id)
        {
            try
            {
                await ExecuteDynamic(obj, tableName, "id", id);
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8001;
                this.ErrorMessage = "UsersRepository:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersRepository:UpdateRecord() - " + ex.ToString());
            }
        }
    }
}
