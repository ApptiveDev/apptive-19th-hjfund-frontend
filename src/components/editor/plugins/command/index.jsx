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
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import Icon from "@/components/icon";

const DIVIDER = "DIVIDER";
const EMPTY = "EMPTY";

class CommandInfo extends MenuOption {
  id;
  title;
  description;
  icon;
  keywords;
  onSelect;

  constructor(id, options) {
    super(id);
    this.id = id;
    this.title = options.title;
    this.description = options.description;
    this.icon = options.icon;
    this.keywords = options.keywords || [];
    this.onSelect = options.onSelect.bind(this);
  }
}

const CommandItem = ({ isSelected, onClick, onPointerEnter, info }) => {
  return (
    <li
      key={info.key}
      tabIndex={-1}
      ref={info.setRefElement}
      role="option"
      onPointerEnter={onPointerEnter}
      onClick={onClick}
      className={classes(
        styles.item,
        conditionalClass(isSelected, styles.selected)
      )}
    >
      <div className={classes(styles.icon, styles[info.id])}>
        {info.icon}
      </div>
      <div className={styles.texts}>
        <p className={styles.title}>{info.title}</p>
        <p className={styles.description}>{info.description}</p>
      </div>
    </li>
  );
};

const getOptions = (editor) => [
  new CommandInfo("p", {
    title: "본문",
    description: "본문 텍스트",
    icon: <>Aa</>,
    keywords: ["paragraph", "text", "본문", "텍스트"],
    onSelect: () => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    },
  }),
  DIVIDER,
  ...[
    { type: 1, description: "큰 제목" },
    { type: 2, description: "중간 제목" },
    { type: 3, description: "작은 제목" },
  ].map(
    (item) =>
      new CommandInfo("h" + item.type, {
        title: "제목 " + item.type,
        description: item.description,
        icon: <>H{item.type}</>,
        keywords: ["title", "heading", "제목", "헤딩", "h" + item.type],
        onSelect: () => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () =>
                $createHeadingNode("h" + (item.type + 1))
              );
            }
          });
        },
      })
  ),
  DIVIDER,
  new CommandInfo("image", {
    title: "사진",
    description: "파일 또는 링크",
    icon: <Icon size={18} iconType="landscape-2" />,
    keywords: ["image", "photo", "사진", "이미지"],
    onSelect: () => {},
  }),
  new CommandInfo("file", {
    title: "파일",
    description: "파일 또는 링크",
    icon: <Icon size={18} iconType="download-file" />,
    keywords: ["file", "첨부파일"],
    onSelect: () => {},
  }),
  new CommandInfo("embed", {
    title: "삽입",
    description: "Youtube, Twitter, Instagram 등",
    icon: <Icon size={18} iconType="ai-generate-variation-spark" />,
    keywords: ["embed", "임베드", "삽입", "youtube", "twitter", "instagram"],
    onSelect: () => {},
  }),
  DIVIDER,
  new CommandInfo("ul", {
    title: "목록",
    description: "순서 없는 목록",
    icon: <Icon size={18} iconType="bullet-list" />,
    keywords: ["순서없는목록", "ul", "리스트", "unoredredlist"],
    onSelect: () => {},
  }),
  new CommandInfo("ol", {
    title: "목록",
    description: "순서 있는 목록",
    icon: <Icon size={18} iconType="ascending-number-order" />,
    keywords: ["순서있는목록", "ol", "리스트", "orderedlist"],
    onSelect: () => {},
  }),
  DIVIDER,
  new CommandInfo("quote", {
    title: "인용구",
    description: "인용",
    icon: <span />,
    keywords: ["quote", "인용"],
    onSelect: () => {},
  }),
  new CommandInfo("divider", {
    title: "구분선",
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
  const optionsWithIndex = useMemo(
    () =>
      options.reduce(
        (acc, e) => {
          if (e === DIVIDER || e === EMPTY) {
            acc.components.push(e);
            return acc;
          }

          acc.components.push({
            index: acc.index,
            item: e,
          });
          acc.index++;
          return acc;
        },
        { components: [], index: 0 }
      ).components,
    [options]
  );

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
        console.log(selectedIndex);
        if (selectedIndex >= filteredOptions.length) {
          setHighlightedIndex(0);
        }

        return (
          anchorElementRef.current &&
          createPortal(
            <ul className={styles.container}>
              {optionsWithIndex.map((option, i) => {
                if (options.length === 1 && option === EMPTY) {
                  return (
                    <li key={0} className={styles.empty}>
                      결과 없음
                    </li>
                  );
                }

                if (option === DIVIDER) {
                  return <li className={styles.divider} key={i} />;
                }

                return (
                  <CommandItem
                    key={option.item.id}
                    isSelected={selectedIndex === option.index}
                    onClick={() => {
                      setHighlightedIndex(option.index);
                      selectOptionAndCleanUp(option.item);
                    }}
                    onPointerEnter={() => setHighlightedIndex(option.index)}
                    info={option.item}
                  />
                );
              })}
            </ul>,
            anchorElementRef.current
          )
        );
      }}
    />
  );
}
