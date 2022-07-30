import * as traverse from "traverse";

// filter data by language
const filterLanguage = function (language, data) {
    let tmp;
    if (Array.isArray(data)) {
        tmp = [];
        for (let i = 0; i < data.length; i++) {
            const tmpObj = traverse(data[i]).map(function (item) {
                if (item === language) {
                    this.parent.parent.update([this.parent.node]);
                }
            });
            tmp.push(tmpObj);
        }
    } else {
        tmp = traverse(data).map(function (item) {
            if (item === language) {
                if (this.parent.node.value) {
                    this.parent.parent.update(this.parent.node.value || "");
                }
            }
        });
    }
    return tmp;
};
export default filterLanguage;
