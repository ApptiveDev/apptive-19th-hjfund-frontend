import localforage from "localforage";

export function getLocalImageStore() {
  return localforage.createInstance({
    name: "stocktreeAutoSave",
    storeName: "add",
    version: 1.0,
  });
}

export async function saveEditorState(state) {
  const store = getLocalImageStore();
  await store.setItem("editorState", state);
}

export async function getEditorState() {
  const store = getLocalImageStore();
  const state = await store.getItem("editorState");
  return state;
}