import styles from "./styles.module.scss";

const editorTheme = {
  quote: styles.quote,
  heading: {
    h1: styles["heading-1"],
    h2: styles["heading-2"],
    h3: styles["heading-3"],
  },
  list: {
    nested: {
      listitem: styles["nested-list-item"],
    },
    ol: styles.ol,
    ul: styles.ul,
    listitem: styles["list-item"],
  },
  link: styles.link,
  text: {
    bold: styles.bold,
    italic: styles.italic,
    code: styles.code,
    underline: styles.underline,
    strikethrough: styles.strikethrough,
    underlineStrikethrough: styles["underline-strikethrough"],
  }
}

export default editorTheme;