export type AuthState =
  | {
      isInitialised: false;
    }
  | {
      isInitialised: true;
      isAuthenticated: false;
    }
  | {
      isInitialised: true;
      isAuthenticated: true;
      username: string;
    };
