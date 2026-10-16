import type { RowModel, ColumnModel } from './axis';
import type { SheetAuxiliaryStateModel } from './auxiliary';
import type { CellMatrixModel, CellTypesModel } from './cell';
import type { SheetFilterStateModel } from './filter';
import type {
  AlternateFormatModel,
  ConditionFormatModel,
  SheetStyleModel,
} from './format';
import type { SheetFormulaStateModel } from './formula';
import type { HyperlinksModel } from './hyperlink';
import type { CellImagesModel, ImagesModel } from './image';
import type { MergeDataModel } from './merge';
import type { SheetId } from './shared';
import type { StylesModel } from './style';
import type {
  DataVerificationModel,
  DataVerificationRuleModel,
} from './validation';
import type { FrozenModel, SheetViewStateModel } from './view-state';
import type { ChartModel, PivotTableModel } from './visualization';

/**
 * 单张工作表的兼容快照，完整保留样本的 31 个顶层字段。
 * extends 仅划分类型职责，不改变实际 JSON 层级，不新增包装节点。
 */
export interface SheetModel
  extends SheetViewStateModel,
    SheetFilterStateModel,
    SheetFormulaStateModel,
    SheetAuxiliaryStateModel {
  id: SheetId;
  styles: StylesModel;
  rowData: RowModel[];
  columnData: ColumnModel[];
  cellData: CellMatrixModel;
  cellTypes: CellTypesModel;
  mergeData: MergeDataModel;
  cellImages: CellImagesModel;
  alternateFormatSave: AlternateFormatModel;
  chart: ChartModel;
  dataVerification: DataVerificationModel;
  dataVerificationRule: DataVerificationRuleModel;
  frozen: FrozenModel;
  images: ImagesModel;
  hyperlink: HyperlinksModel;
  sheetStyle: SheetStyleModel;
  conditionFormat: ConditionFormatModel;
  pivotTable: PivotTableModel;
}
