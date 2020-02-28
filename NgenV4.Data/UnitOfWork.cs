using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using NgenV4.Domain;
using NgenV4.Domain.Repositories;
using System.Data.SqlClient;
using NgenV4.Data.Repositories;

namespace NgenV4.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private IDbConnection _connection;
        private IDbTransaction _transaction;
        private bool _disposed;

        public UnitOfWork(string connectionString)
        {
            _connection = new SqlConnection(connectionString);
            _connection.Open();
            _transaction = _connection.BeginTransaction();
        }

        #region Fields
        private IContactRepository _contactRepository;
        private ITodoRepository _todoRepository;
        private IUserAuthenticationRepository _userAuthentictionRepository;
        private IFormModelRepository _formModelRepository;
        private IAutoCompleteRepository _autoCompleteRepository;
        private ISample1Repository _sample1Repository;
        private IUsersRepository _usersRepository;
        private IUserGroupRepository _userGroupRepository;
         private ICountryRepository _countryRepository;
        #endregion

        #region IUnitOfWork Members
        public IContactRepository IContactRepository
        {
            get
            {
                return _contactRepository
                    ?? (_contactRepository = new ContactRepository(_transaction));
            }
        }

        public IFormModelRepository IFormModelRepository
        {
            get
            {
                return _formModelRepository
                    ?? (_formModelRepository = new FormModelRepository(_transaction));
            }
        }
        public IAutoCompleteRepository IAutoCompleteRepository
        {
            get
            {
                return _autoCompleteRepository
                    ?? (_autoCompleteRepository = new AutoCompleteRepository(_transaction));
            }
        }

        public ITodoRepository ITodoRepository
        {
            get
            {
                return _todoRepository
                    ?? (_todoRepository = new TodoRepository(_transaction));
            }
        }

        public IUserAuthenticationRepository IUserAuthenticationRepository
        {
            get
            {
                return _userAuthentictionRepository
                    ?? (_userAuthentictionRepository = new UserAuthenticationRepository(_transaction));
            }
        }

        public ISample1Repository ISample1Repository
        {
            get
            {
                return _sample1Repository
                    ?? (_sample1Repository = new Sample1Repository(_transaction));
            }
        }

           public IUsersRepository IUsersRepository
        {
            get
            {
                return _usersRepository
                    ?? (_usersRepository = new UsersRepository(_transaction));
            }
        }
           public IUserGroupRepository IUserGroupRepository
        {
            get
            {
                return _userGroupRepository
                    ?? (_userGroupRepository = new UserGroupRepository(_transaction));
            }
        }
         public ICountryRepository ICountryRepository
        {
            get
            {
                return _countryRepository
                    ?? (_countryRepository = new CountryRepository(_transaction));
            }
        }
        #endregion

        public void Commit()
        {
            try
            {
                _transaction.Commit();
            }
            catch
            {
                _transaction.Rollback();
            }
            finally
            {
                _transaction.Dispose();
                resetRepositories();
                _transaction = _connection.BeginTransaction();
            }
        }

        private void resetRepositories()
        {
            _contactRepository = null;
        }

        private void dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    if (_connection != null)
                    {
                        _connection.Dispose();
                        _connection = null;
                    }
                    if (_transaction != null)
                    {
                        _transaction.Dispose();
                        _transaction = null;
                    }
                }
                _disposed = true;
            }
        }
        public void Dispose()
        {
            dispose(true);
            GC.SuppressFinalize(this);
        }

        ~UnitOfWork()
        {
            dispose(false);
        }
    }
}
