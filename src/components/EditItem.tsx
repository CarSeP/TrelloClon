import TextareaAutosize from "react-textarea-autosize";
import { TypeItem } from "../interfaces/Task";
import { useEffect, useRef } from "react";

function EditItem({ item, editItem }: { item: TypeItem, editItem: (title: string, description: string) => void }) {

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const title = e.target.title.value.trim();
        const description = e.target.description.value.trim();

        editItem(title, description);
    };

    const onCancel = (e: any) => {
        e.preventDefault();
        editItem('', '')
    }

    useEffect(() => {
        const handleMouseLeave = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                editItem('', '')
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
                defaultValue={item.title}
                className="placeholder:text-red-600 text-lg resize-none px-4 w-full border-black border rounded-md"
                autoFocus
            />
            <label htmlFor="description">Description:</label>
            <TextareaAutosize
                id="description"
                name="description"
                defaultValue={item.description}
                minRows={2}
                className="placeholder:text-red-600 text-sm resize-none py-1 px-4 w-full border-black border rounded-md"
            />
            <button className="border border-black mt-1 py-1 px-2 rounded">Edit Item</button>
            <button onClick={onCancel} className="border border-black mt-1 py-1 px-2 rounded ml-2">Cancel</button>
        </form>
    );
}

export default EditItem;