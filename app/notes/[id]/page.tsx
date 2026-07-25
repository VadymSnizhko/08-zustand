import css from "./NoteDetails.module.css"
import { getNoteItem } from "@/lib/api"
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client"
import {Metadata} from "next"

interface Props{
    params: Promise<{id:string}>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  console.log(id)
  const note = await getNoteItem(id)

  console.log(note.id)
  return {
    title: `${note.title}`,
    description: note.content.slice(0, 50),
      openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 50),
      url: `https://08-zustand-puce-kappa.vercel.app/notes/${note.id}`,
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

const NoteDetails = async ({params}:Props) => {

    const {id} = await params

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getNoteItem(id),
    });

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )

} 

export default NoteDetails