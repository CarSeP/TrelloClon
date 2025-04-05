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
import { Textarea } from "@/components/ui/textarea";
import { getDate } from "@/lib/formattedDate";
import { useBoardStore } from "@/store/boardStore";

interface Props {
  columnId: number;
  open: boolean;
  onClose: () => void;
}

export function AddCardDialog({ columnId, open, onClose }: Props) {
  const { addCard } = useBoardStore((state) => state);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    if (!title) {
      e.target.title.focus();
      return;
    }

    const description = e.target.description.value.trim();
    if (!description) {
      e.target.description.focus();
      return;
    }

    addCard(columnId, {
      id: Date.now(),
      title,
      description,
      date: getDate()
    })
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter card title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter card description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
