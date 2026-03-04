import axios from "axios"
import { type NewNote, type Note } from "../types/note";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
    notes: Note[],
    totalPages: number,
}

const perPage = 12;

export const fetchNotes = async (query: string, page: number): Promise<NotesResponse> => {
    const res = await axios.get<NotesResponse>("https://notehub-public.goit.study/api/notes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            ...(query !== ""? {search: query} : {}),
            page,
            perPage
        }
    })
    return res.data;
}

export const createNote = async (postNote: NewNote): Promise<Note> => {
    const res = await axios.post<Note>("https://notehub-public.goit.study/api/notes", postNote, {
        headers: {
            Authorization: `Bearer ${token}`,
        },  
    })
    return res.data;
}

export const deleteNote = async (id: number): Promise<Note> => {
    const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}

export const fetchNoteById = async (id: number): Promise<Note> => {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};