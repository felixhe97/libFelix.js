'use strict';

// helper data structure for union-find
class UnionFindNode {
    constructor(parentOfItem){
        this.parent = parentOfItem;
        this.rank = 0;
    }
}

/**
 * Map-based Union Find implementation,
 * union by rank, recursive path compression
 */
class UnionFind {
    /**
     * Constructor for union find data structure,
     * can take in optional array, of which all items
     * will be made into disjoint sets
     * @param {Array<*>} [iterable] 
     */
    constructor(iterable){
        this.container = new Map();
        if (iterable && iterable[Symbol.iterator]) {
            for (let x of iterable) {
                this.makeSet(x);
            }
        }
    }

    get length() {
        return this.container.size();
    }

    /**
     * Returns true if item within data structure, false otherwise
     * @param {*} item
     * @returns boolean 
     */
    has(item) {
        return this.container.has(item);
    }

    /**
     * Makes item into a set, does not overwrite if already added
     * @param {*} item 
     */
    makeSet(item){
        if (!this.has(item)) {
            this.container.set(item, new UnionFindNode(item));
        }
    }

    /**
     * Makes item1 and item2 be in the same set, both had to be made
     * previously with call to makeSet
     * @param {*} item1 
     * @param {*} item2 
     * @returns true if both items were in data structure, false otherwise
     */
    union(item1, item2) {
        if (this.has(item1) && this.has(item2)) {
            let root1 = this.find(item1);
            let root2 = this.find(item2);
            if (root1 !== root2) {
                if (this.container.get(root1).rank < this.container.get(root2).rank) {
                    this.container.get(root1).parent = root2;
                } else if (this.container.get(root1).rank > this.container.get(root2).rank) {
                    this.container.get(root2).parent = root1;
                } else {
                    this.container.get(root2).parent = root1;
                    ++this.container.get(root1).rank;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the representative root of the set that item is member of,
     * returns undefined if item has not been made as a set
     * @param {*} item
     * @returns representative root item of set
     */
    find(item) {
        if (this.has(item)) {
            if (item !== this.container.get(item).parent) {
                this.container.get(item).parent = this.find(this.container.get(item).parent);
            }
            return this.container.get(item).parent;
        }
        return undefined;
    }
}

module.exports = UnionFind;
