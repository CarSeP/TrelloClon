import { useEffect, useState } from "react";

import Header from "./components/Header";
import Column from "./components/Column";
import AddColumn from "./components/AddColumn";

import { Task } from "./interfaces/Task";

function App() {
  const [listItems, setListItems] = useState<Task[]>([]);
  const KeyLocalStorage = 'dataItems';

  const getID = (array: any[]): number => {
    if (array.length === 0) {
      return 1;
    }

    const maxId = Math.max(...array.map(item => item.id));
    return maxId + 1;
  }

  const getDate = (): string => {
    const date = new Date();
    const day = date.getDay()
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateFormat = [day, month, year].join("/")
    return dateFormat;
  }

  const handleAddColumn = (title: string) => {
    setData(listItems.concat({ id: getID(listItems), title: title.trim(), items: [] }));
  };

  const handleEditColumn = (id: number, title: string) => {
    title = title.trim()
    if (title)
      setData(
        listItems.map((el) => {
          if (el.id === id) el.title = title;
          return el;
        })
      );
  };

  const handleDeleteColumn = (id: number) => {
    const value = confirm(`Do you really want to eliminate the column?`);
    if (value) setData(listItems.filter((el) => el.id != id));
  };

  const handleAddItem = (id: number, title: string, description: string) => {
    if (id && title && description) {
      const newListItems = listItems.map((el) => {
        if (el.id === id) {
          el.items = [...el.items, { id: getID(el.items), title, description, date: getDate() }]
        }
        return el
      })
      setData(newListItems)
    }
  };


  const handleDeleteItem = (idColumn: number, idItem: number) => {
    const value = confirm('Do you really want to eliminate the item?')

    if (value) {
      const newListItems = listItems.map(el => {
        if (el.id === idColumn) el.items = el.items.filter(el => el.id !== idItem)
        return el
      })
      setData(newListItems)
    }
  }


  const handleEditItem = (idColumn: number, idItem: number, title: string, description: string) => {
    if (title.trim()) {
      const newListItems = listItems.map(el => {
        if (el.id === idColumn) el.items = el.items.map(el => {
          if (el.id === idItem) el.title = title, el.description = description
          return el
        })
        return el
      })
      setData(newListItems)
    }
  }

  const setData = (data: Task[]) => {
    setListItems(data)
    localStorage.setItem(KeyLocalStorage, JSON.stringify(data))
  }

  const getData = () => {
    const data = localStorage.getItem(KeyLocalStorage)
    if (data) setListItems(JSON.parse(data))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className="h-screen w-full bg-background">
      <Header />
      <main>
        <section className="flex gap-4 p-4">
          {listItems.map((el) => (
            <article key={el.id}>
              <Column
                item={el}
                deleteColumn={handleDeleteColumn}
                editColumn={handleEditColumn}
                addItem={handleAddItem}
                deleteItem={handleDeleteItem}
                editItem={handleEditItem}
              />
            </article>
          ))}
          <article>
            <AddColumn addColumn={handleAddColumn} />
          </article>
        </section>
      </main>
    </main>
  );
}

export default App;
