using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NgenV4.Service;
using NgenV4.Service.Interface;
using NgenV4.ViewModel;

namespace NgenV4.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthenticationController : ControllerBase
    {
        private readonly IUserAuthenticationService _userAuthenticationService;
        private readonly IHttpContextAccessor _httpContext;

        public UserAuthenticationController(IHttpContextAccessor httpContext, IUserAuthenticationService userAuthenticationService)
        {
            _userAuthenticationService = userAuthenticationService;
            _httpContext = httpContext;
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserAuthenticationViewModel userObj)
        {
            UserViewModel obj = _userAuthenticationService.Authenticate(userObj.UserName, userObj.Password);
            if (obj == null)
            {
                return StatusCode(403, "Wrong UserId or Password");
            }
            return Ok(new { token = obj.Token, status = "Success" });
        }
        [AllowAnonymous]
        public IActionResult Get([FromBody] UserAuthenticationViewModel userObj)
        {
            // UserAuthenticationStatus obj = _userAuthenticationService.Authenticate(userObj.UserName, userObj.Password);
            // return Ok(new { });
            return Ok(new { });
        }
    }
}