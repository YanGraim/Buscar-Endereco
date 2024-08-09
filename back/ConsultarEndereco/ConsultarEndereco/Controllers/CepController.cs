using Microsoft.AspNetCore.Mvc;
using Endereco.Servico.ViaCep;

namespace ConsultarEndereco.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CepController : ControllerBase
    {
        [HttpGet(Name = "GetCep")]
        public async Task<IActionResult> ObterCeps(string cep)
        {
            var request = await new ViaCepService().BuscarEnderecoPorCep(cep);
            return Ok(request);
        }
    }
}