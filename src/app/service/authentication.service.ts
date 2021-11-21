import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string | null | undefined;
  private usernameLogado: string | null | undefined;
  private JwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/user/login`, user, {
      observe: 'response',
    });
  }

  public cadastrar(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(`${this.host}/user/login`, user);
  }

  public logout(): void {
    this.token = null;
    this.usernameLogado = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  public carregarToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string | null | undefined {
    return this.token;
  }

  public setTokenLocalStorage(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public getUserLocalStorage(): User | null {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public setUserLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isLoggedIn(): boolean {
    this.carregarToken();
    var sub;

    if (this.token != null && this.token !== '') {
      sub = this.JwtHelper.decodeToken(this.token).sub;

      if (sub != null && sub !== '' && !this.JwtHelper.isTokenExpired(this.token)) {
        this.usernameLogado = sub;
        return true;
      }
    }

    this.logout();
    return false;
  }
}
