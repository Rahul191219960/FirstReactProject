using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace NgenV4.ViewModel
{
    public class CountryViewModel
    {
        public int id { get; set; }
        // [Required]
        [MaxLength(15, ErrorMessage = "Maxiumum 15 characters")]
        [RegularExpression(@"[A-Za-z]+$", ErrorMessage = "lastname only accept alphabets")]
        public string lastname { get; set; }
        //  [Required]
        [MaxLength(15, ErrorMessage = "Maxiumum 15 characters")]
        [RegularExpression(@"[A-Za-z]+$", ErrorMessage = "lastname only accept alphabets")]
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public int? CurrencySNo { get; set; }
        public string CurrencyCode { get; set; }
        public string Continent { get; set; }
        public string IATAAreaCode { get; set; }
        public string ISDCode { get; set; }
       
    }

}
