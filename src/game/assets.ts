import pet from '@game-assets/pet.png';
import bg from '@game-assets/bg.png';

export type AssetKey<
  T extends FileDefinition['type'] = FileDefinition['type']
> = {
  [K in keyof typeof assets]: typeof assets[K]['type'] extends T ? K : never;
}[keyof typeof assets];

interface FileDefinition {
  type: 'image';
  url: string;
}

function processAssets<T extends Record<string, FileDefinition>>(
  assets: T
): { [K in keyof T]: typeof assets[K] & { key: string } } {
  return Object.entries(assets).reduce((res, [key, asset]) => {
    (res as any)[key] = {
      ...(asset as FileDefinition),
      key,
      url: chrome.runtime.getURL((asset as FileDefinition).url),
    };
    return res;
  }, {} as { [K in keyof T]: typeof assets[K] & { key: string } });
}

export const assets = processAssets({
  bg: { type: 'image', url: bg },
  pet: { type: 'image', url: pet },
});
