import { LinkedList } from "../Linked List/linked-list.js";

export class Graph<T extends string | number> {
  private vertices: T[];
  private adjList: LinkedList<number>[];
  private vertexMap: Map<T, number>;
  constructor() {
    this.vertices = [];
    this.adjList = [];
    this.vertexMap = new Map();
  }

  addVertex(vertex: T): void {
    // if has vertex, return
    // set vertex -> index map
    // push vertex to vertices[]
    // create empty Linked List in adjList for new Vertex
    if(this.vertexMap.has(vertex)) return;
    const index = this.vertices.length;
    this.vertexMap.set(vertex, index);
    this.vertices.push(vertex);
    const newLinkedList: LinkedList<number> = new LinkedList();
    this.adjList.push(newLinkedList);
  }

  addEdge(v1: T, v2: T): void {
    // get two vertices index
    // check if vertices exist
    // if not connected, push v1's index to v2's LL, push v2's index to v1's LL
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    if(i === undefined || j === undefined) throw new Error('Vertices not found');
    if(!this.isConnected(v1, v2)) {
      this.adjList[i]!.push(j);
      this.adjList[j]!.push(i);
    }
  }

  removeVertex(vertex: T): boolean {
    // check vertex exist
    // iterate adjList and iterate every LL, if find vertex's index -> delete, if greater than vertex's index -> its index-1
    // delete vertex's LL from adjList
    // delete vertex from vertices[]
    // reset vertexMap
    const index = this.vertexMap.get(vertex);
    if(index === undefined) return false;
    this.adjList.forEach(ver => { // ver: linked list 
      ver.process(value => {
        if(value === index) return {delete: true};
        else if(value > index) return {delete: false, newValue: value - 1};
        else return {delete: false}
      })
    })
    this.adjList.splice(index, 1);
    this.vertices.splice(index, 1);
    this.vertexMap.clear();
    this.vertices.forEach((ver, i) => this.vertexMap.set(ver, i));
    return true;
  }
  removeEdge(v1: T, v2: T): boolean {
    // check v1 and v2 exist
    // remove v1's index from v2's LL, remove v2's index from v1's LL
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    if(i === undefined || j === undefined) return false;
    const removeI = this.adjList[i]!.remove(j);
    const removeJ = this.adjList[j]!.remove(i);
    return removeI && removeJ;
  }

  isConnected(v1: T, v2: T): boolean {
    // check v1 and v2 exist
    // iterate v1's LL find v2's index
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    if(i !== undefined && j !== undefined) {
      let temp = this.adjList[i]?.head;
      while(temp) {
        if(temp.value === j) return true;
        temp = temp.next;
      }
    }
    return false;
  }
  getNeighbors(vertex: T): T[] {
    // check vertex exist
    // iterate vertex's LL, convert to it's value, push to array
    const neighbors: T[] = [];
    const index = this.vertexMap.get(vertex);
    if(index === undefined) return neighbors;
    let temp = this.adjList[index]?.head;
    while(temp) {
      const neighbor = this.vertices[temp.value];
      if(neighbor !== undefined) neighbors.push(neighbor);
      temp = temp.next;
    }
    return neighbors;
  }
}