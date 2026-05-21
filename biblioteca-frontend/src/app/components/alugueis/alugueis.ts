import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AluguelService, Aluguel } from '../../services/aluguel';
import { LivroService, Livro } from '../../services/livro';

@Component({
  selector: 'app-alugueis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alugueis.html',
  styleUrl: './alugueis.css'
})
export class AlugueisComponent implements OnInit {
  alugueis: Aluguel[] = [];
  livros: Livro[] = [];
  mostrarFormulario = false;

  aluguelForm: Aluguel = {
    id: 0,
    livroId: 0,
    nomeLocatario: '',
    dataAluguel: ''
  };

  constructor(
    private aluguelService: AluguelService,
    private livroService: LivroService
  ) {}

  ngOnInit() {
    this.carregarAlugueis();
    this.carregarLivros();
  }

  carregarAlugueis() {
    this.aluguelService.getAlugueis().subscribe(alugueis => {
      this.alugueis = alugueis;
    });
  }

  carregarLivros() {
    this.livroService.getLivros().subscribe(livros => {
      this.livros = livros.filter(l => l.disponivel);
    });
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.aluguelForm = { id: 0, livroId: 0, nomeLocatario: '', dataAluguel: '' };
  }

  salvar() {
  this.aluguelForm.livroId = Number(this.aluguelForm.livroId);
  this.aluguelForm.dataAluguel = new Date().toISOString();
  this.aluguelService.criarAluguel(this.aluguelForm).subscribe({
    next: () => {
      this.carregarAlugueis();
      this.carregarLivros();
      this.mostrarFormulario = false;
    },
    error: (err) => {
      console.log('Erro detalhado:', err.error);
    }
  });
}

  devolver(id: number) {
    if (confirm('Confirmar devolução do livro?')) {
      this.aluguelService.devolverLivro(id).subscribe(() => {
        this.carregarAlugueis();
        this.carregarLivros();
      });
    }
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja excluir este aluguel?')) {
      this.aluguelService.deletarAluguel(id).subscribe(() => {
        this.carregarAlugueis();
        this.carregarLivros();
      });
    }
  }

  cancelar() {
    this.mostrarFormulario = false;
  }
}