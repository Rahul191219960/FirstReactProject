using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace NgenV4.Domain.Entities
{
    [Table("Country")]
    public class Country
    {
        public int SNo { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public int? CurrencySNo { get; set; }
        public string CurrencyCode { get; set; }
        public string Continent { get; set; }
        public string IATAAreaCode { get; set; }
        public string ISDCode { get; set; }
        [Write(false)]
        public int _full_count { get; set; }

    }
}
