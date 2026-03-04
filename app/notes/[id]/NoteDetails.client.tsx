'use client'

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetailsClient.module.css";

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>();
    const noteId = Number(id);
    console.log("paramId", noteId);

    const { data: note, isLoading, error} = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false,
    });

    console.log("note", note);

    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
        <div className={css.item}>
                <div className={css.noteHeader}>
                    <h2>{note.title}</h2>
                    <button className={css.editBtn}>Edit note</button>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.createdAt}</p>
            </div> 
        </div>
    );
}

export default NoteDetailsClient;