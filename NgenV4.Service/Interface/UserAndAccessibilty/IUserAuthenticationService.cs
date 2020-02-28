using NgenV4.ViewModel;
using NgenV4.Domain.Entities;
namespace NgenV4.Service.Interface
{
    public interface IUserAuthenticationService: IBaseService
    {
        UserViewModel Authenticate(string username, string password);
    }
}