using Microsoft.AspNetCore.Mvc;

namespace ConsultarEndereco.Controllers;

public class endereco : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}