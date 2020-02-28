using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NgenV4.ViewModel;
using NgenV4.Domain.Entities;
namespace NgenV4.Service.Interface
{
    public interface IChangePasswordService : IBaseService
    {
        Task<bool> ValidateUrl(String currentguid);
        Task SetNewPassword(ChangePasswordViewModel obj);
        string GenerateSHA512String(string inpputvalue);
        Task UpdatePassword(ChangePasswordViewModel vm);
        Task UpdatePassword1(ChangePasswordViewModel vm);
        Task<List<RecentPasswordModel>> CompareRecentPasswords(User obj, string password);
    }
}