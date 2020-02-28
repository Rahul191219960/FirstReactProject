using System;
using NgenV4.ViewModel.Common;

namespace NgenV4.ViewModel
{
    public class UserGroupViewModelGrid
    {
        public int id { get; set; }
        
         public string GroupName { get; set; }
        public string SimilarGroup { get; set; }
        public string UserType { get; set; }
        public string PenaltyType { get; set; }
        public string IsActive { get; set; }

    }
}