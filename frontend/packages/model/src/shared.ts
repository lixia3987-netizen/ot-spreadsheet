/** 只描述可序列化数据；模型层不包含 RxJS 实例或运行时对象。 */
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue;
}

export type SheetId = string;
export type RowId = string;
export type ColumnId = string;
export type CellId = string;
export type TextStyleId = string;
export type CellStyleId = string;
export type BorderStyleId = string;
export type CellTypeId = string;

/** 保留样本中的数值编码；编码表尚未提供，不转换为 boolean 或枚举。 */
export type NumericCode = number;
export type IndexPair = [number, number];
