/**
 * Adjacency list implementation of directed graph data structure
 */
class AdjacencyList {
    /**
     * TODO
     * @param {Array<*>} [iterable] 
     * @param {boolean} [directed] 
     */
    constructor(iterable, directed = false){
        this.nodes = new Map();
        if (iterable && iterable[Symbol.iterator]) {
            for (let adjacencyList of iterable) {
                if (Array.isArray(adjacencyList)) {
                    if (adjacencyList.length === 2) {
                        if (directed) {
                            this.addDirectedEdge(adjacencyList[0], adjacencyList[1]);
                        } else {
                            this.addUndirectedEdge(adjacencyList[0], adjacencyList[1]);
                        }
                    } else if (adjacencyList.length === 3) {
                        if (directed) {
                            this.addDirectedEdge(adjacencyList[0], adjacencyList[1], adjacencyList[2]);
                        } else {
                            this.addUndirectedEdge(adjacencyList[0], adjacencyList[1], adjacencyList[2]);
                        }
                    }
                }
            }
        }
    }

    *[Symbol.iterator] () {
        // TODO
    }

    /**
     * Returns number of vertices in graph
     */
    get length() {
        return this.nodes.size();
    }

    /**
     * Returns true if item is a vertex in graph, 
     * otherwise return false
     * @param {*} vertex 
     */
    inGraph(vertex){
        return this.nodes.has(vertex);
    }

    /**
     * Returns true if a node is in graph after call
     * @param {*} item 
     */
    addVertex(item){
        if (!this.inGraph(item)) {
            this.nodes.set(item, new Map());
        }
        return true;
    }

    /**
     * Returns true if a node is not in graph after call,
     * removes all edges leaving from node, and all edges going to node
     * @param {*} item 
     */
    removeVertex(item){
        if (this.inGraph(item)){
            for (let [vertex, edges] of this.nodes) {
                this.removeDirectedEdge(vertex, item);
            }
            this.nodes.delete(item);
        }
        return true;
    }

    /**
     * Returns true if graph now has a directed edge from item1 to item2, 
     * creating nodes and overwriting previous edges within graph if necessary
     * @param {*} item1 
     * @param {*} item2 
     * @param {Number} [weight] 
     */
    addDirectedEdge(item1, item2, weight = 0){
        this.addVertex(item1);
        this.addVertex(item2);
        this.nodes.get(item1).set(item2, weight);
        return true;
    }

    /**
     * Returns true if there is biderectional edge of weight between item1 and item2,
     * creating nodes and overwriting previous edges within graph if necessary
     * @param {*} item1 
     * @param {*} item2 
     * @param {Number} [weight] 
     */
    addUndirectedEdge(item1, item2, weight = 0){
        return this.addDirectedEdge(item1, item2, weight) && this.addDirectedEdge(item2, item1, weight);
    }

    /**
     * Returns true if edge from item1 to item2 is deleted,
     * false if no edge was there or otherwise 
     * @param {*} item1 
     * @param {*} item2 
     */
    removeDirectedEdge(item1, item2){
        if (this.inGraph(item1) && this.nodes.get(item1).has(item2)) {
            return this.nodes.get(item1).delete(item2);
        }
        return false;
    }

    /**
     * Returns true if edge between item1 and item2 is deleted,
     * false if no biderectional edge of same weight was there or otherwise 
     * @param {*} item1 
     * @param {*} item2 
     */
    removeUndirectedEdge(item1, item2){
        if (this.isUndirectedEdgeBetween(item1, item2)) {
            return this.removeDirectedEdge(item1, item2) && this.removeDirectedEdge(item2, item1);
        }
        return false;
    }

    /**
     * Returns edge weight from item1 to item2,
     * otherwise returns NaN
     * @param {*} item1 
     * @param {*} item2 
     */
    getEdgeWeightFrom(item1, item2) {
        if (this.isEdgeFrom(item1, item2)) {
            return this.nodes.get(item1).get(item2);
        }
        return NaN;
    }

    /**
     * Returns true is there is an undirected edge between item1 and item2,
     * acts correctly for undirected graphs, returns false otherwise
     * @param {*} item1 
     * @param {*} item2 
     */
    isUndirectedEdgeBetween(item1, item2) {
        return this.getEdgeWeightFrom(item1, item2) === this.getEdgeWeightFrom(item2, item1) 
            && !Number.isNaN(this.getEdgeWeightFrom(item1, item2));
    }

    /**
     * Returns true if there is an edge from item1 to item2,
     * returns false otherwise
     * @param {*} item1 
     * @param {*} item2 
     */
    isEdgeFrom(item1, item2){
        return this.inGraph(item1) && this.nodes.get(item1).has(item2);
    }

    /**
     * Returns array of nodes that are reachable from given item,
     * else return null
     * @param {*} item 
     */
    outgoingVertices(item){
        if (this.inGraph(item)) {
            return [...this.nodes.get(item).keys()];
        }
        return null;
    }
}

// TODO
// undirected graphs
// directed graphs
// undirected weighted graphs
// directed weighted graphs
// undirected positive weights only graph
// directed positive weights only graph
// acyclic graphs
// static djikstra methods
// static kruskal methods

module.exports = AdjacencyList;