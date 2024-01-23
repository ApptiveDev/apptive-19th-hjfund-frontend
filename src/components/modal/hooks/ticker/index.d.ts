interface tickerModalProps {
  initialCodes?: string[];
  onConfirm?: (codes: string[]) => void;
  multiple?: boolean;
  confirmButtonLabel?: string;
}

export declare function useTickerModal(
  props: tickerModalProps
): [JSX.Element, () => void, () => void];