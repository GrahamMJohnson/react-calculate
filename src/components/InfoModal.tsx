type InfoModalProps = {
  show: boolean;
  onClose: () => void;
};

const InfoModal = ({ show, onClose }: InfoModalProps) => {
  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex={-1} style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Calculator Info</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>This is a simple calculator built with React and Bootstrap.</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;