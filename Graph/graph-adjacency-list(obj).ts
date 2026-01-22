class Graph<T extends string | number> {
  private adjacencyList: Map<T, T[]>;
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: T): void {
    if(!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  addEdge(v1: T, v2: T): void {
    if(!this.adjacencyList.has(v1) || !this.adjacencyList.has(v2)) return;
    if(!this.adjacencyList.get(v1)?.includes(v2)) {
      this.adjacencyList.get(v1)?.push(v2);
      this.adjacencyList.get(v2)?.push(v1);
    }
  }
  removeVertex(vertex: T): boolean {
    if(!this.adjacencyList.get(vertex)) return false;
    this.adjacencyList.forEach((value, key) => {
      if(value.includes(vertex)) this.adjacencyList.set(key, value.filter(v => v !== vertex))
    })
    return this.adjacencyList.delete(vertex);
  }
  removeEdge(v1: T, v2: T): boolean {
    const neighbor1 = this.adjacencyList.get(v1);
    const neighbor2 = this.adjacencyList.get(v2);
    if(neighbor1 === undefined || neighbor2 === undefined) return false;
    this.adjacencyList.set(v1, neighbor1.filter(v => v !== v2));
    this.adjacencyList.set(v2, neighbor2.filter(v => v !== v1));
    return true;
  }
  isConnected(v1: T, v2: T): boolean {
    const neighbors1 = this.adjacencyList.get(v1);
    const neighbors2 = this.adjacencyList.get(v2);
    if(!neighbors1 || !neighbors2) return false;
    return neighbors1.includes(v2) && neighbors2.includes(v1);
  }
  getNeighbors(vertex: T): T[] {
    return this.adjacencyList.get(vertex) || [];
  }
}

