using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.ViewModel
{
    public class ContactViewModelGrid
    {
        public int id { get; set; }
        public string lastname { get; set; }
        public string firstname { get; set; }
        public string company { get; set; }
        public string email { get; set; }
        public string category_txt { get; set; }
        public string category { get; set; }
        public DateTime c_date { get; set; }
        public DateTime u_date { get; set; }
        public int _full_count { get; set; }
    }
}
