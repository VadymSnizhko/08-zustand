import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteList.module.css";

import { Note } from "@/types/note";
import { deleteNote } from "@/lib/api"

interface NoteListProps {
  notes: Note[];
};

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote, 
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"], 
      });
    },
    onError: (error) => {
      console.error("Помилка при видаленні:", error);
      alert("Не вдалося видалити нотатку. Спробуйте ще раз.");
    }
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <Link href={`/notes/${note.id}`}>
            <h2 className={css.title}>{note.title}</h2>
          </Link>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            {}
            <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
            <button 
              className={css.button}
              disabled={mutation.isPending}
              onClick={() => {
                if (confirm("Ви впевнені, що хочете видалити цю нотатку?")) {
                  mutation.mutate(note.id);
                }
              }}
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};;

export default NoteList;
