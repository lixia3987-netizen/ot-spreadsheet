import type { ColumnId, RowId } from './shared';

/** 数组位置表达行顺序；len 缺失时不推断默认值。 */
export interface RowModel {
  id: RowId;
  len?: number;
}

/** 数组位置表达列顺序；len 缺失时不推断默认值。 */
export interface ColumnModel {
  id: ColumnId;
  len?: number;
}
