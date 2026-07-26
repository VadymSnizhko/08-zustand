'use client';

import css from './NoteForm.module.css'
import { CreateNote } from '@/types/note';
import { createNote } from '@/lib/api';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

const NoteForm = () => {


  const queryClient = useQueryClient();

  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleSubmit = (formData: FormData) => {
    //const values = Object.fromEntries(formData) as unknown as CreateNote;
    const values: CreateNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as CreateNote["tag"],
    };


    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      clearDraft();

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      router.push("/notes/filter/all");
    },
  });

  return (
    <form className={css.form}
      action={handleSubmit}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={(e) =>
            setDraft({
              title: e.target.value,
            })
          }
        />

      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">
          Content
        </label>

        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={(e) =>
            setDraft({
              content: e.target.value,
            })
          }
        />

      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">
          Tag
        </label>

        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={(e) =>
            setDraft({
              tag: e.target.value as CreateNote["tag"],
            })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;