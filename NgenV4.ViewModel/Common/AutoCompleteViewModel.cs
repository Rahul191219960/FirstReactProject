using System;
using System.Collections.Generic;
using System.Collections;
using System.Runtime.Serialization;
using System.Text;

namespace NgenV4.ViewModel.Common
{
    public class AutoCompleteResultViewModel
    {
        public IEnumerable Data { get; set; }
        public int Total { get; set; }
        public IEnumerable ExtraData { get; set; }
        public string FilterCondition { get; set; }
        public string SortCondition { get; set; }
        public string StoredProcedure { get; set; }
    }
    public class AutoCompleteFilterViewModel
    {
        public string Operator { get; set; }
        public string Field { get; set; }
        public dynamic Value { get; set; }
        public string Logic { get; set; }
        public List<AutoCompleteFilterViewModel> Filters { get; set; }
        public string Type { get; set; }
    }
    public class AutoCompleteViewModel
    {
        public AutoCompleteFilterViewModel Filters { get; set; }
        public List<ProcedureParamsViewModel> Params { get; set; }
        public string Value { get; set; }
        public string AutoCompleteNames { get; set; }
        public int PageSize { get; set; }
        public bool IsMulti { get; set; }
        public List<AutoCompleteDataViewModel> ForMulti { get; set; }
    }
    public class AutoCompleteDataViewModel
    {
        public string value { get; set; }
        public string label { get; set; }
        public string templateColumn { get; set; }
    }
    public class ProcedureParamsViewModel
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
