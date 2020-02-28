using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Dapper.Contrib.Extensions;

namespace NgenV4.Domain.Entities
{
    [Table("UserGroup")]
    public class UserGroup
    {
        [Write(false)]
        public int id { get; set; }

        public string GroupName { get; set; }
        public string SimilarGroup { get; set; }
        public string UserType { get; set; }
        public string PenaltyType { get; set; }
        public string IsActive { get; set; }
        public string IsMultipleCity { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }

}
