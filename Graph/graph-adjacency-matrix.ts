class Graph <T extends number | string>{
  private vertices: T[];
  private matrix: number[][];
  private vertexMap: Map<T, number>;
  constructor() {
    this.vertices = [];
    this.matrix = [];
    this.vertexMap = new Map();
  }

  addVertex(vertex: T): void {
    if(this.vertexMap.has(vertex)) return;
    const newIndex = this.vertices.length;
    this.vertexMap.set(vertex, newIndex);
    this.vertices.push(vertex);
    for(let i = 0; i < this.matrix.length; i++) {
      this.matrix[i]?.push(0);
    }
    const newRow = new Array(this.vertices.length).fill(0);
    this.matrix.push(newRow);
  }
  addEdge(v1: T, v2: T): void {
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    if(i !== undefined && j !== undefined) {
      this.matrix[i]![j] = 1;
      this.matrix[j]![i] = 1;
    } else {
      throw new Error('no vertex found!');
    }
  }
  removeVertex(vertex: T): boolean {
    const vertexIndex = this.vertexMap.get(vertex);
    if(vertexIndex === undefined) return false;
    for(let i = 0; i < this.matrix.length; i++) {
      this.matrix[i]?.splice(vertexIndex, 1);
    }
    this.matrix.splice(vertexIndex, 1);
    this.vertices.splice(vertexIndex, 1);
    this.vertexMap.clear();
    this.vertices.forEach((ver, i) => this.vertexMap.set(ver, i));
    return true;
  }
  removeEdge(v1: T, v2: T): boolean {
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    if(i !== undefined && j !== undefined && this.matrix[i]![j] === 1) {
      this.matrix[i]![j] = 0;
      this.matrix[j]![i] = 0;
      return true;
    }
    return false;
  }
  isConnected(v1: T, v2: T): boolean {
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    return i !== undefined && j !== undefined && this.matrix[i]![j] === 1;
  }
  getNeighbors(vertex: T): T[] {
    const index = this.vertexMap.get(vertex);
    if(index === undefined) return [];
    const neighbors: T[] = [];
    this.matrix[index]?.forEach((ver, i) => {
      if(ver === 1) {
        const neighbor = this.vertices[i];
        if(neighbor !== undefined)  neighbors.push(neighbor);
      }
    })
    return neighbors;
  }
  printMatrix(): void {
    console.log("Vertices index mapping:", Array.from(this.vertexMap.entries()));
    console.table(this.matrix);
  }

}

const myGraph = new Graph<string>();

myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
myGraph.addVertex("D");

myGraph.addEdge("A", "B");
myGraph.addEdge("A", "C");
myGraph.addEdge("B", "D");

console.log(myGraph.isConnected("A", "B")); // true
console.log(myGraph.isConnected("C", "D")); // false

console.log(myGraph.getNeighbors("A")); // ['B', 'C']

myGraph.printMatrix();

