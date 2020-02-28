using AutoMapper;
using NgenV4.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Service.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly IMapper _mapper;
        public UserService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public Task DeleteRecord(string SNo)
        {
            throw new NotImplementedException();
        }

        // public Task<UserViewModel> GetRecord(string SNo)
        // {
        //     throw new NotImplementedException();
        // }

        // public Task SaveRecord(UserViewModel ar)
        // {
        //     throw new NotImplementedException();
        // }

        // public Task UpdateRecord(UserViewModel ar)
        // {
        //     throw new NotImplementedException();
        // }
    }
}
