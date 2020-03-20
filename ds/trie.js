'use strict';

/**
 * Self-referential trie, implemented with Object/HashMap
 */
module.exports = class Trie {
    /**
     * Construct a Trie
     *
     * @param {string} [arg] optional string to initiate trie
     */
    constructor(arg) {
        this.flag = false;
        this.trieSet = {};
        if (arg && typeof arg === "string") {
            this.add(arg);
        }
    }

    /**
     * Returns true if string added to Trie, false otherwise
     *
     * @param {string} str
     * @returns {boolean}
     */
    add(str) {
        if (typeof str === "string") {
            let tempTrie = this;
            for (let c of str) {
                if (tempTrie.trieSet[c]) {
                    tempTrie = tempTrie.trieSet[c];
                } else {
                    tempTrie.trieSet[c] = new Trie();
                    tempTrie = tempTrie.trieSet[c];
                }
            }
            tempTrie.flag = true;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns true if string found in Trie, false otherwise
     *
     * @param {string} str
     * @returns {boolean}
     */
    find(str) {
        if (typeof str === "string") {
            let tempTrie = this;
            for (let c of str) {
                if (tempTrie.trieSet[c]) {
                    tempTrie = tempTrie.trieSet[c];
                } else {
                    return false;
                }
            }
            return tempTrie.flag;
        } else {
            return false;
        }
    }

    /**
     * Guarantees string won't be in Trie
     *
     * @param {string} str
     */
    delete(str) {
        if (typeof str === "string") {
            let tempTrie = this;
            let arrOfTrie = [];
            for (let c of str) {
                if (tempTrie.trieSet[c]) {
                    arrOfTrie.push(tempTrie);
                    tempTrie = tempTrie.trieSet[c];
                } else {
                    return;
                }
            }
            tempTrie.flag = false;
            while (arrOfTrie.length > 1) {
                if (!tempTrie.flag && !Object.keys(tempTrie.trieSet).length) {
                    let parentTrie = arrOfTrie.pop();
                    for (let key in parentTrie.trieSet) {
                        if (parentTrie.trieSet[key] === tempTrie) {
                            delete parentTrie.trieSet[key];
                            break;
                        }
                    }
                    tempTrie = parentTrie;
                } else {
                    return;
                }
            }
        }
    }
}