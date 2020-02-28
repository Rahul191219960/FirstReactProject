using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace NgenV4.ViewModel
{
    public class TodoViewModel
    {
        public int SNo { get; set; }
        public string alphabetic { get; set; }
        public string alphanumeric { get; set; }
        public int numeric { get; set; }
        public decimal _decimal { get; set; }
        public decimal price { get; set; }
        public string email { get; set; }
        public string web { get; set; }
        public string phone { get; set; }
        public string description { get; set; }
         public string popup_alphabetic { get; set; }
        public TodoPopupViewModel popup { get; set; }
        //-------     ---------//
    }

    public class TodoPopupViewModel
    {
        public int SNo_foriegn { get; set; }
        public string popup_alphabetic { get; set; }
        public string popup_alphanumeric { get; set; }
        public int popup_numeric { get; set; }
        public decimal popup_decimal { get; set; }
        public decimal popup_price { get; set; }
        public string popup_email { get; set; }
        public string popup_web { get; set; }
        public string popup_phone { get; set; }
        public string notes { get; set; }
    }

}
