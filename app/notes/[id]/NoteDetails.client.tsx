"use client";

import css from "./NoteDetails.module.css";
import { HydrationBoundary } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type NoteDetailsProps = {
  dehydratedState: DehydratedState;
};

export default function NoteDetails({ dehydratedState }: NoteDetailsProps) {
  const params = useParams();
  const id = Number(params.id);

  return (
    <HydrationBoundary state={dehydratedState}>
      <InnerNoteDetails id={id} />
    </HydrationBoundary>
  );
}

const InnerNoteDetails = ({ id }: { id: number }) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
};