# Zotero-reference

China National Standard GB/T 7714-2015

1. 作者仅首字母大写
2. 支持中文 **等** 和英文 **et al** （需要在英文文献语言一栏填上 `en`）
3. 对于会议论文，出版社为空时依旧显示时间，地点
4. 不显示URL，不显示DOI

# 批量修改文献语言

打开 **Zotero-> 工具-> 开发者 -> Run JavaScript**

将以下 [代码](./changeLanguage.js) 粘贴并运行 (语言栏为 空 的文献会根据标题的语言类型修改成 `cn` 或 `en`)

```js
let s = new Zotero.Search();
s.libraryID = Zotero.Libraries.userLibraryID;
s.addCondition('language', 'doesNotContain', '%');
let results = await s.search();
let items = await Zotero.Items.getAsync(results);
let re = new RegExp('[\u4e00-\u9fa5]')
for (let item of items) {
    try {
        if (re.test(item.getField('title'))) {
            item.setField("language", 'cn')
        } else {
            item.setField("language", 'en')
        }
    } catch (err) {
    }
}
return 'finished'
```
