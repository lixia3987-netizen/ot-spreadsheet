import type {
  BorderStyleId,
  CellStyleId,
  NumericCode,
  TextStyleId,
} from './shared';

/** 已在共享文本样式或富文本片段中观察到的属性。 */
export interface TextStyleProperties {
  fc?: string;
  un?: NumericCode;
  bl?: NumericCode;
}

export interface TextStyleModel extends TextStyleProperties {
  id: TextStyleId;
}

export interface CellStyleModel {
  id: CellStyleId;
  bg?: string;
}

export interface BorderLineModel {
  color: string;
  style: NumericCode;
}

export interface BorderStyleModel {
  id: BorderStyleId;
  all?: BorderLineModel;
}

/** 样式字典键与样式对象 id 的一致性需在后续校验层检查。 */
export interface StylesModel {
  textStyle: Record<TextStyleId, TextStyleModel>;
  cellStyle: Record<CellStyleId, CellStyleModel>;
  borderStyle: Record<BorderStyleId, BorderStyleModel>;
}
