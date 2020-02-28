using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NgenV4.Service;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;
namespace NgenV4.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult GetList(DataSourceRequestViewModel request)
        {
            return Ok(_contactService.GetList(request).Result);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SaveRecord([FromBody]ContactViewModel cvm)
        {
            await _contactService.SaveRecord(cvm);
            return Ok(new { StatusCode = _contactService.ErrorNo, StatusMessage = _contactService.ErrorMessage });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> DeleteRecord(string id)
        {
            await _contactService.DeleteRecord(id);
            return Ok(new { StatusCode = _contactService.ErrorNo, StatusMessage = _contactService.ErrorMessage });
        }

        [HttpPost]
        [Route("[action]/{id}")]
        public async Task<IActionResult> UpdateRecord([FromBody]JObject obj, int id)
        {
            await _contactService.UpdateRecord(obj, id);
            return Ok(new { StatusCode = _contactService.ErrorNo, StatusMessage = _contactService.ErrorMessage });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetRecord(string id)
        {
            return Ok(_contactService.GetRecord(id).Result);
        }
    }
}