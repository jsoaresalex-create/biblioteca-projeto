# BibliotecaAPI

API REST para gerenciamento de aluguel de livros, desenvolvida com ASP.NET Core e Entity Framework Core.

## Tecnologias

- C# / ASP.NET Core
- Entity Framework Core
- SQL Server

## Como rodar

### Pré-requisitos

- .NET 9 SDK instalado
- SQL Server instalado e rodando

### Passos

1. Clone o repositório
2. Abra o terminal na pasta do projeto
3. Execute as migrations para criar o banco de dados: dotnet ef database update
4. Rode a aplicação: dotnet run
5. Acesse a documentação da API em: http://localhost:5062/swagger
## Endpoints

### Livros
- GET /api/Livros — lista todos os livros
- GET /api/Livros/{id} — busca livro por ID
- POST /api/Livros — cadastra novo livro
- PUT /api/Livros/{id} — edita um livro
- DELETE /api/Livros/{id} — remove um livro

### Aluguéis
- GET /api/Alugueis — lista todos os aluguéis
- GET /api/Alugueis/{id} — busca aluguel por ID
- POST /api/Alugueis — registra novo aluguel
- PUT /api/Alugueis/{id}/devolver — registra devolução
- DELETE /api/Alugueis/{id} — remove um aluguel