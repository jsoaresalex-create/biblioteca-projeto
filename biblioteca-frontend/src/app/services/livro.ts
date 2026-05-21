import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = 'http://localhost:5062/api/Livros';

  constructor(private http: HttpClient) {}

  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  getLivro(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  criarLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  editarLivro(id: number, livro: Livro): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, livro);
  }

  deletarLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}