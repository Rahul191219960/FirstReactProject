using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NgenV4.Service;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;

namespace NgenV4.API.Controllers.Common
{
    [Route("api/AutoComplete")]
    public class AutoCompleteController : ControllerBase
    {
        private readonly IAutoCompleteService _autoCompleteService;
        public AutoCompleteController(IAutoCompleteService autoCompleteService)
        {
            _autoCompleteService = autoCompleteService;
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<AutoCompleteResultViewModel> GetData([FromBody]AutoCompleteViewModel source)
        {
            return await _autoCompleteService.AutoCompleteDataSource(source);
        }
    }
}