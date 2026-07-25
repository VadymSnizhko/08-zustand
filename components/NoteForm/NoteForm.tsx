import css from './NoteForm.module.css'
import { CreateNote } from '@/types/note';
import { createNote } from '@/lib/api';
import * as Yup from 'yup';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: CreateNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3)
    .max(50)
    .required(),

  content: Yup.string().max(500),

  tag: Yup.string()
    .oneOf([
      'Todo',
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
    ])
    .required(),
});

const NoteForm = ({
  onClose,
}: NoteFormProps) => {


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      onClose();
    },
  });

  return (
    <Formik 
      initialValues={initialValues}
      validationSchema={
        validationSchema
      }
      onSubmit={values => {
        mutation.mutate(values);
      }}>
      <Form className={css.form}>
      <div className={css.formGroup}>
          <label htmlFor="title">
            Title
          </label>

          <Field
            id="title"
            name="title"
            className={css.input}
          />

          <ErrorMessage
            name="title"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">
            Content
          </label>

          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />

          <ErrorMessage
            name="content"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">
            Tag
          </label>

          <Field
            as="select"
            id="tag"
            name="tag"
            className={css.select}
          >
            <option value="Todo">
              Todo
            </option>

            <option value="Work">
              Work
            </option>

            <option value="Personal">
              Personal
            </option>

            <option value="Meeting">
              Meeting
            </option>

            <option value="Shopping">
              Shopping
            </option>
          </Field>

          <ErrorMessage
            name="tag"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={onClose}
            className={css.cancelButton}
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
      </Form>

    </Formik>
  );
};

export default NoteForm;