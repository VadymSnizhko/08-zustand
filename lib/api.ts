import axios from 'axios';
//import { useMutation } from '@tanstack/react-query';
import {type Note, type CreateNote, NoteTag} from '../types/note'

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: NoteTag; 
}

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
/*
export const getNote = async () => {
  const {data} = await axios.get<FetchNotesResponse>(BASE_URL, {
   headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })
  return data
}*/

//https://notehub-public.goit.study/api/notes?tag=Todo&page=1&perPage=10&sortBy=created
export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (
  newNote: CreateNote
): Promise<Note> => {
  const response = await axios.post<Note>(BASE_URL, newNote, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const deleteNote = async (
  noteId: string
): Promise<Note> => {
  const response = await axios.delete<Note>(
    `${BASE_URL}/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

//axios.defaults.baseURL = 'https://notehub-public.goit.study/api/notes'

export const getNoteItem = async (id:string): Promise<Note> => {
 const {data} = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })
 return data
}
/*
export const getTag = async (tag:string) => {
 const {data} = await axios.get<Note>(`${BASE_URL}/?tag=${tag}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })
 return data
}*/