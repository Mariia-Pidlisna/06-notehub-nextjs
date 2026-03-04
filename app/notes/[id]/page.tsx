import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "./NoteDetails.client";

type NoteDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;
  const noteId = Number(id);

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return <NoteDetails dehydratedState={dehydrate(queryClient)} />;
};

export default NoteDetailsPage;