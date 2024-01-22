import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import Textfield from "@/components/textfield";
import Button from "@/components/button";
import { getStock } from "@/requests/stock";
import useInfiniteScroll from "@/tools/use-infinite-scroll";
import Modal from "../..";
import Checkbox from "@/components/checkbox";
import Radio from "@/components/radio";

function TickerItemComponent({ code, name, isSelected, onChange, multiple }) {
  return (
    <div className={styles.item} onClick={() => onChange(!isSelected)}>
      {multiple ? (
        <Checkbox
          checked={isSelected}
          onChange={() => onChange(!isSelected)}
          name="ticker"
          value={code}
        />
      ) : (
        <Radio
          checked={isSelected}
          onChange={() => onChange(!isSelected)}
          name="ticker"
          value={code}
        />
      )}
      <div className={styles.texts}>
        <div className={styles.name}>{name}</div>
        <div className={styles.code}>{code}</div>
      </div>
    </div>
  );
}

function TickerModalComponent({
  initialCodes = [],
  onConfirm = (_codes = []) => {},
  isOpen,
  onDismiss = () => {},
  multiple = true,
  confirmButtonLabel = "선택",
}) {
  const listRef = useRef(null);

  const [selectedCodes, setSelectedCodes] = useState(initialCodes);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKeyword("");
      setError(false);
      setSelectedCodes([]);
    }
  }, [isOpen]);

  // infinite scroll
  const [data, isFetchable, clear] = useInfiniteScroll({
    ref: listRef,
    async fetch(index, setData) {
      if (!isOpen) return false;

      const data = await getStock({
        key: keyword,
        index,
        count: 20,
      }).catch(() => setError(true));

      if (data) {
        setData(data.content);
        if (data.last) return true;
      }

      return false;
    },
    cooldown: 100,
  });

  // search
  useEffect(() => {
    clear();
  }, [keyword, isOpen]);

  return (
    <>
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
          data &&
          data.map((item) => (
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
