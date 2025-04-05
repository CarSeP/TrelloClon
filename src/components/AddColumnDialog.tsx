import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoardStore } from "@/store/boardStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AddColumnDialog({ open, onClose }: Props) {
  const { addColumn } = useBoardStore((state) => state);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.target.title.focus();
    const title = e.target.title.value.trim();

    if (!title) return;

    addColumn({
      title,
      id: Date.now(),
      cards: [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Column</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Column Title</Label>
              <Input
                id="title"
                name="title "
                placeholder="Enter column title"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Column</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
