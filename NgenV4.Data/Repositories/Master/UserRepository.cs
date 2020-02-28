using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using NgenV4.Domain.Entities;
using NgenV4.Domain.Repositories;

namespace NgenV4.Data.Repositories.Master
{
    public class UserRepository : RepositoryBase, IUserRepository
    {
        public UserRepository(IDbTransaction transaction):base(transaction)
        {

        }

        public Task DeleteRecord(string SNo)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetRecord(string SNo)
        {
            throw new NotImplementedException();
        }

        public Task SaveRecord(User ar)
        {
            throw new NotImplementedException();
        }

        public Task UpdateRecord(User ar)
        {
            throw new NotImplementedException();
        }
    }
}
