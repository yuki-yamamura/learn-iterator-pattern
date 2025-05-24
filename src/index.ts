interface MyIterator<T> {
  hasNext: boolean;
  next: () => T;
}

interface MyIterable<T> {
  iterator: () => MyIterator<T>;
}

type Pikumin = {
  color: "red" | "blue" | "yellow";
};

class PikuminIterator implements MyIterator<Pikumin> {
  #index: number = 0;
  #pikuminGroup: PikuminGroup;

  constructor(pikuminGroup: PikuminGroup) {
    this.#pikuminGroup = pikuminGroup;
  }

  get hasNext() {
    return this.#index < this.#pikuminGroup.getLength();
  }

  next() {
    if (!this.hasNext) {
      throw new Error("There's no more Pikumin.");
    }
    const pikumin = this.#pikuminGroup.getPikuminAt(this.#index);
    this.#index++;
    return pikumin;
  }
}

class PikuminGroup implements MyIterable<Pikumin> {
  #pikumins: Map<number, Pikumin>;
  iterator = () => new PikuminIterator(this);

  constructor(pikumins: Map<number, Pikumin>) {
    this.#pikumins = pikumins;
  }

  getLength() {
    return this.#pikumins.size;
  }

  getPikuminAt(index: number) {
    const pikumin = this.#pikumins.get(index);
    if (!pikumin) {
      throw new Error("There's no more Pikumin.");
    }
    return pikumin;
  }
}

class Player {
  #pikuminGroup: PikuminGroup;

  constructor(pikuminGroup: PikuminGroup) {
    this.#pikuminGroup = pikuminGroup;
  }

  throwAllPikumin() {
    const iterator = this.#pikuminGroup.iterator();
    if (!iterator.hasNext) {
      console.log("Missed!");
    }
    while (iterator.hasNext) {
      const pikumin = iterator.next();
      console.log(`Threw a ${pikumin.color} pikumin.`);
    }
  }
}

//
const pikuminMap = new Map([
  [0, { color: "red" }],
  [1, { color: "red" }],
  [2, { color: "blue" }],
  [3, { color: "yellow" }],
] as const);
const pikuminGroup = new PikuminGroup(pikuminMap);
const player = new Player(pikuminGroup);
player.throwAllPikumin();
