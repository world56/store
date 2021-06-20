export namespace Login {
  export type PubilcKey = string;

  export interface AccountSecret {
    account: string;
    password: string;
    expires?: boolean;
  }

  export interface RegisterUser extends AccountSecret {
    name: string;
    phone: string;
  }

  export interface UserInfo extends Omit<RegisterUser, "password"> {
    token: string;
    isSuper: string;
  }
}
