using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace NgenV4.Domain.Entities
{
    [Table("Contact")]
    public class Contact
    {
        public int id { get; set; }
        public string lastname { get; set; }
        public string firstname { get; set; }
        public string jobtitle { get; set; }
        public string company { get; set; }
        public string email { get; set; }
        public string web { get; set; }
        public string category { get; set; }
        [Write(false)]
        public string category_txt { get; set; }
        [Write(false)]
        public int? categorySNo { get; set; }
        public DateTime c_date { get; set; }
        public DateTime u_date { get; set; }
        public string phone { get; set; }
        public string phonehome { get; set; }
        public string phonecell { get; set; }
        public string fax { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string country { get; set; }
        public string notes { get; set; }
        [Write(false)]
        public int _full_count { get; set; }

    }
}
