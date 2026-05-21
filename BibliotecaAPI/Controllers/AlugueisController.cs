using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BibliotecaAPI.Data;
using BibliotecaAPI.Models;

namespace BibliotecaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlugueisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlugueisController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aluguel>>> GetAlugueis()
        {
            return await _context.Alugueis.Include(a => a.Livro).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Aluguel>> GetAluguel(int id)
        {
            var aluguel = await _context.Alugueis.Include(a => a.Livro).FirstOrDefaultAsync(a => a.Id == id);
            if (aluguel == null) return NotFound();
            return aluguel;
        }

        [HttpPost]
        public async Task<ActionResult<Aluguel>> PostAluguel(Aluguel aluguel)
        {
            var livro = await _context.Livros.FindAsync(aluguel.LivroId);
            if (livro == null) return NotFound("Livro não encontrado.");
            if (!livro.Disponivel) return BadRequest("Livro não está disponível.");

            livro.Disponivel = false;
            aluguel.DataAluguel = DateTime.Now;

            _context.Alugueis.Add(aluguel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAluguel), new { id = aluguel.Id }, aluguel);
        }

        [HttpPut("{id}/devolver")]
        public async Task<IActionResult> DevolverLivro(int id)
        {
            var aluguel = await _context.Alugueis.Include(a => a.Livro).FirstOrDefaultAsync(a => a.Id == id);
            if (aluguel == null) return NotFound();

            aluguel.DataDevolucao = DateTime.Now;
            aluguel.Livro!.Disponivel = true;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAluguel(int id)
        {
            var aluguel = await _context.Alugueis.Include(a => a.Livro).FirstOrDefaultAsync(a => a.Id == id);
            if (aluguel == null) return NotFound();

            if (aluguel.Livro != null) aluguel.Livro.Disponivel = true;

            _context.Alugueis.Remove(aluguel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}