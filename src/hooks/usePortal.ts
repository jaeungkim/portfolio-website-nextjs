import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function usePortal(id = 'modal-root') {
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent as HTMLElement || document.createElement('div');

    if (!existingParent) {
      parentElem.setAttribute('id', id);
      document.body.appendChild(parentElem);
    }

    rootElemRef.current = parentElem;

    return () => {
      if (!existingParent) {
        parentElem.remove();
      }
    };
  }, [id]);

  function PortalWrapper({ children }: { children: React.ReactNode }) {
    if (!rootElemRef.current) {
      return null;
    }
    return createPortal(children, rootElemRef.current);
  }

  return PortalWrapper;
}

export { usePortal };
