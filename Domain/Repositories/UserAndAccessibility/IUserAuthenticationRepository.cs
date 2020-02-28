using System;
using NgenV4.Domain.Entities;
using System.Collections.Generic;

namespace NgenV4.Domain.Repositories
{
    public interface IUserAuthenticationRepository : IBaseRepository
    {
        List<User> Getuser(string username, string password);
        bool PasswordValidityCheck(DateTime LastPasswordReset);
    }
}