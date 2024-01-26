import localforage from "localforage";

export function getMetadataStore() {
  return localforage.createInstance({
    name: "stocktreeAutoSave",
    storeName: "add",
    version: 1.0,
  });
}

export async function saveMetadata(state) {
  const store = getMetadataStore();
  await store.setItem("Metadata", state);
}

export async function getMetadata() {
  const store = getMetadataStore();
  const state = await store.getItem("Metadata");
  return state;
}