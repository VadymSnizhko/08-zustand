'use client'

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { fetchNotes } from "@/lib/api"

import css from './NotesPage.module.css'

import SearchBox from "@/components/SearchBox/SearchBox"
import Pagination from "@/components/Pagination/Pagination"
//import Modal from "@/components/Modal/Modal"
//import NoteForm from "@/components/NoteForm/NoteForm"
import NoteList from "@/components/NoteList/NoteList"
import { NoteTag } from "@/types/note"

import Link from 'next/link'

type Props = {
  tag?: NoteTag;
};

const useDebounce = (
  value: string,
  delay: number,
) => {
  const [debouncedValue, setDebouncedValue] =
    useState<string>(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => clearTimeout(id)
  }, [value, delay])

  return debouncedValue;
};

const NotesClient = ({ tag }: Props) => {
  const [page, setPage] = useState<number>(1)

  const [search, setSearch] = useState<string>("")

  // const [isModalOpen, setIsModalOpen] =
  //   useState<boolean>(false);
  /*** */

  /*** */


  const debouncedSearch =
    useDebounce(search, 500)

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "notes",
      page,
      debouncedSearch,
      tag,
    ],

    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag,
      }),

    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error...</p>



  return (
    <>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={setSearch}
        />

        {data && data?.totalPages > 1 && (
          <Pagination
            currentPage={page - 1}
            totalPages={data.totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
        <Link
          href="/notes/action/create"
          className={css.button}
        >
          Create note +
        </Link>
      </div>

      <NoteList notes={data?.notes ?? []} />



    </>
  )
}

export default NotesClient