"use client"

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { getNoteItem } from "@/lib/api"
import css from "./NotePreview.module.css"
import modaCss from '@/components/Modal/Modal.module.css'
import Modal from '@/components/Modal/Modal';


type Props = {
    children: React.ReactNode;
};

const NotePreview = () => {
    /*const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => getNoteItem(id),
        refetchOnMount: false,
    });


    const router = useRouter();

    const back = () => router.back();
    return (
        <div className={modaCss.backdrop}>
            <div className={modaCss.modal}>
                <div className={css.container}>
                    <div className={css.item}>
                        <button className={css.backBtn} onClick={back}>Back</button>
                        <h2 className={css.header}>{note?.title}</h2>
                        <p className={css.tag}>{note?.tag}</p>
                        <p className={css.content}>{note?.content}</p>
                        <p className={css.date}>{note?.createdAt}</p>

                    </div>
                </div>
            </div>
        </div>)*/
    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => getNoteItem(id),
        refetchOnMount: false,
    });
    const router = useRouter();

    const back = () => router.back();

    if (isLoading) {
        return (
            <Modal isOpen={true} onClose={back}>
                <p>Loading...</p>
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal isOpen={true} onClose={back}>
                <p>Failed to load note.</p>
            </Modal>
        );
    }

    if (!note) {
        return (
            <Modal isOpen={true} onClose={back}>
                <p>Note not found.</p>
            </Modal>
        );
    }

    return (
        <Modal isOpen={true} onClose={back}>
            <div className={css.container}>
                <div className={css.item}>
                    <button className={css.backBtn} onClick={back}>
                        Back
                    </button>

                    <h2 className={css.header}>{note?.title}</h2>
                    <p className={css.tag}>{note?.tag}</p>
                    <p className={css.content}>{note?.content}</p>
                    <p className={css.date}>{note?.createdAt}</p>
                </div>
            </div>
        </Modal>
    );
}

export default NotePreview