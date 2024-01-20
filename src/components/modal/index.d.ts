interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
  clickOutsideToClose?: boolean;
  anchorRef?: React.RefObject<HTMLElement>;
}

declare function Modal(props: ModalProps): JSX.Element;
export default Modal;