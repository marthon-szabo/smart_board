namespace App.Models.ViewModels
{
    public class ChangePasswordVM
    {
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}