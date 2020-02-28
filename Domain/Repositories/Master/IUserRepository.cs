using NgenV4.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Domain.Repositories
{
    public interface IUserRepository : IBaseRepository
    {
        Task SaveRecord(User ar);
        Task UpdateRecord(User ar);
        Task DeleteRecord(string SNo);
        Task<User> GetRecord(string SNo);
    }
}
