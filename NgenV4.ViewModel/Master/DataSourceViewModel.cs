using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.ViewModel
{
    public class DataSourceViewModel
    {

        private string _SortField;
        public String SortField
        {
            get { return _SortField ?? string.Empty; }
            set { _SortField = value; }
        }
        private string _SortDirection;
        public String SortDirection
        {
            get { return _SortDirection ?? string.Empty; }
            set { _SortDirection = value; }
        }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        //public string SortField { get; set; }
        //public string SortDirection { get; set; }
        public string WhereClause { get; set; }
    }
}
