import React, { useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function Modal({ children, open, onClose, title }: ModalProps) {
  function handleClose() {
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent) {
    e.stopPropagation();
    handleClose();
  }

  function handleModalClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <>
      {open && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            onClick={handleModalClick}
            className="relative bg-white p-4 rounded-lg w-1/2 h-1/2 overflow-auto"
          >
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="overflow-y-auto max-h-96">{children}</div>
            <button
              onClick={handleClose}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black px-4 py-2 rounded-lg text-white font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
