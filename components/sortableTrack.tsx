import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ITrack {
  id: number;
  children?: React.ReactNode;
}

export const SortableTrack = (props: ITrack) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="my-2 w-full"
    >
      <div className="flex items-center px-4 py-2 rounded border">
        <div className="rounded-full w-2 h-2 bg-secondary inline-block mr-2" />
        <p className="text-sm font-medium">
          <code>{props.children}</code>
        </p>
      </div>
    </div>
  );
};
