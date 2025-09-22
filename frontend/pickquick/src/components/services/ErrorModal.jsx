import { useState, Fragment, forwardRef, useImperativeHandle } from "react";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const ErrorModal = forwardRef(({ children }, ref) => {
  // Variables
  //   const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  //   useEffect(() => {
  //     if (isOpen) {
  //           }
  //   }, [isOpen]);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999999]" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="max-w-md p-4 text-left align-middle rounded-xl bg-background-light dark:bg-slate-900 shadow-xl transform overflow-hidden transition-all">
                <div className="relative w-full">
                  <p className="w-full p-2 bg-background-light dark:bg-slate-800 text-center text-slate-900 dark:text-slate-100 placeholder:text-slate-600 placeholder:dark:text-slate-400 border border-gray-400/60 dark:border-slate-700 focus:!border-blue-500 outline-none rounded-md transition-all duration-300">
                    {children}
                  </p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

ErrorModal.displayName = "ErrorModal";
export default ErrorModal;
