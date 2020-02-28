using System;
namespace NgenV4.ViewModel
{
    public class UserAuthenticationViewModel
    {
        public String UserID { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String UserName { get; set; }
        public String Password { get; set; }
        public String Email { get; set; }
        public String UserGroup { get; set; }
        public String UserType { get; set; }
        public String Token { get; set; }
    }
    public class UserAuthenticationStatusViewModel
    {
        public UserAuthenticationViewModel UserAuthentication { get; set; }
        public String Message { get; set; }
    }
}