using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace NgenV4.Domain.Entities
{
    public class TodoGrid
    {
        public int SNo { get; set; }
        public string alphabetic { get; set; }
        public string alphanumeric { get; set; }
        public int numeric { get; set; }
        public decimal _decimal { get; set; }
        public decimal price { get; set; }
        public string email { get; set; }
        public string popup_alphabetic { get; set; }
        public int _full_count { get; set; }
    }

}
