import type { CellId } from './shared';

export interface HyperlinkModel {
  id: CellId;
  /** 样本为 external；保留字符串，不据此限定完整枚举。 */
  linkType: string;
  linkAddress: string;
  /** 原始位置索引字符串，与稳定单元格 ID 分别保留。 */
  rcIndex: string;
}

export type HyperlinksModel = Record<CellId, HyperlinkModel>;
