import '../css/alert.css';
export const AlertModal = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};