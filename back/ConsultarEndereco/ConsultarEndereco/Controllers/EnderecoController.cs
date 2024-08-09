using Microsoft.AspNetCore.Mvc;
using Endereco.Servico.ViaCep;

namespace ConsultarEndereco.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnderecoController : ControllerBase
    {
        [HttpGet(Name = "GetEndereco")]
        public async Task<IActionResult> ObterEnderecos(string uf, string cidade)
        {
            var request = await new ViaCepEnderecoService().BuscarEnderecoPorEstadoCidade(uf, cidade);
            return Ok(request);
        }
    }
}