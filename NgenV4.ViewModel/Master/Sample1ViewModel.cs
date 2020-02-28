using System;
using System.Collections.Generic;
using NgenV4.ViewModel.Common;

namespace NgenV4.ViewModel
{
    public class Sample1ViewModel
    {
        public int id { get; set; }
        public int EmployeeID { get; set; }
        public String EmployeeName { get; set; }
        public String Designation { get; set; }
        public String Gender { get; set; }
        public String Address { get; set; }
        public String alphanumeric { get; set; }
        public decimal decimal1 { get; set; }
        public DateTime datetime1 { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string url { get; set; }
        public string checkBoxList { get; set; }
        // public AutoCompleteDataViewModel Country { get; set; }
        public string countryKey { get; set; }
        public string countryText { get; set; }
        public List<EmployeecityViewModel> city { get; set; }
        // public AutoCompleteDataViewModel country { get; set; }
        public string lov { get; set; }
        // public string lovSNo { get; set; }
    }
    public class EmployeecityViewModel
    {
        public string value { get; set; }
        public string label { get; set; }
        public long EmployeeSNo { get; set; }
    }
}