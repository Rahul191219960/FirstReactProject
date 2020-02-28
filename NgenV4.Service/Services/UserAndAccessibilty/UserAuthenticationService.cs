using System;
using NgenV4.Service.Interface;
using NgenV4.ViewModel;
using NgenV4.Domain.Entities;
using System.Text;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;
using NgenV4.Domain;
using System.Collections.Generic;
using AutoMapper;



namespace NgenV4.Service
{
    public class UserAuthenticationService : BaseService, IUserAuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserAuthenticationService(IMapper imapper, IUnitOfWork unitOfWork)
        {
            _mapper = imapper;
            _unitOfWork = unitOfWork;
        }

        public UserViewModel Authenticate(string username, string password)
        {
            // var user = _users.FirstOrDefault(x => x.Username == username && x.Password == password);
            UserAuthenticationStatus userauthenticationstatus = new UserAuthenticationStatus();
            UserAuthentication userauthenticate = new UserAuthentication();
            User user = null;
            String msg = "";
            List<User> UserList = new List<User>();
            try
            {
                // string Hash = _changePasswordService.GenerateSHA512String(password);
                string Hash = GenerateSHA512String(password);
                UserList = _unitOfWork.IUserAuthenticationRepository.Getuser(username, Hash);

                // user = userstatus.User;
                // msg = userstatus.Message;

                // userauthenticate.UserID = user.UserID;
                // userauthenticate.FirstName = user.FirstName;
                // userauthenticate.LastName = user.LastName;
                // userauthenticate.UserName = user.UserName;
                // userauthenticate.Email = user.EMailID;
                // userauthenticate.UserGroup = user.Text_GroupSNo;


                //authenticate successful so generate jwt token
                string encrytedUserId = GenerateSHA512String(userauthenticate.UserID);
                //userauthenticate.UserID = encrytedUserId;
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("RmsSeceretKey#54321");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Expires = DateTime.Now.AddDays(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                String Token = tokenHandler.WriteToken(token);
                user = UserList[0];
                user.Token = Token;

                //remove password before returning
                // userauthenticate.Password = null;
                // UserLogViewModel u = new UserLogViewModel();
                // u.UserId=user.UserID;
                // u.UserName=user.UserName;
                // u.UserType=user.Text_UserTypeSNo;
                // u.SNo1 = Token;
                // u.LogInTime=DateTime.UtcNow;
                // _iuserlogservice.SaveRecord(u);

                //updating token in User 
                // user.EncrytedUserID = encrytedUserId;
                //    _unitOfWork.IUserAuthenticationRepository.UpdateToken(user, Token);
                // userauthenticationstatus.UserAuthentication = userauthenticate;
                UserViewModel obj = new UserViewModel();
                obj.UserName = user.UserName;
                obj.Token = user.Token;

                return obj;
            }
            catch (Exception e)
            {
                // userauthenticationstatus.Message="Please Contact to Administrator";
                userauthenticationstatus.Message = msg;
                return null;
            }
        }
        public string GenerateSHA512String(string UserId)
        {
            string current_time = DateTime.UtcNow.ToString();
            HashAlgorithm hasher = null;
            try
            {
                hasher = new SHA512CryptoServiceProvider();
            }

            catch (Exception ex)//(Exception ex)
            {
                hasher = new SHA512Managed();
            }
            byte[] bytestring = Encoding.UTF8.GetBytes(string.Concat(UserId, 3));
            byte[] hashedBytes = hasher.ComputeHash(bytestring);

            hasher.Clear();

            return Convert.ToBase64String(hashedBytes);


        }
    }
}