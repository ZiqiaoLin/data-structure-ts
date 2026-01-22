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
    if(this.vertexMap.has(vertex)) return;
    const index = this.vertices.length;
    this.vertexMap.set(vertex, index);
    this.vertices.push(vertex);
    const newLinkedList: LinkedList<number> = new LinkedList();
    this.adjList.push(newLinkedList);
  }
  addEdge(v1: T, v2: T): void {
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    if(i === undefined || j === undefined) throw new Error('Vertices not found');
    if(!this.isConnected(v1, v2)) {
      this.adjList[i]!.push(j);
      this.adjList[j]!.push(i);
    }
  }
  removeVertex(vertex: T): boolean {
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
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    if(i === undefined || j === undefined) return false;
    const removeI = this.adjList[i]!.remove(j);
    const removeJ = this.adjList[j]!.remove(i);
    return removeI && removeJ;
  }

  isConnected(v1: T, v2: T): boolean {
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