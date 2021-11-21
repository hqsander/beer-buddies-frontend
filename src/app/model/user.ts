export class User {
  public id: number | undefined;
  public userId: string | undefined;
  public nome: string;
  public sobrenome: string;
  public email: string;
  public urlAvatar: string | undefined;
  public dataAcesso: Date | undefined;
  public dataCriacao: Date | undefined;
  public password: string | undefined;
  public username: string;
  public role: string;
  public authorities: [];
  public isEnabled: boolean;
  public isAccountNonLocked: boolean;

  constructor() {
    this.nome = '';
    this.sobrenome = '';
    this.email = '';
    this.username = '';
    this.role = '';
    this.authorities = [];
    this.isEnabled = false;
    this.isAccountNonLocked = false;
  }
}
