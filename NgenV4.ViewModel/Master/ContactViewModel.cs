using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace NgenV4.ViewModel
{
    public class ContactViewModel
    {
        public int id { get; set; }
        // [Required]
        [MaxLength(15, ErrorMessage = "Maxiumum 15 characters")]
        [RegularExpression(@"[A-Za-z]+$", ErrorMessage = "lastname only accept alphabets")]
        public string lastname { get; set; }
        //  [Required]
        [MaxLength(15, ErrorMessage = "Maxiumum 15 characters")]
        [RegularExpression(@"[A-Za-z]+$", ErrorMessage = "lastname only accept alphabets")]
        public string firstname { get; set; }
        public string jobtitle { get; set; }
        public string company { get; set; }
        public string email { get; set; }
        public string web { get; set; }
        public string category_txt { get; set; }
        public string category { get; set; }
        public int? categorySNo { get; set; }
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
        public DateTime c_date { get; set; }
        public DateTime u_date { get; set; }
    }

}
