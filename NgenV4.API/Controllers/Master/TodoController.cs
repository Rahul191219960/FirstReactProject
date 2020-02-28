using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NgenV4.Service;
using NgenV4.ViewModel;

namespace NgenV4.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _TodoService;
        public TodoController(ITodoService TodoService)
        {
            _TodoService = TodoService;
        }
        public IActionResult Get()
        {
            DataSourceViewModel dataSource = new DataSourceViewModel();
            var query = Request.QueryString.Value
                .Replace('?',' ')
                .Trim()
                .Split('&');
            foreach(var q in query)
            {
                var c = q.Split('=');
                switch (c[0])
                {
                    case "order":
                        var o = c[1].Split('.');
                        dataSource.SortField = o[0];
                        dataSource.SortDirection = o[1];
                        break;
                    case "page":
                        dataSource.PageNo = Convert.ToInt32(c[1]);
                        break;                
                    case "pageSize":
                        dataSource.PageSize = Convert.ToInt32(c[1]);
                        break;
                    default:
                        break;
                }
            }
            return Ok(_TodoService.GetList(dataSource).Result);
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SaveRecord([FromBody]TodoViewModel cvm)
        {
            await _TodoService.SaveRecord(cvm);
            return Ok(new { StatusCode = _TodoService.ErrorNo, StatusMessage = _TodoService.ErrorMessage });
        }
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> DeleteRecord(string id)
        {
            await _TodoService.DeleteRecord(id);
            return Ok(new { StatusCode = _TodoService.ErrorNo, StatusMessage = _TodoService.ErrorMessage });
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> UpdateRecord([FromBody]TodoViewModel cvm)
        {
            await _TodoService.UpdateRecord(cvm);
            return Ok(new { StatusCode = _TodoService.ErrorNo, StatusMessage = _TodoService.ErrorMessage });
        }
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetRecord(string id)
        {
            return Ok(_TodoService.GetRecord(id).Result);
        }
    }
}