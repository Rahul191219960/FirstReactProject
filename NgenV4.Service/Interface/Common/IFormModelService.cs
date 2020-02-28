using NgenV4.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Service
{
    public interface IFormModelService
    {
        Task<FormModelViewModel> GetRecord(string modelName);
    }
}
