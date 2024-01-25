import { PropsWithChildren } from "react";
import { User } from "@/requests/user";

interface AuthContextObject {
  user: User | null;
  isLoggedIn: boolean;
  refresh: () => Promise<User>;
  logout: () => void;
}

declare const AuthContext: React.Context<AuthContextObject>;

export declare function AuthProvider(props: PropsWithChildren): JSX.Element;
export declare function useAuth(): AuthContextObject;