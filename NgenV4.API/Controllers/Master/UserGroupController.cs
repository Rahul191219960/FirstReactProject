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
    public class UserGroupController : ControllerBase
    {
        private readonly IUserGroupService _UserGroupService;
        public UserGroupController(IUserGroupService UserGroupService)
        {
            _UserGroupService = UserGroupService;
        }
        [HttpPost]
        [Route("[action]")]
        public IActionResult GetList(DataSourceRequestViewModel request)
        {
            return Ok(_UserGroupService.GetList(request).Result);
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SaveRecord([FromBody]UserGroupViewModel cvm)
        {
            await _UserGroupService.SaveRecord(cvm);
            return Ok(new { StatusCode = _UserGroupService.ErrorNo, StatusMessage = _UserGroupService.ErrorMessage });
        }
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> DeleteRecord(string id)
        {
            await _UserGroupService.DeleteRecord(id);
            return Ok(new { StatusCode = _UserGroupService.ErrorNo, StatusMessage = _UserGroupService.ErrorMessage });
        }
        [HttpPost]
        [Route("[action]/{id}")]
        public async Task<IActionResult> UpdateRecord([FromBody]JObject obj, int id)
        {
            await _UserGroupService.UpdateRecord(obj, id);
            return Ok(new { StatusCode = _UserGroupService.ErrorNo, StatusMessage = _UserGroupService.ErrorMessage });
        }
        
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetRecord(string id)
        {
            return Ok(_UserGroupService.GetRecord(id).Result);
        }
    }
}