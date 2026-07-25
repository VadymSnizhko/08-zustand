'use client'

import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { useParams,useRouter } from 'next/navigation';
import { getNoteItem } from "@/lib/api"

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteItem(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const rawDate = note.updatedAt || note.createdAt;
  //const label = note.updatedAt ? "Updated at" : "Created at";

    const router = useRouter();

    const back = () => router.back();
  const formattedDate = `${new Date(rawDate).toLocaleString()}`
    return (
      <div className={css.container}>
	    <div className={css.item}>
                        <button className={css.backBtn} onClick={back}>Back</button>
	        <div className={css.header}>
	            <h2>{note.title}</h2>
	        </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content }</p>
            <p className={css.date}>{formattedDate}</p>
	    </div>
    </div>      
    )
}

export default NoteDetailsClient