import type { JsonObject, JsonValue } from './shared';

/** 这些字段的生命周期、同步和持久化边界均待确认。 */
export interface SheetAuxiliaryStateModel {
  /** 样本为字符串 "1"，不转成 number 或 boolean。 */
  load: string;
  searchReplace: JsonValue[];
  aiTask: JsonObject;
}
