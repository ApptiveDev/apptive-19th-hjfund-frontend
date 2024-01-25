export declare const UserErrors: {
  NOT_LOGGED_IN: string;
}

export interface User {
  id: number;
  nickName: string;
  profile: {
    id: number;
    bio: string | null;
    photo: string | null;
    phone: string | null;
  }
  roles: string;
  uid: string;
}

export declare function getUser(): Promise<User>;