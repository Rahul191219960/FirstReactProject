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
    public class Sample1Controller : ControllerBase
    {
        private readonly ISample1Service _Sample1Service;
        public Sample1Controller(ISample1Service Sample1Service)
        {
            _Sample1Service = Sample1Service;
        }
        [HttpPost]
        [Route("[action]")]
        public IActionResult GetList(DataSourceRequestViewModel request)
        {
            return Ok(_Sample1Service.GetList(request).Result);
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SaveRecord([FromBody]Sample1ViewModel cvm)
        {
            await _Sample1Service.SaveRecord(cvm);
            return Ok(new { StatusCode = _Sample1Service.ErrorNo, StatusMessage = _Sample1Service.ErrorMessage });
        }
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> DeleteRecord(string id)
        {
            await _Sample1Service.DeleteRecord(id);
            return Ok(new { StatusCode = _Sample1Service.ErrorNo, StatusMessage = _Sample1Service.ErrorMessage });
        }
        [HttpPost]
        [Route("[action]/{id}")]
        public async Task<IActionResult> UpdateRecord([FromBody]JObject obj, int id)
        {
            await _Sample1Service.UpdateRecord(obj, id);
            return Ok(new { StatusCode = _Sample1Service.ErrorNo, StatusMessage = _Sample1Service.ErrorMessage });
        }
        
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetRecord(string id)
        {
            return Ok(_Sample1Service.GetRecord(id).Result);
        }
    }
}