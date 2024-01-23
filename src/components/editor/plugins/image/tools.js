import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { saveLocalImage } from "../../tools/localImage";
import { $createImageNode } from "../../nodes/image";


export async function handleUpload(editor, id, file) {
  const imageId = await saveLocalImage(id, file);

  return new Promise((resolve, reject) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return reject();
  
      const anchorNode = selection.anchor.getNode()?.getTopLevelElement();
      if (!anchorNode) return reject();
  
      const imageNode = $createImageNode("local", imageId);
  
      anchorNode.isEmpty()
        ? anchorNode.replace(imageNode)
        : anchorNode.insertAfter(imageNode);
  
      const newParagraph = $createParagraphNode();
      imageNode.insertAfter(newParagraph);
      newParagraph.select();
      resolve();
    });
  })
}