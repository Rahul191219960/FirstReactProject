using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NgenV4.Service;
using NgenV4.ViewModel;

namespace NgenV4.API.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormModelController : ControllerBase
    {
        private readonly IFormModelService _formModelService;
        public FormModelController(IFormModelService formModelService)
        {
            _formModelService = formModelService;
        }

        public async Task<FormModelViewModel> Get(string modelName)
        {
            var result = await _formModelService.GetRecord(modelName);
            return result;
        }
    }
}