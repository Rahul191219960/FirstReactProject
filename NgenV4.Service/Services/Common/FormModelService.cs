using AutoMapper;
using NgenV4.Domain;
using NgenV4.Domain.Entities;
using NgenV4.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Service
{
    public class FormModelService : BaseService, IFormModelService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FormModelService(IMapper imapper, IUnitOfWork iUnitOfWork)
        {
            _mapper = imapper;
            _unitOfWork = iUnitOfWork;
        }
        public async Task<FormModelViewModel> GetRecord(string modelName)
        {
            var result = await _unitOfWork.IFormModelRepository.GetRecord(modelName);
            var dataS = _mapper.Map<FormModelViewModel>(result);
            return dataS;
        }
    }
}
