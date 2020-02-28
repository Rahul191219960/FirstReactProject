using System;
using NgenV4.ViewModel.Common;

namespace NgenV4.ViewModel
{
    public class UsersViewModel
    {
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string EMailID { get; set; }
        public string Password { get; set; }
        public string MobileCountryCode { get; set; }
        public string Mobile { get; set; }
        public string CityCode { get; set; }
        public string Address { get; set; }
        public string DefaultTerminalSNo { get; set; }
        public int TerminalSNoKey { get; set; }
        public string TerminalSNoText { get; set; }
        public int AirportSNoKey { get; set; }
        public string AirportSNoText { get; set; }
        public int LoginTypeSNo { get; set; }
        public bool IsBlocked { get; set; }
        public string IsActive { get; set; }
        public DateTime PasswordExpiryDate { get; set; }
        public int AirlineSNoKey { get; set; }
        public string AirlineSNoText { get; set; }
        public int CustomerSNo { get; set; }
        public int GroupSNoKey { get; set; }
        public string GroupSNoText { get; set; }
        public bool IsLogin { get; set; }
        public string SessionId { get; set; }
        public int TotalInvalidAttempts { get; set; }
        public DateTime LastLoggedOn { get; set; }
        public DateTime LastFailedLoggedOn { get; set; }
        public bool IsRequiredChange { get; set; }
        public string LastLoggedOnIP { get; set; }
        public string LastFailedLoggedOnIP { get; set; }
        public string RequestedURL { get; set; }
        public bool IsCityChangeAllowed { get; set; }
        public DateTime NextPasswordChangeDate { get; set; }
        public string UserSignature { get; set; }
        public string otherProductAccess { get; set; }
        public string CityName { get; set; }
        public int CitySNoKey { get; set; }
        public string CitySNoText { get; set; }
        public string HostName { get; set; }
        public string Browser { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UserTypeKey { get; set; }
        public string UserTypeText { get; set; }
        public int agentKey { get; set; }
        public string agentText { get; set; }
        public int EmployeeSNoKey { get; set; }
        public String EmployeeSNoText { get; set; }
        public int DesignationSNoKey { get; set; }
        public string DesignationSNoText { get; set; }
        public int OfficeSNoKey { get; set; }
        public string OfficeSNoText { get; set; }
        public string WeighingScaleSNo { get; set; }
        public string GroupEMailID { get; set; }
        public string GUID { get; set; }
        public int XrayMachineSNo { get; set; }
        public string OtherAirlineAccess { get; set; }
        public string otherAirportAccess { get; set; }
        public bool IsShowAllData { get; set; }
        public DateTime? UserExpiryDate { get; set; }
        public int NoOfBadAttemps { get; set; }
        public int CurrentCitySno { get; set; }
        public int CurrentAirportSNo { get; set; }
        public DateTime GUIDGeneratedDateTime { get; set; }
        public int LastResetUserSNo { get; set; }
        public DateTime LastResetOnUserSNo { get; set; }
        public string CustomerImageName { get; set; }
        public bool isProductAccess { get; set; }
        public bool IsUnVisible { get; set; }
        public string Remarks { get; set; }
        public bool isAllowedUserCreation { get; set; }
        public string IsSpecialInvoice { get; set; }
        public bool IsClientSide { get; set; }
        public string ChatStatus { get; set; }
        public bool ShowAsAgreedonAWBPrint { get; set; }
        public bool IsSync { get; set; }
        public DateTime LastChangeDateTime { get; set; }
        public bool? OverrideAsAgreedonAWBPrint { get; set; }
        public bool? ViewRatewhileBooking { get; set; }
        public bool? EnableRateTabInReservation { get; set; }
        public bool? ShowBalanceCreditLimit { get; set; }
    }
}