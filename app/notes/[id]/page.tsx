import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "./NoteDetails.client";

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const queryClient = new QueryClient();
  const { id } = await params; 
  
  const noteId = id; 

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails /> 
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
