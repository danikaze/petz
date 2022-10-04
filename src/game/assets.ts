import eggPng from '@game-assets/egg.png';
import eggJson from '@game-assets/egg.anim';
import babyPng from '@game-assets/baby.png';
import babyJson from '@game-assets/baby.anim';
import pet from '@game-assets/pet.png';
import bg from '@game-assets/bg.png';

export type AssetKey<
  T extends FileDefinition['type'] = FileDefinition['type']
> = {
  [K in keyof typeof assets]: typeof assets[K]['type'] extends T ? K : never;
}[keyof typeof assets];

type FileDefinition =
  | {
      type: 'image';
      url: string;
    }
  | {
      type: 'atlas';
      url: string;
      json: string;
    };

function processAssets<T extends Record<string, FileDefinition>>(
  assets: T
): { [K in keyof T]: typeof assets[K] & { key: string } } {
  const pathFields = ['url', 'json'];
  return Object.entries(assets).reduce((res, [key, asset]) => {
    // add the "key"
    const processedAsset = {
      ...(asset as FileDefinition),
      key,
    };
    // process paths for the extension
    for (const field of pathFields) {
      if ((processedAsset as any)[field]) {
        (processedAsset as any)[field] = chrome.runtime.getURL(
          (processedAsset as any)[field]
        );
      }
    }

    (res as any)[key] = processedAsset;
    return res;
  }, {} as { [K in keyof T]: typeof assets[K] & { key: string } });
}

export const assets = processAssets({
  bg: { type: 'image', url: bg },
  pet: { type: 'image', url: pet },
  egg: { type: 'atlas', url: eggPng, json: eggJson },
  baby: { type: 'atlas', url: babyPng, json: babyJson },
});
