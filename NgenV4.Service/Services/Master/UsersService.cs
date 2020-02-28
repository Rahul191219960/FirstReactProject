using AutoMapper;
using NgenV4.Domain.Entities;
using NgenV4.Domain.Repositories;
using NgenV4.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using NgenV4.Domain;
using NgenV4.ViewModel.Common;
using Newtonsoft.Json.Linq;

namespace NgenV4.Service
{
    public class UsersService : BaseService, IUsersService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UsersService(IMapper imapper, IUnitOfWork iUnitOfWork)
        {
            _mapper = imapper;
            _unitOfWork = iUnitOfWork;
        }
        public async Task DeleteRecord(string SNo)
        {
            try
            {
                bool isDeleted = await _unitOfWork.IUsersRepository.DeleteRecord(SNo);
                _unitOfWork.Commit();
                this.ErrorNo = _unitOfWork.IUsersRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.IUsersRepository.ErrorMessage;
                if (this.ErrorNo == 0 && isDeleted)
                {
                    this.ErrorMessage = this.GetGlobalMessage("Delete");
                }
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "UsersService:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersService:DeleteRecord() - " + ex.ToString());

            }
        }
        public async Task<IEnumerable<UsersViewModelGrid>> GetList(DataSourceRequestViewModel request)
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

                if (request.GroupList.Count > 0)
                {
                    //process groups to build the where clause
                    string whereClause = BuildGroupQuery(request.GroupList, request.GridRows, "AND");
                }

                var map = _mapper.Map<DataSourceViewModel, DataSource>(dataSource);
                var result = await _unitOfWork.IUsersRepository.GetList(map);
                var contact = _mapper.Map<IEnumerable<UsersViewModelGrid>>(result);
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

        private string BuildGroupQuery(List<SearchGroupViewModel> groupList, List<GridFilterRowViewModel> rowList, string parentOperator)
        {
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
            return finalQuery;
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

        public async Task<UsersViewModel> GetRecord(string SNo)
        {
            try
            {
                var result = await _unitOfWork.IUsersRepository.GetRecord(SNo);
                var Users = _mapper.Map<UsersViewModel>(result);
                return Users;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "UsersService:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersService:GetRecord() - " + ex.ToString());
                return null;
            }
        }
        public async Task SaveRecord(UsersViewModel ar)
        {
            try
            {
                Users Users = _mapper.Map<UsersViewModel, Users>(ar);
                this.ErrorNo = _unitOfWork.IUsersRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.IUsersRepository.ErrorMessage;
                if (this.ErrorNo == 0)
                {
                    await _unitOfWork.IUsersRepository.SaveRecord(Users);
                    _unitOfWork.Commit();
                    if (this.ErrorNo == 0)
                        this.ErrorMessage = this.GetGlobalMessage("Save");
                }
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "UsersService:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersService:SaveRecord() - " + ex.ToString());
            }
        }
        public async Task UpdateRecord(JObject ar, int id)
        {
            try
            {
                //Contact contact = _mapper.Map<ContactViewModel, Contact>(ar);
                await _unitOfWork.IUsersRepository.UpdateRecord(ar, id);
                _unitOfWork.Commit();
                this.ErrorNo = _unitOfWork.IUsersRepository.ErrorNo;
                this.ErrorMessage = this.GetGlobalMessage("Update");

            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "UsersService:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("UsersService:UpdateRecord() - " + ex.ToString());
            }
        }
    }
}
