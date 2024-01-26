const { createContext, useState, useContext } = require("react");


const Context = createContext({});

export const MetadataContextProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({
    title: "",
    ticker: undefined,
    thumb: null,
  });

  return (
    <Context.Provider value={[metadata, setMetadata]}>
      {children}
    </Context.Provider>
  );
}

export const useMetadataContext = () => {
  return useContext(Context);
};