export interface LoginRequest {
  email: string;
  password: string;
}

export declare const LoginErrors: {
  INVALID_ARGUMENTS: string;
  INVALID_CREDENTIALS: string;
  UNKNOWN: string;
}

export declare async function postLogin(req: LoginRequest): Promise<number>;
