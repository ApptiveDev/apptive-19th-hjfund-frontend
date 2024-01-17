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

export async function getLocalImages(articleId, ids) {
  if (articleId === undefined) return;
  const store = getLocalImageStore(articleId);
  const images = {};

  for (const key of ids || (await store.keys())) {
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

export async function deleteLocalImages(articleId, ids) {
  if (articleId === undefined) return;
  const store = getLocalImageStore(articleId);

  if (ids) for (const key of ids) {
    await store.removeItem(key);
  } else {
    await store.clear();
  }
}
