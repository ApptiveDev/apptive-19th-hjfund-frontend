import { HTMLAttributes, PropsWithChildren } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
  clickOutsideToClose?: boolean;
  anchorRef?: React.RefObject<HTMLElement>;
}

type DivProps = HTMLAttributes<HTMLDivElement>;
type DivWithChildrenProps = PropsWithChildren<DivProps>;

interface ModalTitleProps extends DivProps {
  title: string;
}

declare function ModalTitle(props: ModalTitleProps): JSX.Element;
declare function ModalContent(props: DivWithChildrenProps): JSX.Element;
declare function ModalFooter(props: DivWithChildrenProps): JSX.Element;

declare function Modal(props: ModalProps): JSX.Element;
export default Modal;
