using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;

namespace NgenV4.Domain.Entities
{
    [Table("Employee")]
    public class PermissionApplication
    {
        [Write(false)]
        public int id { get; set; }
        public string PageName { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}