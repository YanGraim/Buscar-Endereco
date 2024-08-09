using System.Text.Json.Serialization;
using Endereco.Dominio.Entites;
using Newtonsoft.Json;

namespace Endereco.Servico.ViaCep;

public class ViaCepEnderecoService
{
    //Função assincrona que irá comunicar com o servidor da ViaCep
    public async Task<List<EnderecoEntity>> BuscarEnderecoPorEstadoCidade(string uf, string cidade)
    {
        //Abrindo uma comunicação de protocolo HTTP para comunicar com outro servidor
        var httpClient = new HttpClient();
        
        //Executando a operação de requisição para a rota da ViaCep, passando o CEP de forma dinâmica utilizando formatação de string
        var retornoRequisicao = await httpClient.GetAsync($"https://viacep.com.br/ws/{uf}/{cidade}/Rua/json/");

        if (retornoRequisicao.IsSuccessStatusCode)
        {
            var body = await retornoRequisicao.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<EnderecoEntity>>(body);
        }
        
        return new List<EnderecoEntity>();
    }
}