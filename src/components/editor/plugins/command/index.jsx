import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import { createPortal } from "react-dom";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createHorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import Icon from "@/components/icon";
import { INSERT_IMAGE_COMMAND } from "../image";

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
      <div className={classes(styles.icon, styles[info.id])}>{info.icon}</div>
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
    icon: <Icon size={18} iconType="paragraph" />,
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
        icon: (
          <Icon
            size={18}
            iconType={`heading-${item.type}-paragraph-styles-heading`}
          />
        ),
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
    keywords: ["image", "img", "photo", "사진", "이미지"],
    onSelect: () => {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND);
    },
  }),
  // new CommandInfo("file", {
  //   title: "파일",
  //   description: "파일 또는 링크",
  //   icon: <Icon size={18} iconType="download-file" />,
  //   keywords: ["file", "첨부파일"],
  //   onSelect: () => {},
  // }),
  // new CommandInfo("embed", {
  //   title: "삽입",
  //   description: "Youtube, Twitter, Instagram 등",
  //   icon: <Icon size={18} iconType="ai-generate-variation-spark" />,
  //   keywords: ["embed", "임베드", "삽입", "youtube", "twitter", "instagram"],
  //   onSelect: () => {},
  // }),
  DIVIDER,
  new CommandInfo("ul", {
    title: "목록",
    description: "순서 없는 목록",
    icon: <Icon size={18} iconType="bullet-list" />,
    keywords: ["순서없는목록", "ul", "리스트", "unoredredlist"],
    onSelect: () => {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    },
  }),
  new CommandInfo("ol", {
    title: "목록",
    description: "순서 있는 목록",
    icon: <Icon size={18} iconType="ascending-number-order" />,
    keywords: ["순서있는목록", "ol", "리스트", "orderedlist"],
    onSelect: () => {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    },
  }),
  DIVIDER,
  new CommandInfo("quote", {
    title: "인용구",
    description: "인용",
    icon: <span />,
    keywords: ["quote", "인용"],
    onSelect: () => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    },
  }),
  new CommandInfo("divider", {
    title: "구분선",
    description: "글 영역 분리",
    icon: <span />,
    keywords: ["divider", "hr", "line", "구분선", "분리"],
    onSelect: () => {
      editor.update(() => {
        const root = $getRoot();
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();

          if (anchorNode) {
            const dividerNode = $createHorizontalRuleNode();
            anchorNode.getTopLevelElement().insertAfter(dividerNode);

            if (
              anchorNode.getTextContentSize() === 0 &&
              root.getChildrenSize() > 2
            ) {
              anchorNode.remove();
            }

            const newParagraph = $createParagraphNode();
            dividerNode.insertAfter(newParagraph);

            newParagraph.select();
          }
        }
      });
    },
  }),
];

export default function CommandPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState(null);
  const [isPointerBlocked, setIsPointerBlocked] = useState(false);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });


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

  const onSelectOption = useCallback(
    (selectedOption, nodeToRemove, closeMenu, matchingString) => {
      if (options.length === 1 && selectedOption === EMPTY) {
        return;
      }

      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor, options]
  );

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

  useEffect(() => {
    function listener() {
      setIsPointerBlocked(true);
    }

    const unregisterArrowDown = editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      listener,
      COMMAND_PRIORITY_LOW
    );
    const unregisterArrowUp = editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      listener,
      COMMAND_PRIORITY_LOW
    );

    document.addEventListener("pointermove", () => setIsPointerBlocked(false));

    return () => {
      unregisterArrowDown();
      unregisterArrowUp();
      document.removeEventListener("pointermove", () =>
        setIsPointerBlocked(false)
      );
    };
  }, []);

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
                    onPointerEnter={() =>
                      !isPointerBlocked && setHighlightedIndex(option.index)
                    }
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
