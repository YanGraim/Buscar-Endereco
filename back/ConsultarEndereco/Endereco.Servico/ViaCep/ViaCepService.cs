using System.Text.Json.Serialization;
using Endereco.Dominio.Entites;
using Newtonsoft.Json;

namespace Endereco.Servico.ViaCep;

public class ViaCepService
{
    public async Task<CepEntity> BuscarEnderecoPorCep(string cep)
    {
        var httpClient = new HttpClient();
        var retornoRequisicao = await httpClient.GetAsync($"https://viacep.com.br/ws/{cep}/json/");

        if (retornoRequisicao.IsSuccessStatusCode)
        {
            var body = await retornoRequisicao.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<CepEntity>(body);
        }
        
        return new CepEntity();
    }
}