using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    public class Home : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}