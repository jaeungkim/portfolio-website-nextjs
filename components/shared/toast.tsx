import React, { PropsWithChildren } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  show: boolean;
  onClose: () => void;
  status: "success" | "danger"; // New prop
}

export default function Toast({
  show,
  onClose,
  children,
  status = "success", // Default value is "success"
}: PropsWithChildren<Props>) {
  const containerClass = `flex justify-between items-center p-4 w-full bg-white shadow-lg rounded-lg pointer-events-auto ${
    status === "success" ? "bg-green-400" : "bg-red-400"
  }`;
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className={containerClass}>
        <div className="text-gray-700 font-medium">{children}</div>
        <XMarkIcon onClick={onClose} className="h-5 w-5 cursor-pointer" />
      </div>
    </Transition>
  );
}
