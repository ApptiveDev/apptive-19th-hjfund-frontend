import { forwardRef } from "react";
import styles from "./styles.module.scss";
import Icon from "@/components/icon";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const LinkHoverToolbar = forwardRef(
  ({ pos, isOpen, setPointerState, url }, ref) => {
    function copyLink() {
      navigator.clipboard.writeText(url);
      setPointerState({ reference: false, target: false });
    }

    return (
      <div
        ref={ref}
        onPointerEnter={() =>
          setPointerState((prev) => ({ ...prev, target: true }))
        }
        onPointerLeave={() =>
          setPointerState((prev) => ({ ...prev, target: false }))
        }
        className={classes(
          styles.marginer,
          conditionalClass(!isOpen, styles.hidden)
        )}
        aria-hidden={!isOpen}
        style={isOpen && pos ? { top: pos.y, left: pos.x } : undefined}
      >
        <div className={styles.container}>
          <a
            className={styles.url}
            onClick={(e) => {
              e.preventDefault();
              const newWindow = window.open(url, "_blank");
              if (window.focus) newWindow.blur();
            }}
            href={url}
          >
            <Icon size={12} iconType="link-chain" className={styles.linkicon} />
            <span>{url}</span>
          </a>
          <div className={styles.buttons}>
            <button onClick={() => copyLink()}>
              <Icon size={14} iconType="copy-paste" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default LinkHoverToolbar;
