import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import type { NoteTag } from "../../types/note";

const tagOptions: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Maximum 500 characters"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(tagOptions, "Invalid tag")
    .required("Tag is required"),
});

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag | "";
}

interface NoteFormProps {
  onCancel: () => void;
}

function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    { resetForm }: FormikHelpers<NoteFormValues>
  ) => {
    mutate(
      {
        title: values.title,
        content: values.content,
        tag: values.tag as NoteTag,
      },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <Form className={css.form}>
          {/* Title field */}
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          {/* Content field */}
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
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

          {/* Tag field */}
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="">Select tag</option>
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          {/* Form actions */}
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending || !isValid}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;