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

namespace NgenV4.Service
{
    public class TodoService : BaseService, ITodoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public TodoService(IMapper imapper, IUnitOfWork iUnitOfWork)
        {
            _mapper = imapper;
            _unitOfWork = iUnitOfWork;
        }
        public async Task DeleteRecord(string SNo)
        {
            try
            {
                bool isDeleted = await _unitOfWork.ITodoRepository.DeleteRecord(SNo);
                _unitOfWork.Commit();
                this.ErrorNo = _unitOfWork.ITodoRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.ITodoRepository.ErrorMessage;
                if (this.ErrorNo == 0 && isDeleted)
                {
                    this.ErrorMessage = this.GetGlobalMessage("Delete");
                }
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "TodoService:DeleteRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoService:DeleteRecord() - " + ex.ToString());

            }
        }
        public async Task<IEnumerable<TodoViewModelGrid>> GetList(DataSourceViewModel dataSource)
        {
            try
            {
                var map = _mapper.Map<DataSourceViewModel, DataSource>(dataSource);
                var result = await _unitOfWork.ITodoRepository.GetList(map);
                var Todo =  _mapper.Map<IEnumerable<TodoViewModelGrid>>(result.AsEnumerable());
                return Todo;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "TodoService:GetList() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoService:GetList() - " + ex.ToString());
                return null;
            }
        }
        public async Task<IEnumerable<TodoViewModel>> GetRecord(string SNo)
        {
            try
            {
                var result = await _unitOfWork.ITodoRepository.GetRecord(SNo);
                var Todo = _mapper.Map<IEnumerable<TodoViewModel>>(result);
                return Todo;
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "TodoService:GetRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoService:GetRecord() - " + ex.ToString());
                return null;
            }
        }
        public async Task SaveRecord(TodoViewModel ar)
        {
            try
            {
                Todo Todo = _mapper.Map<TodoViewModel, Todo>(ar);
                bool Count = await _unitOfWork.ITodoRepository.IsEmailExists(ar.email, null);
                this.ErrorNo = _unitOfWork.ITodoRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.ITodoRepository.ErrorMessage;
                if (this.ErrorNo == 0)
                {
                    if (Count)
                    {
                        this.ErrorNo = 9999;
                        this.ErrorMessage = this.GetGlobalMessage("Exist");
                    }
                    else
                    {
                        Count = await _unitOfWork.ITodoRepository.IsPhoneExists(ar.phone, null);
                        this.ErrorNo = _unitOfWork.ITodoRepository.ErrorNo;
                        this.ErrorMessage = _unitOfWork.ITodoRepository.ErrorMessage;
                        if (this.ErrorNo == 0)
                        {
                            if (Count)
                            {
                                this.ErrorNo = 9999;
                                this.ErrorMessage = this.GetGlobalMessage("Exist");
                            }
                            else
                            {
                                await _unitOfWork.ITodoRepository.SaveRecord(Todo);
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
                this.ErrorMessage = "TodoService:SaveRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoService:SaveRecord() - " + ex.ToString());
            }

        }
        public async Task UpdateRecord(TodoViewModel ar)
        {
            try
            {
                Todo Todo = _mapper.Map<TodoViewModel, Todo>(ar);
                bool Count = await _unitOfWork.ITodoRepository.IsEmailExists(ar.email, (ar.SNo).ToString());
                this.ErrorNo = _unitOfWork.ITodoRepository.ErrorNo;
                this.ErrorMessage = _unitOfWork.ITodoRepository.ErrorMessage;
                if (this.ErrorNo == 0)
                {
                    if (Count)
                    {
                        this.ErrorNo = 9999;
                        this.ErrorMessage = this.GetGlobalMessage("Exist");
                    }
                    else
                    {
                        Count = await _unitOfWork.ITodoRepository.IsPhoneExists(ar.phone, null);
                        this.ErrorNo = _unitOfWork.ITodoRepository.ErrorNo;
                        this.ErrorMessage = _unitOfWork.ITodoRepository.ErrorMessage;
                        if (this.ErrorNo == 0)
                        {
                            if (Count)
                            {
                                this.ErrorNo = 9999;
                                this.ErrorMessage = this.GetGlobalMessage("Exist");
                            }
                            else
                            {
                                await _unitOfWork.ITodoRepository.UpdateRecord(Todo);
                                _unitOfWork.Commit();
                                if (this.ErrorNo == 0)
                                    this.ErrorMessage = this.GetGlobalMessage("Update");
                            }
                        }
                    }
                }
            }
            catch (System.Exception ex)
            {
                this.ErrorNo = 80001;
                this.ErrorMessage = "TodoService:UpdateRecord() - " + this.GetGlobalMessage("Error");
                this.ErrorLog("TodoService:UpdateRecord() - " + ex.ToString());
            }
        }
    }
}
