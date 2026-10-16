# OT Spreadsheet

当前阶段：仅建立项目目录，等待补充需求，尚未开始功能开发。

## 三个服务

| 目录 | 用途 | 已确定技术栈 |
| --- | --- | --- |
| `frontend/` | 表格前端 | TypeScript、React、Ant Design、RxJS、OT 协同接入 |
| `ot-service/` | OT 协同服务 | Node.js、OT |
| `backend/` | 后端服务 | Java 21 |
| `docs/` | 后续需求与设计说明 | 待补充 |

## 前端多包结构

前端采用多包项目结构，以下九个包统一预留在 `frontend/packages/` 下，每个包包含 `src/` 目录。

| 包目录 | 职责 |
| --- | --- |
| `frontend/packages/entry/` | 项目入口，另预留 `public/` 静态资源目录 |
| `frontend/packages/view/` | 界面组件 |
| `frontend/packages/command/` | 操作命令 |
| `frontend/packages/manager/` | 模型管理 |
| `frontend/packages/model/` | 模型定义 |
| `frontend/packages/common/` | 公共操作 |
| `frontend/packages/collaboration/` | 协同 |
| `frontend/packages/formula/` | 公式引擎 |
| `frontend/packages/render/` | Canvas 渲染引擎 |

### 已确定的渲染要求

- 表格主界面使用 Canvas 渲染。
- 单元格输入框使用 Canvas 渲染。
- 实现参考 Univer；当前仅记录参考方向，尚未开展源码分析或实现。
- 前端继续采用 TypeScript、React、Ant Design、RxJS 和 OT 相关技术。

包之间的依赖关系、接口、命令流程、响应式数据流、公式联动和 Canvas 输入交互等细节等待后续补充。

## 服务与文档预留目录

- `ot-service/src/`：Node.js OT 服务源码。
- `backend/src/main/java/`：Java 源码，包名待确定。
- `backend/src/main/resources/`：Java 服务资源和配置。
- `backend/src/test/java/`：Java 测试源码。
- `docs/`：后续需求与设计资料。

## 当前边界

当前仅包含目录、空目录占位文件、本说明与 Git 忽略规则；未生成业务代码，未安装依赖，未创建工作区、构建或部署配置。

后续由用户补充包管理工具、OT 实现方案、前端构建工具、Node.js 服务框架、Java 后端框架、构建工具、数据模型、接口与部署要求后，再开展开发。
