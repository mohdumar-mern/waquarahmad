'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body); // Mount modal in body
};

export default ModalPortal;
