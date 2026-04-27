# 宜 / 忌 資料格式

`yi.json`（宜）與 `ji.json`（忌）共用同一份 schema。每天會從各自的 pool
中以日期為種子隨機抽 3-5 個項目，並透過 **tag 衝突偵測** 確保宜與忌不會出現
語意打架的組合。

## 結構

```json
{
  "version": 1,
  "items": [
    {
      "id": "deploy_staging",
      "text": "部署到 Staging 環境",
      "tags": ["deploy_staging"]
    }
  ]
}
```

## 欄位

| 欄位 | 必填 | 說明 |
|------|------|------|
| `id` | 是 | 全檔案唯一的 snake_case 識別字。新增項目時不可重複，重複會在啟動時報錯。 |
| `text` | 是 | 顯示給使用者看的繁體中文文字，含標點。 |
| `tags` | 是（≥ 1 個）| 語意化標籤，用來偵測宜 / 忌之間的衝突。 |

## 衝突偵測規則

選人邏輯：

1. 用日期當種子先抽 3-5 個 **宜**。
2. 把宜全部 tag 收集起來成一個集合 `used_tags`。
3. 從 ji pool 中跳過任何 tag 與 `used_tags` 有交集的項目，補滿 3-5 個 **忌**。

換句話說：**宜的 item 與忌的 item 共享任何一個 tag 就視為衝突**。

## tag 命名慣例

為了避免「太籠統的 tag 把不相關的項目綁在一起誤判衝突」，請遵守：

- 一律 `snake_case`。
- **盡量具體**：用 `deploy_prod` 而不是 `deploy`。`refactor_friday` 想表達的是
  「週五重構」這件特定行為，可以共用 `refactor` tag 與 `refactor_small` 構成
  衝突；如果未來想細分，再拆 `refactor_friday` / `refactor_small_safe` 等。
- 已使用的領域前綴（請優先沿用）：

  | 前綴 | 範例 tag | 含義 |
  |------|----------|------|
  | `deploy_` | `deploy_staging`, `deploy_prod` | 部署相關，依環境分 |
  | `git_` | `git_force_push`, `git_cleanup`, `git_quality` | 版控操作 |
  | `db_` | `db_schema`, `db_backup` | 資料庫操作 |
  | `deps_` | `deps_minor`, `deps_major` | 套件升級 |
  | `meeting_` | `meeting_1on1`, `meeting_big` | 會議類型 |
  | `pm_` | `pm_estimate` | PM 互動 |
  | `refactor` / `refactor_*` | | 重構 |
  | `test` | | 測試 |
  | `review` | | Code review |
  | `cleanup` | | 程式碼整潔 |
  | `security` | | 資安 |
  | `observability` | | 可觀測性 |
  | `prod_config` | | 生產環境設定 |
  | `destructive` | | 不可逆操作 |

## 新增項目的快速流程

1. 想清楚「這條的 tag 會跟哪些既有項目衝突」。
2. 給一個獨一無二的 `id`。
3. 寫好 `text`，盡量像農民曆一樣 7-15 字。
4. 至少給一個 tag，能用既有領域前綴就用，不夠再新增。
5. 啟動 app 時若 tag 為空、`id` 重複，會在 import 階段直接 raise，不會默默
   忽略。

## 不在這份 schema 裡的功能（暫不支援）

- 同 pool 內項目之間的衝突（例如「準時下班」與「加班修 bug」同時出現在宜）。
- 季節 / 星期 / 節日特化（例如只在週五出現的條目）。

之後若有需要，再延伸新的欄位（例如 `only_on_weekday: [4]`）並更新本文件。
