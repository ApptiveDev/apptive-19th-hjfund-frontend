import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import { $isImageNode, $isRemoteImageNode, ImageNode } from "../../nodes/image";
import { $getNodeByKey, COMMAND_PRIORITY_EDITOR, createCommand } from "lexical";
import localforage from "localforage";
import { $isLocalImageNode } from "../../nodes/image";
import ImageModal from "./modal";

export function getLocalImageTreeStore(articleId) {
  return localforage.createInstance({
    name: "stocktreeLocalImageTree",
    storeName: articleId,
    version: 1.0,
  });
}

export const INSERT_IMAGE_COMMAND = createCommand();

export function ImagePlugin({ editable, id }) {
  const [editor] = useLexicalComposerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createdHandler = useCallback(async (node) => {
    if ($isLocalImageNode(node)) {
      const store = getLocalImageTreeStore(id);
      const created = (await store.getItem("created")) ?? [];

      created.push(node.getImageURL());
      await store.setItem("created", created);
    }
  }, []);

  const deletedHandler = useCallback(async (node) => {
    if ($isLocalImageNode(node)) {
      const store = getLocalImageTreeStore(id);
      const created = (await store.getItem("created")) ?? [];

      const index = created.indexOf(node.getImageURL());
      if (index !== -1) {
        created.splice(index, 1);
      }

      await store.setItem("created", created);
    } else if ($isRemoteImageNode(node)) {
      const store = getLocalImageTreeStore(id);
      const deleted = (await store.getItem("deleted")) ?? [];

      deleted.push(node.getImageURL());
      await store.setItem("deleted", deleted);
    }
  }, []);

  useEffect(() => {
    const unregisterMutation = editor.registerMutationListener(
      ImageNode,
      (nodes) => {
        for (const [mutation, nodeKey] of nodes) {
          if (mutation === "created") {
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
        }
      }
    );

    const unregisterAddCommand = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      () => setIsModalOpen(true),
      COMMAND_PRIORITY_EDITOR
    );

    return () => {
      unregisterMutation();
      unregisterAddCommand();
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
