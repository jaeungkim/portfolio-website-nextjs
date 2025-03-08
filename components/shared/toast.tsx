import { Fragment, PropsWithChildren } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface ToastProps {
  show: boolean;
  onClose: () => void;
  status?: "success" | "danger";
}

export default function Toast({ show, onClose, children, status = "success" }: PropsWithChildren<ToastProps>) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition duration-400 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition duration-200 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        className={clsx(
          "flex justify-between items-center p-4 mb-8 max-w-xl mx-auto shadow-lg rounded-lg pointer-events-auto",
          status === "success" ? "bg-green-400 text-white" : "bg-red-400 text-white"
        )}
      >
        <div className="font-medium">{children}</div>
        <button onClick={onClose} className="ml-4">
          <XMarkIcon className="h-5 w-5 cursor-pointer" aria-label="Close toast" />
        </button>
      </div>
    </Transition>
  );
}
