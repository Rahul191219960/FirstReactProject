using System;
using NgenV4.ViewModel.Common;

namespace NgenV4.ViewModel
{
    public class UsersViewModelGrid
    {
        public int id { get; set; }
        
        public string UserTypeText { get; set; }
        public string UserName { get; set; }
        public string AirlineSNoText { get; set; }
        public string GroGroupSNoTextupSNo { get; set; }
        public string TerminalSNoText { get; set; }
        public string EMailID { get; set; }
        public DateTime? UserExpiryDate { get; set; }
        public string IsActive { get; set; }

    }
}