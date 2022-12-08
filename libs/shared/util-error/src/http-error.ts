export type AppError = NOCError | HTTPError | null;

export interface HTTPError extends NOCError {
  status?: number;
  statusText?: string;
  url?: string;
}

export interface NOCError {
  message: string;
}
