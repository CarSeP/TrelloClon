import TrelloIcon from "./TrelloIcon";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-card">
      <div className="flex items-center gap-4">
        <a href="#" className="flex items-center gap-2">
          <TrelloIcon className="w-6 h-6" />
          <span className="w-24 text-lg font-semibold">Trello Clon</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
