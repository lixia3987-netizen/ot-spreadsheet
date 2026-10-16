/** 样本只提供版本字段，筛选条件等结构等待补充。 */
export interface FilterModel {
  filterVersion: number;
}

/** 保留 -1 等原始数值；不在类型层套用非负索引约束。 */
export interface FilterSelectionModel {
  sr: number;
  er: number;
  sc: number;
  ec: number;
}

export interface SheetFilterStateModel {
  filter: FilterModel;
  /** 语义待确认，不解释为 OT 同步开关。 */
  filterSync: boolean;
  /** 与 filter.filterVersion 独立保留，不解释为 OT 文档版本。 */
  filterVersion: number;
  filterSelect: FilterSelectionModel;
}
