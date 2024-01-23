type func = () => void;

declare function mergeRegister(...func: Array<func>): () => void;