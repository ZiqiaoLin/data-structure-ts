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
    // check vertex exist
    // if not, set up vertex -> index map
    // push vertex to vertices[]
    // iterate matrix each row push one 0
    // push new array fill with 0 to the matrix
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
    // check v1 and v2 exist
    // if exist, change the matrix value [v1][v2] and [v2][v1] from 0 to 1
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
    // check vertex exist
    // if exist, get its index, iterate matrix each row, remove this rows vertex's index
    // remove it from matrix
    // remove it from vertices
    // reset vertexMap
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
    // check v1 and v2 exist
    // if exist, change matrix [v1][v2] and [v2][v1] from 1 to 0
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
    // check v1 and v2 exist
    // check if matrix[v1][v2] is 1
    const i = this.vertexMap.get(v1);
    const j = this.vertexMap.get(v2);
    return i !== undefined && j !== undefined && this.matrix[i]![j] === 1;
  }
  getNeighbors(vertex: T): T[] {
    // check vertex exist
    // if exist, get it index, iterate matrix[index], push the value = 1's element's value to the array 
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

