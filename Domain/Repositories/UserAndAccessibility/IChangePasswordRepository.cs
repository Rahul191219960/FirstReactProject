using System.Threading.Tasks;
using NgenV4.Domain.Entities;

namespace NgenV4.Domain.Repositories
{
    public interface IChangePasswordRepository : IBaseRepository
    {

        Task<bool> SetNewPassword(User user, string password);
        Task<User> ValidateCurrentPassword(ChangePassword model);
        Task<bool> UpdatePassword(User user, string newpassword);
        Task<User> GetUser(string currentguid);
    }
}
