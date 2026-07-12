import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toastMsg, toastVisible } = useApp();
  return (
    <div className={`toast${toastVisible ? ' on' : ''}`} role="status" aria-live="polite">
      {toastMsg}
    </div>
  );
}
