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
    public class UserGroupRepository : RepositoryBase, IUserGroupRepository
    {
        private string tableName = "UserGroup";
        public UserGroupRepository(IDbTransaction transaction) : base(transaction)
        {
            this.JsonFilePath = @"Master\UserGroup";
        }
        public async Task<IEnumerable<UserGroup>> GetList(DataSource dataSource)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@PageNo", dataSource.PageNo);
                p.Add("@PageSize", dataSource.PageSize);

                var result = await Query<UserGroup>(this.GetSqlReader("ReadAllCommand"), param: p);
                return result;
            }
            catch (Exception ex)
            {
                this.ErrorNo = 1001;
                this.ErrorMessage = "UserGroupRepository:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UserGroupRepository:GetList() - " + ex.ToString());
                return null;
            }
        }
        public async Task<bool> DeleteRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@Id", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                var UserGroups = await Query<UserGroup>(this.GetSqlReader("DeleteCommand"), param: p);
                return true;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 8004;
                this.ErrorMessage = "UserGroupRepository:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UserGroupRepository:DeleteRecord() - " + ex.ToString());
                return false;
            }
        }

        public async Task<UserGroup> GetRecord(string SNo)
        {
            try
            {
                var p = new DynamicParameters();
                p.Add("@SNo", int.Parse(SNo), DbType.Int32, ParameterDirection.Input);
                var UserGroups = await Query<UserGroup>(this.GetSqlReader("ReadOneCommand"), param: p);
                return UserGroups.FirstOrDefault();
            }
            catch (Exception ex)
            {
                this.ErrorNo = 8002;
                this.ErrorMessage = "UserGroupRepository:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UserGroupRepository:GetRecord() - " + ex.ToString());
                return null;
            }
        }

        public async Task SaveRecord(UserGroup sp)
        {
            try
            {

                var x = await InsertAync<UserGroup>(sp);
            }
            catch (Exception ex)
            {
                this.ErrorNo = 9003;
                this.ErrorMessage = "UserGroupRepository:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UserGroupRepository:SaveRecord() - " + ex.ToString());
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
                this.ErrorMessage = "UserGroupRepository:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UserGroupRepository:UpdateRecord() - " + ex.ToString());
            }
        }
    }
}
