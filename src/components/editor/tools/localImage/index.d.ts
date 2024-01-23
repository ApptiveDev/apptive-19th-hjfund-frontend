export declare async function saveLocalImage(
  articleId: string,
  file: File
): Promise<string>;

export declare async function getLocalImage(
  articleId: string,
  id: string
): Promise<File>;

export declare async function getLocalImages(
  articleId: string
): Promise<Record<string, File>>;

export declare async function deleteLocalImage(
  articleId: string,
  id: string
): Promise<void>;

export async function clearLocalImages(articleId: string): Promise<void>;
