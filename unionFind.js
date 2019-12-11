// TODO

class UnionFindNode {
    constructor(item){
        this.item = item;
        this.parent = item;
        this.rank = 0;
        this.size = 1;
    }

    set rank(x) {
        this.rank = x;
    }

    get rank() {
        return this.rank;
    }
}

// Array-based Union Find implementation, by rank with path compression
class UnionFind {
    constructor(){
        this.container = [];
    }

    get length() {
        return this.container.length();
    }

    makeSet(x){
        if (!this.container[x]) {
            this.container[x] = new UnionFindNode(x);
        }

    }

    union(x, y) {
    
    }

    find(x) {

    }
}

module.exports = UnionFind;