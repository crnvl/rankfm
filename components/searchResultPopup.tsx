"use client";

import { Album } from "@/types/lastFm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface SearchResultPopupProps {
  album: Album;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
}

export const SearchResultPopup = ({
  album,
  isOpen,
  onClose,
  onSelect,
}: SearchResultPopupProps) => {
  if (!isOpen) return null;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Is this the album you were looking for?
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center">
            <Image
              src={album.image[album.image.length - 1]["#text"]}
              alt={`${album.name} cover`}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">{album.name}</p>
            <p className="text-sm text-gray-500">by {album.artist}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSelect}>
            Yes, that's it!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
