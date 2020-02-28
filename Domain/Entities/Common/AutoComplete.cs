using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.Domain.Entities
{
    public class AutoComplete
    {
        public int SNo { get; set; }
        public string AutoCompleteName { get; set; }
        public string ProcName { get; set; }
        public string TableName { get; set; }
        public string TemplateColumn { get; set; }
        public string TextColumn { get; set; }
        public string KeyColumn { get; set; }
        public string FilterType { get; set; }
    }
    public class ProcedureParams
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
     public class AutoCompleteData
    {
        public string value { get; set; }
        public string label { get; set; }
        public string templateColumn { get; set; }
    }

}
