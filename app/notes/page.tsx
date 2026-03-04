import { fetchNotes, NotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function Notes() {  
    const initialSearch = "";
    const initialPage = 1;

    const initialData: NotesResponse = await fetchNotes(initialSearch, initialPage);
    
    return <>
        <NotesClient initialData={initialData} initialPage={initialPage} initialSearch={initialSearch} />
    </>
}