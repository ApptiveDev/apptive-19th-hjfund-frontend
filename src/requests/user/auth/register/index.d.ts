interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export declare const RegisterErrors: {
  INVALID_ARGUMENTS: string;
  EMAIL_ALREADY_EXISTS: string;
  UNKNOWN: string;
}


export declare async function POST(req: RegisterRequest): Promise<number>;