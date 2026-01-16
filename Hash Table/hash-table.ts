class HashTable<T> {
  // separate chaining
  private dataMap: Array<Array<[string, T]>>;
  constructor(size = 7) {
    this.dataMap = new Array(size);
  }

  private _hash(key: string): number {
    let hash = 0;
    for(let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
    }
    return hash;
  }

  set(key: string, value: T): this {
    const index = this._hash(key);
    if(!this.dataMap[index]) this.dataMap[index] = [];
    const bucket = this.dataMap[index]!;
    for(let i = 0; i < bucket.length; i++) {
      const item = bucket[i];
      if(item && item[0] === key) {
        item[1] = value;
        return this;
      }
    }
    bucket.push([key, value]);
    return this;
  }

  get(key: string): T | undefined {
    const index = this._hash(key);
    if(!this.dataMap[index]) return undefined;
    const bucket = this.dataMap[index];
    for(let i = 0; i < bucket.length; i++) {
      const item = bucket[i];
      if(item && item[0] === key) {
        return item[1];
      }
    }
    return undefined;
  }

  remove(key: string): T | undefined {
    const index = this._hash(key);
    if(!this.dataMap[index]) return undefined;
    const bucket = this.dataMap[index];
    for(let i = 0; i < bucket.length; i++) {
      const item = bucket[i];
      if(item && item[0] === key) {
        const value = item[1];
        bucket.splice(i, 1);
        return value;
      }
    }
    return undefined;
  }

  keys(): string[] {
    const keys: string[] = [];
    for(let i = 0; i < this.dataMap.length; i++) {
      const bucket = this.dataMap[i]
      if(bucket) {
        for(let j = 0; j < bucket.length; j++) {
         keys.push(bucket[j]![0]);
        }
      }
    }
    return keys;
  }
  
}

const newHT = new HashTable();
newHT.set('apple', 100);
newHT.set('orange', 500);
newHT.set('orange', 50);
newHT.set('pear', 50);
console.log(newHT.get('orange'));
console.log(newHT.keys())

