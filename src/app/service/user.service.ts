import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public criar(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/criar`, formData);
  }

  public listar(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/listar`);
  }

  public atualizar(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/atualizar`, formData);
  }

  public excluir(username: string): Observable<any | HttpErrorResponse> {
    return this.http.delete<any>(`${this.host}/user/excluir/${username}`);
  }

  public redefinirSenha(email: string): Observable<any | HttpErrorResponse> {
    return this.http.get(`${this.host}/user/redefinirSenha/${email}`);
  }

  public atualizarAvatar(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/atualizarAvatar`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public criarUserFormData(usernameLogado: string, user: User, avatar: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', usernameLogado);
    formData.append('nome', user.nome);
    formData.append('sobrenome', user.sobrenome);
    formData.append('email', user.email);
    formData.append('avatar', avatar);
    formData.append('role', user.role);
    formData.append('isEnabled', JSON.stringify(user.isEnabled));
    formData.append('isAccountNonLocked', JSON.stringify(user.isAccountNonLocked));
    formData.append('username', user.username);
    return formData;
  }
}
