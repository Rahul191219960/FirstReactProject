using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NgenV4.Service.Interface;
using NgenV4.ViewModel;

namespace NgenV4.API.Controllers
{
    public class ChangePasswordController : ControllerBase
    {
        private readonly IChangePasswordService _iChangePasswordService;
        public ChangePasswordController(IChangePasswordService iChangePasswordService)
        {
            _iChangePasswordService = iChangePasswordService;
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ValidateUrl([FromBody] object obj)
        {
            string currentguid = obj.ToString();
            bool status = await _iChangePasswordService.ValidateUrl(currentguid);
            if (status == true)
                return Ok();
            else
                return Unauthorized();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SetNewPassword([FromBody] ChangePasswordViewModel obj)
        {
            if (obj.NewPassword == obj.ConfirmPassword)
            {
                await _iChangePasswordService.SetNewPassword(obj);
                return Ok(new { StatusCode = _iChangePasswordService.ErrorNo, StatusMessage = _iChangePasswordService.ErrorMessage });
            }
            return Unauthorized();
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> UpdatePassword([FromBody] ChangePasswordViewModel viewmodel)
        {
            await _iChangePasswordService.UpdatePassword(viewmodel);
            return Ok(new { StatusCode = _iChangePasswordService.ErrorNo, StatusMessage = _iChangePasswordService.ErrorMessage });
        }
    }

}