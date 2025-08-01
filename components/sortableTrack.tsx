import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

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
      <div className="flex items-center justify-between px-4 py-2 rounded border min-h-12 hover:cursor-grabbing">
        <p className="text-sm font-medium w-full">
          <code className="block w-full ">{props.children}</code>
        </p>
        <GripVertical className="ml-2 text-secondary flex-shrink-0" />
      </div>
    </div>
  );
};
