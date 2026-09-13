declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: "SEEKER" | "EMPLOYER";
      };
    }
  }
}

export {};