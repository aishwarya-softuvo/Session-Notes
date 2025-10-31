export interface SessionNote {
  id: string;
  client_name: string;
  session_date: string;
  notes: string;
  duration: number;
  created_at: string;
}

export interface SessionNoteInput {
  client_name: string;
  session_date: string;
  notes: string;
  duration: number;
}

export interface ValidationResponse {
  valid: boolean;
  error?: string;
}

