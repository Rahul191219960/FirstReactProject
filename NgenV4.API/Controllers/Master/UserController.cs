using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using NgenV4.Service;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;

namespace NgenV4.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _UsersService;
        public UsersController(IUsersService UsersService)
        {
            _UsersService = UsersService;
        }
        [HttpPost]
        [Route("[action]")]
        public IActionResult GetList(DataSourceRequestViewModel request)
        {
            return Ok(_UsersService.GetList(request).Result);
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SaveRecord([FromBody]UsersViewModel cvm)
        {
            await _UsersService.SaveRecord(cvm);
            return Ok(new { StatusCode = _UsersService.ErrorNo, StatusMessage = _UsersService.ErrorMessage });
        }
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> DeleteRecord(string id)
        {
            await _UsersService.DeleteRecord(id);
            return Ok(new { StatusCode = _UsersService.ErrorNo, StatusMessage = _UsersService.ErrorMessage });
        }
        [HttpPost]
        [Route("[action]/{id}")]
        public async Task<IActionResult> UpdateRecord([FromBody]JObject obj, int id)
        {
            await _UsersService.UpdateRecord(obj, id);
            return Ok(new { StatusCode = _UsersService.ErrorNo, StatusMessage = _UsersService.ErrorMessage });
        }
        
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetRecord(string id)
        {
            return Ok(_UsersService.GetRecord(id).Result);
        }
    }
}