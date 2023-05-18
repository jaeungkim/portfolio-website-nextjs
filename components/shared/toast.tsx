import React, { Fragment, PropsWithChildren } from "react";
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
  status = "success",
}: PropsWithChildren<Props>) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`flex justify-between items-center p-4 mb-8 max-w-xl mx-auto shadow-lg rounded-lg pointer-events-auto ${
          status === "success" ? "bg-green-400" : "bg-red-400"
        }`}
      >
        <div className="text-gray-700 font-medium">{children}</div>
        <XMarkIcon onClick={onClose} className="h-5 w-5 " />
      </div>
    </Transition>
  );
}
