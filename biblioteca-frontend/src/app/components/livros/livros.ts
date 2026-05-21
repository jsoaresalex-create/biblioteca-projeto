import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LivroService, Livro } from '../../services/livro';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livros.html',
  styleUrl: './livros.css'
})
export class LivrosComponent implements OnInit {
  livros: Livro[] = [];
  mostrarFormulario = false;
  editando = false;

  livroForm: Livro = {
    id: 0,
    titulo: '',
    autor: '',
    disponivel: true
  };

  constructor(private livroService: LivroService) {}

  ngOnInit() {
    this.carregarLivros();
  }

  carregarLivros() {
    this.livroService.getLivros().subscribe(livros => {
      this.livros = livros;
    });
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.editando = false;
    this.livroForm = { id: 0, titulo: '', autor: '', disponivel: true };
  }

  editar(livro: Livro) {
    this.mostrarFormulario = true;
    this.editando = true;
    this.livroForm = { ...livro };
  }

  salvar() {
    if (this.editando) {
      this.livroService.editarLivro(this.livroForm.id, this.livroForm).subscribe(() => {
        this.carregarLivros();
        this.mostrarFormulario = false;
      });
    } else {
      this.livroService.criarLivro(this.livroForm).subscribe(() => {
        this.carregarLivros();
        this.mostrarFormulario = false;
      });
    }
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livroService.deletarLivro(id).subscribe(() => {
        this.carregarLivros();
      });
    }
  }

  cancelar() {
    this.mostrarFormulario = false;
  }
}