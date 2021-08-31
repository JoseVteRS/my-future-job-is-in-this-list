import CloseIcon from '../Icons/close-icon';

const Modal = ({
  children,
  state,
  setState,
  title = 'Crear una oferta',
  showHeader,
  stylesComponent = 'p-0',
  stylesHeader = 'p-0',
}) => {
  return (
    <>
      {state && (
        <div className="overlay">
          <div className={`modal-component ${stylesComponent}`}>
            {showHeader && (
              <div className={`${stylesHeader}`}>
                <h3 className="title">{title}</h3>
              </div>
            )}

            <button
              className="button-modal__close bg-gray-200 hover:bg-gray-300 flex justify-center items-center "
              onClick={() => setState(false)}
            >
              <CloseIcon className="h-6 w-6 text-gray-700" />
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
