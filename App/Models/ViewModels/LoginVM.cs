namespace App.Models.ViewModels
{
    public class LoginVM
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string CSRFToken { get; set; }
    }
}