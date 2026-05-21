namespace BibliotecaAPI.Models
{
    public class Aluguel
    {
        public int Id { get; set; }
        public int LivroId { get; set; }
        public Livro? Livro { get; set; }
        public string NomeLocatario { get; set; } = string.Empty;
        public DateTime DataAluguel { get; set; } = DateTime.Now;
        public DateTime? DataDevolucao { get; set; }
    }
}