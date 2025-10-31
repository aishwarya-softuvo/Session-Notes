import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase/client';
import { SessionNote, SessionNoteInput } from '../types/sessionNote';

interface UseSessionNotesReturn {
  notes: SessionNote[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  addNote: (note: SessionNoteInput) => Promise<SessionNote | null>;
  deleteNote: (id: string) => Promise<boolean>;
}

export function useSessionNotes(): UseSessionNotesReturn {
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('session_notes')
        .select('*')
        .order('session_date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setNotes(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch notes';
      setError(errorMessage);
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addNote = useCallback(async (note: SessionNoteInput): Promise<SessionNote | null> => {
    try {
      setError(null);

      const { data, error: insertError } = await supabase
        .from('session_notes')
        .insert([note])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      if (data) {
        setNotes((prevNotes) => [data, ...prevNotes]);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add note';
      setError(errorMessage);
      console.error('Error adding note:', err);
      return null;
    }
  }, []);

  const deleteNote = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('session_notes')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete note';
      setError(errorMessage);
      console.error('Error deleting note:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    addNote,
    deleteNote,
  };
}

