using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Service
{
    public interface IAutoCompleteService
    {
        Task<AutoCompleteResultViewModel> AutoCompleteDataSource(AutoCompleteViewModel modelName);
    }
}
