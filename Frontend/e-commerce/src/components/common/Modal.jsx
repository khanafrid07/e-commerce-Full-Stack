export default function Modal({
    id = "modal",
    title = "",
    description = "Please confirm this action",
    onConfirm,
    onClose,
    trigger
}) {
    const openModal = () => {
        document.getElementById(id)?.showModal();
    };

    const closeModal = () => {
        document.getElementById(id)?.close();
        onClose?.();
    };

    const handleConfirm = () => {
        onConfirm?.();
        closeModal();
    };

    return (
        <>

            {trigger ? (
                <span onClick={openModal}>{trigger}</span>
            ) : (
                <button className="btn" onClick={openModal}>
                    Open
                </button>
            )}

            {/* Modal */}
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{description}</p>

                    <div className="modal-action">
                        <button onClick={closeModal} className="btn">
                            Cancel
                        </button>

                        <button onClick={handleConfirm} className="btn btn-error">
                            Yes
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}