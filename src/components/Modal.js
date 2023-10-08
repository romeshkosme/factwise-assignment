import CLOSEICON from "../assets/close.svg";
import { createPortal } from "react-dom";

function Modal({title, children, onClose, onDelete}) {
    return createPortal(
        <>
            <div className="modal-backdrop">
                <div className="modal">
                    <div className="modal-header">
                        <p>
                            {title}
                        </p>
                        <span
                            className="cursor-pointer"
                            onClick={onClose}
                        >
                            <img
                                src={CLOSEICON}
                                alt="close icon"
                            />
                        </span>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button className="btn cancel-btn" onClick={onClose}>Cancel</button>
                        <button className="btn delete-btn" onClick={() => onDelete()}>Delete</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default Modal;