"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { FetchNotesResponse } from "@/lib/api";
import { Note } from "@/types/note";

type NotesProps = {
  notes: Note[];
  totalPages: number;
};

function Notes({ notes, totalPages }: NotesProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes(debouncedQuery, page),
    // enabled: debouncedQuery !== "",
    placeholderData: keepPreviousData,
    initialData:
      page === 1 && debouncedQuery === "" ? { notes, totalPages } : undefined!,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
      {data?.notes.length === 0 && <p>No notes found</p>}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Notes;