# 工作表模型划分

本版根据用户提供的单张工作表 JSON 样本生成 TypeScript 数据结构定义。当前仅定义类型、字段归属和兼容边界；不实现模型管理、响应式订阅、命令、OT、公式计算或渲染。

## 兼容入口

`frontend/packages/model/src/sheet.ts` 中的 `SheetModel` 是完整快照入口，`src/index.ts` 统一导出纯类型。类型按职责拆分，但实际 JSON 保持原来的 31 个顶层字段，不新增 `document`、`viewState` 或 `workbook` 等包装节点。

当前样本是单张 Sheet，不包含工作簿、工作表名称、文档修订号或协同操作格式，因此本版不补造这些字段。

## 模型与文件

下列文件均位于 `frontend/packages/model/src/`。

| 文件 | 主要模型 | 样本字段或职责 |
| --- | --- | --- |
| `sheet.ts` | `SheetModel` | 单张工作表快照聚合 |
| `shared.ts` | ID 别名、JSON 值、索引对、数值编码 | 只提供基础类型，不解析或重建 ID |
| `axis.ts` | `RowModel`、`ColumnModel` | `rowData`、`columnData` |
| `cell.ts` | `CellModel`、`RichTextRunModel`、`CellTypeModel` | `cellData`、`cellTypes` |
| `style.ts` | 文本、单元格、边框样式与 `StylesModel` | `styles` |
| `merge.ts` | `MergeDataModel` | `mergeData` |
| `image.ts` | `CellImagesModel`、`ImagesModel` | `cellImages`、`images` |
| `hyperlink.ts` | `HyperlinkModel` | `hyperlink` |
| `filter.ts` | `FilterModel`、`FilterSelectionModel`、`SheetFilterStateModel` | `filter`、`filterSync`、`filterVersion`、`filterSelect` |
| `format.ts` | 工作表样式、交替格式、条件格式 | `sheetStyle`、`alternateFormatSave`、`conditionFormat` |
| `validation.ts` | 数据验证及规则 | `dataVerification`、`dataVerificationRule` |
| `visualization.ts` | 图表及透视表集合 | `chart`、`pivotTable` |
| `formula.ts` | `SheetFormulaStateModel` | `calcChain` |
| `view-state.ts` | `SheetViewStateModel`、`SheetSelectionModel`、`FrozenModel` | 尺寸、滚动、选区、冻结范围 |
| `auxiliary.ts` | `SheetAuxiliaryStateModel` | `load`、`searchReplace`、`aiTask`；具体生命周期待确认 |

## 顶层字段映射

所有字段在完整快照中保持必填；单元格占位和可选行列尺寸按样本允许缺省。这里的分组只服务于模型定义，不能直接用作持久化或协同字段白名单。

| 原字段 | 类型归属 | 处理规则 |
| --- | --- | --- |
| `id` | `SheetModel` | 工作表 ID，保留字符串 |
| `styles` | `StylesModel` | 三类样式字典独立保留 |
| `rowData` | `RowModel[]` | 有序行数组，`id` 必填、`len` 可选 |
| `columnData` | `ColumnModel[]` | 有序列数组，`id` 必填、`len` 可选 |
| `cellData` | `CellMatrixModel` | 不等长二维数组，支持空行、空对象及尾部省略 |
| `cellTypes` | `CellTypesModel` | 保留 `id`、格式字符串 `fa` 和类型编码 `t` |
| `mergeData` | `MergeDataModel` | 仅确认对象容器 |
| `cellImages` | `CellImagesModel` | 仅确认对象容器 |
| `load` | `SheetAuxiliaryStateModel` | 保留字符串，含义待确认 |
| `tableWidth` | `SheetViewStateModel` | 保留数值，是否为派生量待确认 |
| `tableHeight` | `SheetViewStateModel` | 保留数值，是否为派生量待确认 |
| `scrollLeft` | `SheetViewStateModel` | 滚动相关数值 |
| `scrollTop` | `SheetViewStateModel` | 滚动相关数值 |
| `sheetSelectSave` | `SheetSelectionModel[]` | 完整保留原有选区字段 |
| `calcChain` | `SheetFormulaStateModel` | 仅确认数组容器；是否为可重建缓存待确认 |
| `alternateFormatSave` | `AlternateFormatModel` | 仅确认数组容器 |
| `filter` | `FilterModel` | 已观察到内部 `filterVersion` |
| `filterSync` | `SheetFilterStateModel` | 保留 boolean，不能解释为 OT 同步开关 |
| `filterVersion` | `SheetFilterStateModel` | 与内部版本分开保留，不能解释为 OT 文档修订号 |
| `filterSelect` | `FilterSelectionModel` | 保留 `sr/er/sc/ec` 和 `-1` 等原值 |
| `chart` | `ChartModel` | 仅确认数组容器 |
| `dataVerification` | `DataVerificationModel` | 仅确认对象容器 |
| `dataVerificationRule` | `DataVerificationRuleModel` | 仅确认对象容器 |
| `frozen` | `FrozenModel` | 已确认 `range` 为对象，内部结构待补充 |
| `images` | `ImagesModel` | 与 `cellImages` 独立保留 |
| `hyperlink` | `HyperlinksModel` | 保留稳定单元格 ID 与位置索引两套信息 |
| `sheetStyle` | `SheetStyleModel` | 仅确认对象容器 |
| `conditionFormat` | `ConditionFormatModel` | 仅确认数组容器 |
| `pivotTable` | `PivotTableModel` | 仅确认数组容器 |
| `searchReplace` | `SheetAuxiliaryStateModel` | 仅确认数组容器，具体归属待确认 |
| `aiTask` | `SheetAuxiliaryStateModel` | 仅确认对象容器，具体归属待确认 |

## 单元格、样式与坐标

- `v` 保留原始值。样本仅出现字符串和数值，本版 `CellValue` 据此定义为 `string | number`；布尔值、空值、错误值及公式字段等待补充。
- `s` 是富文本片段数组，片段的 `v` 为字符串，`bl/fc/un` 是内联样式。`s` 与单元格级 `ts` 分别保留，不自动互相替换，也不规定 `s` 与 `v` 互斥。
- `ts`、`cs`、`bs` 分别引用 `styles.textStyle`、`styles.cellStyle`、`styles.borderStyle`；`ctId` 引用 `cellTypes`。
- `un`、`bl`、边框 `style` 保持数值编码。仅凭出现过的数值 `1`，不能推断完整枚举或转换为布尔值。
- `t`、`linkType` 保持字符串，不将示例出现的 `n/d/external` 当作完整枚举表。
- 行列数组的位置表示顺序；单元格样本 ID 由行 ID、下划线、列 ID 组成。当前仅记录这一对应关系，不提供 ID 拆分函数，也不以字符串模板限制所有未来 ID。
- 超链接 `rcIndex` 保留原字符串，不从 ID 自动重算；行列插入、删除、移动时如何维护它，留待命令和协同方案确定。
- `len` 缺失不等于零，本版不推断默认行高或列宽。

样本包含 256 行、32 列，但 `cellData` 仅存储前 19 个行位置，包含不等长行、`[]` 和 `{}`。选区位于已存储单元格之外、行列定义范围之内也是可能状态，因此后续校验不能用 `cellData.length` 作为工作表行数。

## 待补充结构

空对象使用 `JsonObject`，空数组使用 `JsonValue[]`，仅表达 JSON 容器边界，不代表内部结构已经设计完成。后续获得非空样本后，应逐项收紧类型。

需要补充的包括合并区域、图片、计算链、交替格式、条件格式、图表、数据验证、透视表、冻结范围、工作表样式、选区 `moveXY`、查找替换及 AI 任务。样本中没有公式表达式或计算结果字段，本版不增加 `f` 等字段。

## 与其它包的边界

本版 `model` 包仅提供可序列化的数据类型，不依赖 React、Ant Design、RxJS、Canvas 或服务端实现。样式引用有效性、字典键与 `id` 一致性、索引范围等关系约束仍需后续运行时校验，TypeScript 类型定义不能替代 JSON 数据验证。

`manager` 的模型生命周期与 RxJS 变更流、`command` 的操作入口、`collaboration` 的 OT 操作与版本、`formula` 的计算联动、`render` 的布局和缓存均待后续设计。这里的 `formula.ts` 仅定义快照中的计算链数据，不是公式引擎实现；`view-state.ts` 也不包含 Canvas 实例。

在确定持久化、会话状态和派生数据的正式边界之前，加载及保存时应完整保留快照字段，不因本次模型划分而静默丢弃选区、滚动、版本或其它辅助字段。
