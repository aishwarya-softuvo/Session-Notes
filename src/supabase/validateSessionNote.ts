import { supabase } from './client';
import { SessionNoteInput, ValidationResponse } from '../types/sessionNote';

export async function validateSessionNote(
  noteData: SessionNoteInput
): Promise<ValidationResponse> {
  try {
    const { data, error } = await supabase.functions.invoke<ValidationResponse>(
      'validate-session-note',
      {
        body: noteData,
      }
    );

    if (error) {
      console.error('Edge function error:', error);
      return {
        valid: false,
        error: 'Validation service unavailable. Please try again later.',
      };
    }

    return data || { valid: false, error: 'Invalid response from validation service' };
  } catch (err) {
    console.error('Validation error:', err);
    return {
      valid: false,
      error: 'Failed to validate session note. Please try again.',
    };
  }
}

