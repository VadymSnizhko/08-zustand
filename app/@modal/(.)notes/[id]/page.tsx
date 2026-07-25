import css from "./NoteDetails.module.css"
import { getNoteItem } from "@/lib/api"
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query"
import NotePreview from "./NotePreview.client"


interface Props{
    params: Promise<{id:string}>
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
      <NotePreview />
    </HydrationBoundary>

  )

} 

export default NoteDetails