import type { JsonObject } from './shared';

/** 两个字段在样本中均为 {}，保持独立，暂不推断它们的关系。 */
export type CellImagesModel = JsonObject;
export type ImagesModel = JsonObject;
