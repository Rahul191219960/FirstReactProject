using System;
using System.Threading.Tasks;
using NgenV4.Domain.Entities;
using NgenV4.Domain.Repositories;

namespace NgenV4.Data.Repositories
{
    public class ChangePasswordRepository : BaseRepository, IChangePasswordRepository
    {
        public ChangePasswordRepository()
        {

        }
        public async Task<bool> SetNewPassword(User user, string password)
        {
            try
            {
                // user.CurrentGuid = null;
                // user.GuidDate = new DateTime();
                // user.LastPasswordReset = DateTime.UtcNow;
                // user.UserPassword = password;
                // user.IsBlocked = false;
                return false;

            }
            catch (Exception ex)
            {
                this.ErrorNo = 8003;
                this.ErrorMessage = this.GetGlobalMessage("Error");
                return false;
            }
        }

        public async Task<User> ValidateCurrentPassword(ChangePassword model)
        {
            try
            {
                User d = new User();
                return d;
            }
            catch (Exception ex)
            {
                this.ErrorNo = 8877;
                this.ErrorMessage = this.GetGlobalMessage("Error");
                return null;

            }
        }

        public async Task<bool> UpdatePassword(User user, string newpassword)
        {
            try
            {
                return false;


            }
            catch (Exception ex)
            {
                this.ErrorNo = 8008;
                this.ErrorMessage = this.GetGlobalMessage("Error");
                return false;
            }
        }

        public async Task<User> GetUser(string currentguid)
        {
            try
            {
                User d = new User();
                return d;
            }
            catch (Exception ex)
            {
                this.ErrorNo = 1005;
                this.ErrorMessage = this.GetGlobalMessage("Error");
                return null;
            }
        }
    }
}