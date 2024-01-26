import localforage from "localforage";

export function getEditorStateStore() {
  return localforage.createInstance({
    name: "stocktreeAutoSave",
    storeName: "add",
    version: 1.0,
  });
}

export async function saveEditorState(state) {
  const store = getEditorStateStore();
  await store.setItem("editorState", state);
}

export async function getEditorState() {
  const store = getEditorStateStore();
  const state = await store.getItem("editorState");
  return state;
}