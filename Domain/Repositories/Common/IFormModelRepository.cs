using NgenV4.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Domain.Repositories
{
    public interface IFormModelRepository:IBaseRepository
    {
        Task<FormModel> GetRecord(string ModelName);
    }
}
