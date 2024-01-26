import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import { $isImageNode, ImageNode } from "../../nodes/image";
import {
  $getNodeByKey,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_NORMAL,
  PASTE_COMMAND,
  createCommand,
} from "lexical";
import ImageModal from "./modal";
import mergeRegister from "../../tools/mergeRegister";
import { handleUpload } from "./tools";
import { useImageContext } from "../../context/imageContext";

export const INSERT_IMAGE_COMMAND = createCommand();

export function ImagePlugin({ editable, id }) {
  const [editor] = useLexicalComposerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addImage, removeImage } = useImageContext();

  const createdHandler = useCallback(async (node) => {
    addImage(node.getImageURL())
  }, []);

  const deletedHandler = useCallback(async (node) => {
    removeImage(node.getImageURL())
  }, []);

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerMutationListener(ImageNode, (nodes) => {
        for (const [nodeKey, mutation] of nodes) {
          editor.getEditorState().read(() => {
            const node = $getNodeByKey(nodeKey);
            if (!$isImageNode(node)) return;

            switch (mutation) {
              case "created":
                createdHandler(node);
                break;
              case "deleted":
                deletedHandler(node);
                break;
            }
          });
        }
      }),
      editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
          if (!event.clipboardData) return;

          const items = (
            event.clipboardData || event.originalEvent.clipboardData
          ).items;

          for (const item of items) {
            if (item.kind === "file" && item.type.startsWith("image/")) {
              const blob = item.getAsFile();
              handleUpload(editor, id, blob).catch(() => {});
            }
          }
        },
        COMMAND_PRIORITY_NORMAL
      ),
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        () => setIsModalOpen(true),
        COMMAND_PRIORITY_EDITOR
      )
    );

    return () => {
      unregister();
    };
  });

  return (
    <ImageModal
      id={id}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      editor={editor}
    />
  );
}
