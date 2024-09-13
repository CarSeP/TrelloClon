import TextareaAutosize from "react-textarea-autosize";

function editColumn({title,actions} : {title: string,actions:any}) {
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") actions.edit(e.target.value);
  };

  const onBlur = (e: any) => actions.edit(e.target.value);

  return (
    <div className="w-96 inline-block rounded-md shadow border">
      <header className="flex justify-between px-4 py-3 border-b">
        <TextareaAutosize
          onKeyDown={onKeyPress}
          onBlur={onBlur}
          defaultValue={title}
          className="w-full resize-none text-lg font-medium px-4"
          autoFocus
        />
      </header>
    </div>
  );
}

export default editColumn;
