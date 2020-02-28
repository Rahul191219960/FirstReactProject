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
    public class UserAuthenticationRepository : RepositoryBase, IUserAuthenticationRepository
    {
        public UserAuthenticationRepository(IDbTransaction transaction) : base(transaction)
        {

        }
        public List<User> Getuser(string username, string password)
        {
            UserStatus userstatus = new UserStatus();
            try
            {
                // var user = (new { CurrentGuid = (new { }), IsBlocked = false, UserPassword = "", LastPasswordReset = Convert.ToDateTime(""), NoOfBadAttempts = 10 });
                var p = new DynamicParameters();
                p.Add("@UserName", username);
                p.Add("@Password", password);
                var result = Query<User>("spGetUserInfo", param: p , CommandType.StoredProcedure).Result.AsList();
                if (result != null)
                {
                    return result;
                }
                else
                {
                    userstatus.Message = "User doesn't Exist";
                    return null;//will return error message user doesn't exist
                }
            }
            catch (Exception ex)
            {
                this.ErrorNo = 1005;
                userstatus.Message = this.GetGlobalMessage("Error");
                return null;
                // throw ex;
            }
        }
        public bool PasswordValidityCheck(DateTime LastPasswordReset)
        {
            int validity = 30;
            DateTime CurrentDateTime = DateTime.UtcNow;
            TimeSpan timeSpan = CurrentDateTime - LastPasswordReset;
            if (timeSpan.Days < validity)
            {
                return true;
            }
            else
            {
                return false;//password validity Expired!
            }

        }
    }
}