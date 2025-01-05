import useScrollLock from "@/hooks/useScrollLock";
import { ReactElement, useEffect, useRef } from "react";

export const Dialog = ({
  children,
  showDialog,
}: {
  children: ReactElement[];
  showDialog: boolean;
}) => {
  const dialog = useRef<HTMLDialogElement>(null);
  useScrollLock();

  useEffect(() => {
    if (showDialog) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [showDialog]);

  return (
    <dialog
      className="w-5/6 aspect-auto h-5/6 md:aspect-video rounded-xl"
      ref={dialog}
    >
      {children}
    </dialog>
  );
};
