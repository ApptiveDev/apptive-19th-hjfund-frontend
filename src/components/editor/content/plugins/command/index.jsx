import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import { createPortal } from "react-dom";

const DIVIDER = "DIVIDER";
const EMPTY = "EMPTY";

class CommandInfo extends MenuOption {
  title;
  description;
  icon;
  keywords;
  onSelect;

  constructor(title, options) {
    super(title);
    this.title = title;
    this.description = options.description;
    this.icon = options.icon;
    this.keywords = options.keywords || [];
    this.onSelect = options.onSelect.bind(this);
  }
}

const CommandItem = ({ isSelected, onClick, onMouseEnter, info }) => {
  return (
    <li
      key={info.key}
      tabIndex={-1}
      ref={info.setRefElement}
      role="option"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={classes(
        styles.item,
        conditionalClass(isSelected, styles.selected)
      )}
    >
      <div className={styles.icon}>{info.icon}</div>
      <div className={styles.texts}>
        <p className={styles.title}>{info.title}</p>
        <p className={styles.description}>{info.description}</p>
      </div>
    </li>
  );
};

const getOptions = (editor) => [
  new CommandInfo("본문", {
    description: "본문 텍스트",
    icon: <>Aa</>,
    keywords: ["paragraph", "text", "본문", "텍스트"],
    onSelect: () => {},
  }),
  DIVIDER,
  new CommandInfo("제목 1", {
    description: "큰 제목",
    icon: <>H1</>,
    keywords: ["title1", "heading1", "제목1", "큰제목", "h1"],
    onSelect: () => {},
  }),
  new CommandInfo("제목 2", {
    description: "중간 제목",
    icon: <>H2</>,
    keywords: ["title1", "heading2", "제목2", "중간제목", "h2"],
    onSelect: () => {},
  }),
  new CommandInfo("제목 3", {
    description: "작은 제목",
    icon: <>H3</>,
    keywords: ["title3", "heading3", "제목3", "작은제목", "h3"],
    onSelect: () => {},
  }),
  DIVIDER,
  new CommandInfo("인용구", {
    description: "인용",
    icon: <>Q</>,
    keywords: ["quote", "인용"],
    onSelect: () => {},
  }),
  new CommandInfo("구분선", {
    description: "글 영역 분리",
    icon: <>—</>,
    keywords: ["divider", "구분선", "분리"],
    onSelect: () => {},
  }),
];

export default function CommandPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const onSelectOption = useCallback(
    (selectedOption, nodeToRemove, closeMenu, matchingString) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor]
  );

  const options = useMemo(() => {
    const defaultOptions = getOptions(editor);
    if (!queryString) return defaultOptions;

    const matchingOptions = defaultOptions.filter((option) => {
      if (option === DIVIDER) return false;

      return option.keywords.some((keyword) => {
        return keyword.includes(queryString.toLowerCase());
      });
    });

    return matchingOptions.length > 0 ? matchingOptions : [EMPTY];
  }, [editor, queryString]);

  const filteredOptions = options.filter((option) => option !== DIVIDER);

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={filteredOptions}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) => {
        if (selectedIndex >= filteredOptions.length) {
          setHighlightedIndex(0);
        }

        return (
          anchorElementRef.current &&
          createPortal(
            <ul className={styles.container}>
              {
                options.reduce(
                  (acc, option, i) => {
                    if (options.length === 1 && option === EMPTY) {
                      acc.components.push(<li key={0} className={styles.empty}>결과 없음</li>)
                      return acc;
                    }

                    if (option === DIVIDER) {
                      acc.components.push(
                        <li className={styles.divider} key={i} />
                      );
                    } else {
                      acc.components.push(
                        <CommandItem
                          key={i}
                          isSelected={selectedIndex === acc.index}
                          onClick={() => {
                            setHighlightedIndex(acc.index);
                            selectOptionAndCleanUp(option);
                          }}
                          onMouseEnter={() => setHighlightedIndex(acc.index)}
                          info={option}
                        />
                      );
                      acc.index++;
                    }

                    return acc;
                  },
                  { index: 0, components: [] }
                ).components
              }
            </ul>,
            anchorElementRef.current
          )
        );
      }}
    />
  );
}
