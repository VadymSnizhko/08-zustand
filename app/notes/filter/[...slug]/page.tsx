import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import {Metadata} from "next"

type Props = {
  params: Promise<{ slug: string[] }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  //console.log(slug[0])
  const tag = slug[0] === 'all' ? 'All' : (slug[0] as NoteTag);

  const desc = `Brows notes tagged with ${tag} tags. NoteHub allows filter and view notes based on specific tags for better organization`
  //console.log(tag)
  return {
    title: `Notes - ${tag} Tags`,
    description: desc,
      openGraph: {
      title: `Notes - ${tag} Tags`,
      description: desc,
      url: `https://08-zustand-puce-kappa.vercel.app/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'notehub.jpg',
          width: 1200,
          height: 630,
          alt: "Note Hub",
        },
      ]
    }
  }
}


const NotesPage = async ({params}: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : (slug[0] as NoteTag);
  const queryClient = new QueryClient();

  console.log(`function: ${tag}`)

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
};

export default NotesPage;