export class UserDto {
  Login: string;

  constructor(login: string) {
    this.Login = login;
    console.log('UserDto created', this.Login);
  }
}
