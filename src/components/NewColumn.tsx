import TextareaAutosize from "react-textarea-autosize";

function NewColumn({createColunm} : {createColunm: (title: string) => void}) {
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") createColunm(e.target.value)
  };

  const onBlur = (e: any) => createColunm(e.target.value)

  return (
    <div className="w-96 inline-block rounded-md shadow border">
      <header className="flex justify-between px-4 py-3 border-b">
        <TextareaAutosize
          onKeyDown={onKeyPress}
          onBlur={onBlur}
          className="w-full resize-none text-lg font-medium px-4"
          autoFocus
        />
      </header>
    </div>
  );
}

export default NewColumn;
