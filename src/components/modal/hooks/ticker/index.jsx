import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./styles.module.scss";
import Textfield from "@/components/textfield";
import Button from "@/components/button";
import { getStocks } from "@/requests/stock/stocks";
import Modal from "../..";
import Boolean from "@/components/boolean";
import LoadingLayer from "@/components/loading";

function TickerItemComponent({ code, name, isSelected, onChange, multiple }) {
  return (
    <div className={styles.item} onClick={() => onChange(!isSelected)}>
      {
        <Boolean
          booleanType={multiple ? "checkbox" : "radio"}
          checked={isSelected}
          onChange={() => onChange(!isSelected)}
          name="ticker"
          value={code}
        />
      }
      <div className={styles.texts}>
        <div className={styles.name}>{name}</div>
        <div className={styles.code}>{code}</div>
      </div>
    </div>
  );
}

function TickerModalComponent({
  initialCodes = [],
  isOpen,
  onConfirm = (_codes = []) => {},
  onDismiss = () => {},
  multiple = true,
  confirmButtonLabel = "선택",
}) {
  const listRef = useRef(null);

  const [selectedCodes, setSelectedCodes] = useState(initialCodes);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStocks()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSelectedCodes(initialCodes);
      setKeyword("");
      setError(false);
    }
  }, [isOpen]);

  const filteredData = useMemo(() => {
    const keywordRegex = new RegExp(keyword, "i");
    return data.filter(
      (item) => keywordRegex.test(item.name) || keywordRegex.test(item.code)
    );
  }, [keyword, data]);

  return (
    <>
      <LoadingLayer
        style={{ opacity: isLoading ? 1 : 0, backgroundColor: "white" }}
      />
      <header className={styles.header}>
        <h2>종목 선택</h2>
        <Textfield
          placeholder="종목명 또는 종목코드를 입력하세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setError(false);
          }}
        />
      </header>
      <div ref={listRef} className={styles.list}>
        {!error &&
          (keyword.length > 0 ? filteredData : data).map((item) => (
            <TickerItemComponent
              key={item.code}
              code={item.code}
              name={item.name}
              multiple={multiple}
              isSelected={selectedCodes.includes(item.code)}
              onChange={(isSelected) => {
                if (!multiple) {
                  setSelectedCodes([item.code]);
                } else {
                  setSelectedCodes((prev) => {
                    if (isSelected) {
                      return [...prev, item.code];
                    } else {
                      return prev.filter((code) => code !== item.code);
                    }
                  });
                }
              }}
            />
          ))}
      </div>
      <footer className={styles.footer}>
        <Button
          onClick={() => onDismiss()}
          buttonSize="small"
          buttonStyle="outlined"
        >
          취소
        </Button>
        <div style={{ flex: 1 }} />
        <Button
          buttonSize="small"
          buttonStyle="filled"
          onClick={() => {
            onConfirm(selectedCodes);
            setSelectedCodes([]);
          }}
        >
          {confirmButtonLabel}
        </Button>
      </footer>
    </>
  );
}

export function useTickerModal({
  initialCodes = [],
  onConfirm = (_codes = []) => {},
  multiple = true,
  confirmButtonLabel = "선택",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const component = (
    <Modal
      className={styles.container}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <TickerModalComponent
        isOpen={isOpen}
        initialCodes={initialCodes}
        onConfirm={(codes) => {
          onConfirm(codes);
          setIsOpen(false);
        }}
        onDismiss={() => setIsOpen(false)}
        multiple={multiple}
        confirmButtonLabel={confirmButtonLabel}
      />
    </Modal>
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [component, open, close];
}
