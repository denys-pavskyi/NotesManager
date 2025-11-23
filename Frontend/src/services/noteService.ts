import { apiClient } from "./apiClient.ts";
import type { Note } from "../types/note";

export const noteService = {
  async getAll(): Promise<Note[]> {
    const { data } = await apiClient.get<Note[]>("/Notes");
    return data;
  },

  async getById(id: string): Promise<Note> {
    const { data } = await apiClient.get<Note>(`/Notes/${id}`);
    return data;
  },

  async create(payload: { title: string; content: string }): Promise<Note> {
    const { data } = await apiClient.post<Note>("/Notes", payload);
    return data;
  },

  async update(id: string, payload: { title: string; content: string; createdAt: string; updatedAt?: string | null }): Promise<Note> {
    const { data } = await apiClient.put<Note>(`/Notes/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/Notes/${id}`);
  },
};
