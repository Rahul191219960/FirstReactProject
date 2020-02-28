using AutoMapper;
using NgenV4.Domain;
using NgenV4.Domain.Entities;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Service
{
    public class AutoCompleteService : IAutoCompleteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AutoCompleteService(IMapper imapper, IUnitOfWork iUnitOfWork)
        {
            _mapper = imapper;
            _unitOfWork = iUnitOfWork;
        }
        public async Task<AutoCompleteResultViewModel> AutoCompleteDataSource(AutoCompleteViewModel source)
        {
            var autoComplete = await _unitOfWork.IAutoCompleteRepository.GetAutoCompletes(source.AutoCompleteNames);
            AutoCompleteResultViewModel result = new AutoCompleteResultViewModel();
            if (autoComplete != null && string.IsNullOrEmpty(autoComplete.ProcName))
            {
                int pagesize = source.PageSize;
                string wherecondition = "";
                string tablename = autoComplete.TableName;
                string keycolumn = autoComplete.KeyColumn;
                string textcolumn = autoComplete.TextColumn;
                string templatecolumn = autoComplete.TemplateColumn;
                string procName = autoComplete.ProcName;
                AutoCompleteFilterViewModel defaultFilter = new AutoCompleteFilterViewModel
                {
                    Operator = autoComplete.FilterType,
                    Field = autoComplete.TextColumn,
                    Value = source.Value
                };
                GridOperations.DefaultFilter(defaultFilter, ref wherecondition);
                if (source.Filters != null && source.Filters.Filters == null)
                {
                    GridOperations.DefaultFilter(source.Filters, ref wherecondition);
                }
                else if (source.Filters != null)
                {
                    try
                    {
                        GridOperations.ProcessFilter(source.Filters, ref wherecondition);
                    }
                    catch (Exception ex)// (Exception ex)
                    {
                        string strerror = ex.Message;
                    }
                }
                if (source.IsMulti && source.ForMulti != null && source.ForMulti.Count > 0)
                {
                    for (int i = 0; i < source.ForMulti.Count; i++)
                    {
                        defaultFilter = new AutoCompleteFilterViewModel
                        {
                            Operator = "neq",
                            Field = autoComplete.TextColumn,
                            Value = source.ForMulti[i].label,
                            Logic = "AND"
                        };
                        GridOperations.DefaultFilter(defaultFilter, ref wherecondition);
                    }
                }
                result.Data = await _unitOfWork.IAutoCompleteRepository.GetOptions(pagesize, wherecondition, tablename, keycolumn, textcolumn, templatecolumn);
            }
            else if (autoComplete != null && !string.IsNullOrEmpty(autoComplete.ProcName))
            {

                var x = _mapper.Map<List<ProcedureParamsViewModel>, List<ProcedureParams>>(source.Params);
                result.Data = await _unitOfWork.IAutoCompleteRepository.GetOptions(autoComplete.ProcName, x);
            }
            return result;
        }
    }
}
