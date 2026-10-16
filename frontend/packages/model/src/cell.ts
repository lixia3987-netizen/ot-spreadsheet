import type {
  BorderStyleId,
  CellId,
  CellStyleId,
  CellTypeId,
  TextStyleId,
} from './shared';
import type { TextStyleProperties } from './style';

/** 当前样本仅观察到字符串、数值；其它值类型等待补充。 */
export type CellValue = string | number;

/** s 中的样式为内联属性，不是样式字典引用。 */
export interface RichTextRunModel extends TextStyleProperties {
  v: string;
}

/**
 * 允许 {} 占位，因而各字段均可缺省。
 * 有内容的单元格与行列 ID 的对应关系交由后续校验层处理。
 */
export interface CellModel {
  id?: CellId;
  v?: CellValue;
  ctId?: CellTypeId;
  ts?: TextStyleId;
  cs?: CellStyleId;
  bs?: BorderStyleId;
  s?: RichTextRunModel[];
}

/** 允许 [] 空行、不等长行和尾部省略，不要求填满全部行列。 */
export type CellMatrixModel = CellModel[][];

export interface CellTypeModel {
  id: CellTypeId;
  fa: string;
  /** 已观察到 n、d；完整类型编码尚未确认。 */
  t: string;
}

export type CellTypesModel = Record<CellTypeId, CellTypeModel>;
