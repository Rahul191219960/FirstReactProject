using AutoMapper;
using NgenV4.Domain.Entities;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgenV4.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactViewModel>();
            CreateMap<ContactViewModel, Contact>();
            CreateMap<Contact, ContactViewModelGrid>();
            CreateMap<DataSourceViewModel, DataSource>();
            CreateMap<FormModelFields, FormModelFieldsViewModel>();
            CreateMap<FormModelGroups, FormModelGroupsViewModel>();
            CreateMap<FormModel, FormModelViewModel>();
            CreateMap<Sample1, Sample1ViewModelGrid>();
            CreateMap<FormModelLOV, FormModelLOVViewModel>();
            CreateMap<FormRadioList, FormRadioListViewModel>();
            CreateMap<ProcedureParams, ProcedureParamsViewModel>();
            CreateMap<ProcedureParamsViewModel, ProcedureParams>();
            CreateMap<Sample1ViewModel, Sample1>();
            CreateMap<Sample1, Sample1ViewModel>();
            CreateMap<Users, UsersViewModel>();
            CreateMap<UsersViewModel, Users>();
             CreateMap<Users, UsersViewModelGrid>();
            CreateMap<AutoCompleteData,AutoCompleteDataViewModel>();
            CreateMap<AutoCompleteDataViewModel,AutoCompleteData>();
            CreateMap<Country, CountryViewModel>();
            CreateMap<CountryViewModel, Country>();
            CreateMap<Country, CountryViewModelGrid>();
            CreateMap<Employeecity, EmployeecityViewModel>();
            CreateMap<EmployeecityViewModel,Employeecity>();
        }
    }
}
