# Consulta de Endereços

Este projeto é uma aplicação web que permite a consulta de endereços por CEP e por Estado/Cidade. O backend foi desenvolvido em C# com uma API que consome a API do ViaCEP. O frontend foi criado utilizando HTML5, CSS3 e JavaScript para consumir a API desenvolvida.

## Estrutura de Pastas

desafio ->
 * front/ # Código do frontend (HTML5, CSS3, JavaScript)
 * back/ # Código do backend (C#, ASP.NET Core)

## Tecnologias Utilizadas

### Backend
- **C#**
- **ASP.NET Core**
- **API ViaCEP**

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript**

## Funcionalidades

- **Consulta por CEP:** Permite ao usuário buscar informações detalhadas de um endereço através do CEP.
- **Consulta por Estado/Cidade:** Permite ao usuário buscar endereços com base no estado e na cidade informados.

## Como Executar o Projeto

### Pré-requisitos

- .NET SDK
- Navegador Web

### Backend

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
2. Navegue até a pasta do projeto backend:

    ```bash
    cd desafio/back
3. Execute o projeto:
    ```bash
    dotnet run
4. A API estará disponível em: https://localhost:7059

### Frontend
1. Navegue até a pasta do projeto frontend:

    ```bash
    cd desafio/front

2. Abra o arquivo index.html em um navegador.

## Uso
### Consulta por CEP
1. Insira o CEP no campo de busca.
2. Clique no botão "Pesquisar".
3. Os detalhes do endereço serão exibidos na página.

### Consulta por Estado/Cidade
1. Selecione um estado na lista.
2. Insira a cidade no campo correspondente.
3. Clique no botão "Pesquisar".
4. Os endereços serão listados na página.
## Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Autor
* Yan Graim
