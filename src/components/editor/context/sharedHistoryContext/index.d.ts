import type { HistoryState } from "@lexical/react/LexicalHistoryPlugin";

import { createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin";
import * as React from "react";
import { createContext, ReactNode, useContext, useMemo } from "react";

type ContextShape = {
  historyState?: HistoryState;
};

declare const Context: React.Context<ContextShape>;

export declare const SharedHistoryContext: ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

export declare const useSharedHistoryContext: () => ContextShape;