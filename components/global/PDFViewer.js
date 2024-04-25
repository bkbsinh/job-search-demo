"use client";

import React, { useState } from 'react';
import { MdPictureAsPdf } from "react-icons/md";

const PDFViewer = ({ pdfUrl }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
        <div className="py-3 flex items-center space-x-3 w-fit cursor-pointer" onClick={openModal}>
          <MdPictureAsPdf className="w-[30px] h-[30px]" />
          <span className="font-semibold text-slate-700">Lebenslauf</span>
        </div>
        {modalOpen && (
            <div className="absolute top-0">
                <div className="modal-content">
                    <span className="cursor-pointer" onClick={closeModal}>
                        &times;
                    </span>
                    <iframe
                        src={pdfUrl}
                        title="PDF Viewer"
                        className='w-[80vh] h-[80vh]'
                        frameborder="0"
                    />
                </div>
            </div>
        )}
    </>
  );
};

export default PDFViewer;
