namespace NgenV4.Domain.Entities
{
    public class ChangePassword
{
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmPassword { get; set; }
    public string CurrentGuid { get; set; }
    public string Hash { get; set; }
    public string UserId { get; set; }
}
}