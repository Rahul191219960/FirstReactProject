using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
namespace NgenV4.Domain.Entities
{
    public class User
    {
        public String UserName {get;set;}
        public String Password {get;set;}
        public String Token {get;set;}
        public String EncryptedPassword {get;set;}

        // public List<RecentPasswordModel> RecentPasswords = new List<RecentPasswordModel>();
    }
    [JsonObject(NamingStrategyType = typeof(DefaultNamingStrategy))]

    public class RecentPasswordModel
    {
        public string Password { get; set; }
        public DateTime CreatedOn { get; set; }
    }
    public class UserStatus
    {
        public User User { get; set; }
        public string Message { get; set; }
    }

}