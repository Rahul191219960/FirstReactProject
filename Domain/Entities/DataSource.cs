using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.Domain.Entities
{
    public class DataSource
    {
       
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public string SortField { get; set; }
        public string SortDirection { get; set; }
        public string WhereClause { get; set; }

    }
}
