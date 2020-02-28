using AutoMapper;
using NgenV4.Domain.Entities;
using NgenV4.Domain.Repositories;
using NgenV4.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json.Linq;
using NgenV4.Domain;
using NgenV4.ViewModel.Common;

namespace NgenV4.Service
{
    public class ContactService : BaseService, IContactService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ContactService(IMapper imapper, IUnitOfWork iUnitOfWork)
        {
            _mapper = imapper;
            _unitOfWork = iUnitOfWork;
        }

        public async Task DeleteRecord(string SNo)
        {
            try
            {
                bool isDeleted = await _unitOfWork.IContactRepository.DeleteRecord(SNo);
                _unitOfWork.Commit();
                this.ErrorNo = _unitOfWork.IContactRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.IContactRepository.ErrorMessage;
                if (this.ErrorNo == 0 && isDeleted)
                {
                    this.ErrorMessage = this.GetGlobalMessage("Delete");
                }
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "ContactService:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactService:DeleteRecord() - " + ex.ToString());

            }
        }

        public async Task<IEnumerable<ContactViewModelGrid>> GetList(DataSourceRequestViewModel request)
        {
            try
            {
                DataSourceViewModel dataSource = new DataSourceViewModel();
                var query = request.QueryString
                    .Replace('?', ' ')
                    .Trim()
                    .Split('&');
                foreach (var q in query)
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
                dataSource.WhereClause = BuildGroupQuery(request.GroupList, request.GridRows, "AND");

                var map = _mapper.Map<DataSourceViewModel, DataSource>(dataSource);
                var result = await _unitOfWork.IContactRepository.GetList(map);
                var contact = _mapper.Map<IEnumerable<ContactViewModelGrid>>(result);
                return contact;

            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "ContactService:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactService:GetList() - " + ex.ToString());
                return null;
            }
        }

        private string BuildGroupQuery(List<SearchGroupViewModel> groupList, List<GridFilterRowViewModel> rowList,
            string parentOperator)
        {
            if (groupList.Count == 0) return "";

            string finalQuery = "";
            for (int i = 0; i < groupList.Count; i++)
            {
                SearchGroupViewModel sgvm = groupList.ElementAt(i);
                string op = sgvm._operator;

                //Check if have subgroups or not
                if (sgvm.subGroups.Count > 0)
                {
                    List<string> grpRowList = new List<string>(sgvm.valueList);
                    foreach (SearchGroupViewModel subgrp in sgvm.subGroups)
                    {
                        foreach (string str in subgrp.valueList)
                        {
                            grpRowList.RemoveAll(x => x == str);
                        }
                    }

                    //Recursion for sub-groups to get the full query
                    string allSubGrpsQuery = BuildGroupQuery(sgvm.subGroups, rowList, op);

                    //Elements remains in the list so create query for them and append them using the operator
                    if (grpRowList.Count > 0)
                    {
                        for (int j = 0; j < grpRowList.Count; j++)
                        {
                            string rowid = grpRowList.ElementAt(j);
                            GridFilterRowViewModel gfrvm = rowList.Find(x => x.rowid == rowid);
                            string currentRowQuery = BuildRowQuery(gfrvm);
                            allSubGrpsQuery = allSubGrpsQuery + op + currentRowQuery;
                        }
                    }

                    if (i != groupList.Count - 1)
                    {
                        finalQuery = finalQuery + "(" + allSubGrpsQuery + ")" + parentOperator;
                    }
                    else
                    {
                        finalQuery = finalQuery + "(" + allSubGrpsQuery + ")";
                    }
                }
                else
                {
                    string noSubGrpQuery = "";
                    for (int j = 0; j < sgvm.valueList.Count; j++)
                    {
                        string rowid = sgvm.valueList.ElementAt(j);
                        GridFilterRowViewModel gfrvm = rowList.Find(x => x.rowid == rowid);
                        string currentRowQuery = BuildRowQuery(gfrvm);
                        if (j != sgvm.valueList.Count - 1)
                        {
                            noSubGrpQuery = noSubGrpQuery + currentRowQuery + op;
                        }
                        else
                        {
                            noSubGrpQuery = noSubGrpQuery + currentRowQuery;
                        }
                    }

                    noSubGrpQuery = "(" + noSubGrpQuery + ")";

                    if (i != groupList.Count - 1)
                    {
                        finalQuery = finalQuery + noSubGrpQuery + parentOperator;
                    }
                    else
                    {
                        finalQuery = finalQuery + noSubGrpQuery;
                    }
                }
            }

            return "WHERE " + finalQuery;
        }

        private string BuildRowQuery(GridFilterRowViewModel row)
        {
            string queryBlock = "";
            switch (row._operator)
            {
                case "starts with":
                    queryBlock = "(" + row.field + " like '" + row.value + "%')";
                    break;
                case "ends with":
                    queryBlock = "(" + row.field + " like '%" + row.value + "')";
                    break;
                case "equals":
                    queryBlock = "(" + row.field + " = '" + row.value + "')";
                    break;
                case "not equals":
                    queryBlock = "(" + row.field + " <> '" + row.value + "')";
                    break;
                case "contains":
                    queryBlock = "(" + row.field + " like '%" + row.value + "%')";
                    break;
                case "does not contains":
                    queryBlock = "(" + row.field + " not like '%" + row.value + "%')";
                    break;
                case "is empty":
                    queryBlock = "((" + row.field + " = '') or (" + row.field + " is null))";
                    break;
                case "is not empty":
                    queryBlock = "((" + row.field + " <> '') and (" + row.field + " is not null))";
                    break;
                case "greater than":
                    queryBlock = "(" + row.field + " > '" + row.value + "')";
                    break;
                case "greater than equal to":
                    queryBlock = "(" + row.field + " >= '" + row.value + "')";
                    break;
                case "less than":
                    queryBlock = "(" + row.field + " < '" + row.value + "')";
                    break;
                case "less than equal to":
                    queryBlock = "(" + row.field + " <= '" + row.value + "')";
                    break;
                default: break;
            }

            return queryBlock;
        }

        public async Task<ContactViewModel> GetRecord(string SNo)
        {
            try
            {
                var result = await _unitOfWork.IContactRepository.GetRecord(SNo);
                var contact = _mapper.Map<ContactViewModel>(result);
                return contact;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "ContactService:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactService:GetRecord() - " + ex.ToString());
                return null;
            }
        }

        public async Task SaveRecord(ContactViewModel ar)
        {
            try
            {
                Contact contact = _mapper.Map<ContactViewModel, Contact>(ar);
                bool Count = await _unitOfWork.IContactRepository.IsEmailExists(ar.email, null);
                this.ErrorNo = _unitOfWork.IContactRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.IContactRepository.ErrorMessage;
                if (this.ErrorNo == 0)
                {
                    if (Count)
                    {
                        this.ErrorNo = 9999;
                        this.ErrorMessage = this.GetGlobalMessage("Exist");
                    }
                    else
                    {
                        Count = await _unitOfWork.IContactRepository.IsPhoneExists(ar.phone, null);
                        this.ErrorNo = _unitOfWork.IContactRepository.ErrorNo;
                        this.ErrorMessage = _unitOfWork.IContactRepository.ErrorMessage;
                        if (this.ErrorNo == 0)
                        {
                            if (Count)
                            {
                                this.ErrorNo = 9999;
                                this.ErrorMessage = this.GetGlobalMessage("Exist");
                            }
                            else
                            {
                                await _unitOfWork.IContactRepository.SaveRecord(contact);
                                _unitOfWork.Commit();
                                if (this.ErrorNo == 0)
                                    this.ErrorMessage = this.GetGlobalMessage("Save");
                            }
                        }
                    }
                }
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "ContactService:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactService:SaveRecord() - " + ex.ToString());
            }

        }

        public async Task UpdateRecord(JObject ar, int id)
        {
            try
            {
                //Contact contact = _mapper.Map<ContactViewModel, Contact>(ar);
                await _unitOfWork.IContactRepository.UpdateRecord(ar, id);
                _unitOfWork.Commit();
                this.ErrorNo = _unitOfWork.IContactRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.IContactRepository.ErrorMessage;

            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "ContactService:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("ContactService:UpdateRecord() - " + ex.ToString());
            }
        }
    }
}
