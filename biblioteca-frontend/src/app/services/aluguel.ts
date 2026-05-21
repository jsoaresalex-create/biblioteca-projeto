import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './livro';

export interface Aluguel {
  id: number;
  livroId: number;
  livro?: Livro;
  nomeLocatario: string;
  dataAluguel: string;
  dataDevolucao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AluguelService {
  private apiUrl = 'http://localhost:5062/api/Alugueis';

  constructor(private http: HttpClient) {}

  getAlugueis(): Observable<Aluguel[]> {
    return this.http.get<Aluguel[]>(this.apiUrl);
  }

  criarAluguel(aluguel: Aluguel): Observable<Aluguel> {
    return this.http.post<Aluguel>(this.apiUrl, aluguel);
  }

  devolverLivro(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/devolver`, {});
  }

  deletarAluguel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}