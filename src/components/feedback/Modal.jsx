import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function Modal() {
  const { modalContent, closeModal } = useApp();
  const isOpen = !!modalContent;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div className="modal on" role="dialog" aria-modal="true">
      <div className="mbg" onClick={closeModal} />
      <div className="mcard">
        <button className="close2" onClick={closeModal} aria-label="Tutup">
          <svg width="15" height="15" viewBox="0 0 14 14" stroke="#145858" strokeWidth="1.8" fill="none">
            <path d="M2 2l10 10M12 2L2 12"/>
          </svg>
        </button>
        {modalContent}
      </div>
    </div>
  );
}
