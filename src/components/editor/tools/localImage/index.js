import localforage from "localforage";

export function getLocalImageStore(articleId) {
  return localforage.createInstance({
    name: "stocktreeLocalImages",
    storeName: articleId,
    version: 1.0,
  });
}

export async function saveLocalImage(articleId, file) {
  if (articleId === undefined || file === undefined || !(file instanceof File))
    return;
  const store = getLocalImageStore(articleId);
  let id = crypto.randomUUID();

  while (await store.getItem(id)) {
    id = crypto.randomUUID();
  }

  await store.setItem(id, file);
  return id;
}

export async function getLocalImage(articleId, id) {
  if (articleId === undefined || id === undefined) return;
  const store = getLocalImageStore(articleId);
  const item = await store.getItem(id);
  if (item instanceof File) return item;
}

export async function getLocalImages(articleId) {
  if (articleId === undefined) return;
  const store = getLocalImageStore(articleId);
  const keys = await store.keys();
  const images = {};

  for (const key of keys) {
    const item = await store.getItem(key);
    if (item instanceof File) images[key] = item;
  }

  return images;
}

export async function deleteLocalImage(articleId, id) {
  if (articleId === undefined || id === undefined) return;
  const store = getLocalImageStore(articleId);
  await store.removeItem(id);
}

export async function clearLocalImages(articleId) {
  if (articleId === undefined) return;
  const store = getLocalImageStore(articleId);
  await store.clear();
}
