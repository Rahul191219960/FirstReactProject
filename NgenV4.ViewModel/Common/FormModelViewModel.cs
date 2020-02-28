using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.ViewModel
{
    public class FormModelViewModel
    {
        public string id { get; set; }
        public string title { get; set; }
        public string world { get; set; }
        public string name { get; set; }
        public string namePlural { get; set; }
        public string icon { get; set; }
        public string defaultViewMany { get; set; }
        public string defaultViewOne { get; set; }
        public string titleField { get; set; }
        public bool prepared { get; set; }
        public List<FormModelFieldsViewModel> fields { get; set; }
        public List<FormModelGroupsViewModel> groups { get; set; }
        public List<FormModelCollections> collections { get; set; }
    }

    public class FormModelFieldsViewModel
    {
        public string id { get; set; }
        public string type { get; set; }
        // public string label { get; set; }
        public bool? required { get; set; }
        public int? maxLength { get; set; }
        public bool? inMany { get; set; }
        public int? width { get; set; }
        public string controlWidth { get; set; }
        public bool hideLabel { get; set; }
        public int? height { get; set; }
        public int? max { get; set; }
        public bool? noCharts { get; set; }
        public string help { get; set; }
        public string defaultValue { get; set; }
        public string regexp { get; set; }
        public bool? toUpperCase { get; set; }
        public int? precision { get; set; }
        public int? minLength { get; set; }
        public int? minChecked { get; set; }
        public decimal? maxValue { get; set; }
        public int? minValue { get; set; }
        public int? daysBack { get; set; }
        public int? daysForward { get; set; }
        public string currencySymbol { get; set; }
        public bool? serverSide { get; set; }
        public string autocompleteName { get; set; }
        public List<FormModelLOVViewModel> list { get; set; }
        public List<FormRadioListViewModel> radioList { get; set; }
    }

    public class FormModelGroupsViewModel
    {
        public string type { get; set; }
        public string appKey { get; set; }
        public int width { get; set; }
        public List<string> fields { get; set; }
    }

    public class FormModelCollections
    {
        public string id { get; set; }
        public string strobject { get; set; }
        public List<string> fields { get; set; }
    }

    public class FormModelLOVViewModel
    {
        public string id { get; set; }
        public string text { get; set; }
    }

    public class FormRadioListViewModel
    {
        public int id { get; set; }
        public string value { get; set; }
        public string display { get; set; }
    }
}
