import { Creds } from './../enums/Login.enum';

export default class VerifyLoginService {

  public errorLogin(login: string, password: string): string | undefined {
     if (login !== Creds.value || password !== Creds.value) {
      return 'Invalid Login'
     }
  }

}

