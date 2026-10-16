import type { IndexPair, JsonObject } from './shared';

/** 保留原始矩形字段；坐标系、缩放及各字段语义等待后续确认。 */
export interface SheetSelectionModel {
  left: number;
  width: number;
  top: number;
  height: number;
  left_move: number;
  width_move: number;
  top_move: number;
  height_move: number;
  row: IndexPair;
  column: IndexPair;
  row_focus: number;
  column_focus: number;
  row_select: boolean;
  column_select: boolean;
  moveXY: JsonObject;
}

/** 单独定义视图相关类型，但兼容快照仍保留这些字段。 */
export interface SheetViewStateModel {
  tableWidth: number;
  tableHeight: number;
  scrollLeft: number;
  scrollTop: number;
  sheetSelectSave: SheetSelectionModel[];
}

export interface FrozenModel {
  /** 样本为 {}，不能推断冻结行数、列数或范围格式。 */
  range: JsonObject;
}
