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
