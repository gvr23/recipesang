export class User {
  public email: string;
  public id: string;
  private _token: string;
  private _tokenExpirationDate: Date;

  constructor(email: string, id: string, token: string, tokenExpirationDate: Date) {
    this.email = email;
    this.id = id;
    this._token = token;
    this._tokenExpirationDate = tokenExpirationDate;
  }


  get token(): string {
    if (!this._token || new Date() > this.tokenExpirationDate) { return null; }
    return this._token;
  }
  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
