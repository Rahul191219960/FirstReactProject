using NgenV4.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.Domain
{
    public interface IUnitOfWork : IDisposable
    {
        IContactRepository IContactRepository { get; }
        ITodoRepository ITodoRepository { get; }
        IFormModelRepository IFormModelRepository { get; }
        ISample1Repository ISample1Repository { get; }
        IUsersRepository IUsersRepository { get; }
        IUserGroupRepository IUserGroupRepository { get; }
        IUserAuthenticationRepository IUserAuthenticationRepository { get; }
        IAutoCompleteRepository IAutoCompleteRepository {get ;}
        ICountryRepository ICountryRepository { get; }
        void Commit();
    }
}
