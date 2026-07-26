import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateNote } from "@/types/note";

const initialDraft: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: CreateNote;

  setDraft: (draft: Partial<CreateNote>) => void;

  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (draft) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...draft,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: "note-draft",

      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);