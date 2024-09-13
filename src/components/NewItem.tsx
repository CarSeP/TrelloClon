import { useRef, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

function NewItem({ addItem }: { addItem: (title: string, description: string) => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [placeholder, setPlaceholder] = useState('')

  const onSubmit = (e: any) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    if (!title) {
      e.target.title.value = ""
      setPlaceholder('Enter a value')
    }
    if (!description) {
      e.target.description.value = ""
      setPlaceholder('Enter a value')
    }

    if (title && description) addItem(title, description);
  };

  const onFocusOut = () => {
    addItem('', '')
  };

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onFocusOut();
      }
    };

    document.addEventListener('mousedown', handleMouseLeave);
    return () => {
      document.removeEventListener('mousedown', handleMouseLeave);
    };
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="px-4"
    >
      <label htmlFor="title">Title:</label>
      <TextareaAutosize
        id="title"
        name="title"
        placeholder={placeholder}
        className="placeholder:text-red-600 text-lg resize-none px-4 w-full border-black border rounded-md"
        autoFocus
      />
      <label htmlFor="description">Description:</label>
      <TextareaAutosize
        id="description"
        name="description"
        placeholder={placeholder}
        minRows={2}
        className="placeholder:text-red-600 text-sm resize-none py-1 px-4 w-full border-black border rounded-md"
      />
      <button className="border border-black mt-1 py-1 px-2 rounded">Create Item</button>
    </form>
  );
}

export default NewItem;
