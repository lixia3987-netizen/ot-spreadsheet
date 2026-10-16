import type { JsonValue } from './shared';

/** 样本仅提供空 calcChain；公式表达式和计算结果字段尚未提供。 */
export type CalculationChainModel = JsonValue[];

export interface SheetFormulaStateModel {
  calcChain: CalculationChainModel;
}
