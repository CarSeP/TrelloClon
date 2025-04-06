import Sortable from "sortablejs";

const basicConfig = {
  animation: 200,
  ghostClass: "ghost",
  chosenClass: "chosen",
  dragClass: "drag",
  swapThreshold: 0.65,
  invertSwap: true,
  preventOnFilter: false,
  dragoverBubble: false,
  forceFallback: true,
};

export const cardsConfig = (
  moveCard: (a: number, b: number, c: number, d: number) => void
) => {
  return {
    ...basicConfig,
    group: "card",
    onEnd: function (evt: Sortable.SortableEvent) {
      if (evt.oldIndex == null || evt.newIndex == null || evt.from.id == null || evt.to.id == null) return;
      moveCard(Number(evt.from.id), Number(evt.to.id), evt.oldIndex, evt.newIndex);
    },
  };
};

export const columnConfig = (moveColumn: (a: number, b: number) => void) => {
  return {
    ...basicConfig,
    group: "column",
    onEnd: function (evt: Sortable.SortableEvent) {
      if (evt.oldIndex == null || evt.newIndex == null) return;
      moveColumn(evt.oldIndex, evt.newIndex);
    },
  };
};
