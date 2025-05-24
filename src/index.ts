interface MyIterator<T> {
  hasNext: () => boolean;
  next: () => T;
}

interface MyIterable<T> {
  iterator: () => MyIterator<T>;
}

type Pikmin = {
  color: "red" | "blue" | "yellow";
};

class PikminIterator implements MyIterator<Pikmin> {
  #index: number = 0;
  #pikminGroup: PikminGroup;

  constructor(pikminGroup: PikminGroup) {
    this.#pikminGroup = pikminGroup;
  }

  hasNext() {
    return this.#index < this.#pikminGroup.getLength();
  }

  next() {
    if (!this.hasNext()) {
      throw new Error("There's no more Pikmin.");
    }
    const pikmin = this.#pikminGroup.getPikminAt(this.#index);
    this.#index++;
    return pikmin;
  }
}

class PikminGroup implements MyIterable<Pikmin> {
  #pikmins: Map<number, Pikmin>;
  iterator = () => new PikminIterator(this);

  constructor(pikmins: Map<number, Pikmin>) {
    this.#pikmins = pikmins;
  }

  getLength() {
    return this.#pikmins.size;
  }

  getPikminAt(index: number) {
    const pikmin = this.#pikmins.get(index);
    if (!pikmin) {
      throw new Error("There's no more Pikmin.");
    }
    return pikmin;
  }
}

class Player {
  #pikminGroup: PikminGroup;

  constructor(pikminGroup: PikminGroup) {
    this.#pikminGroup = pikminGroup;
  }

  throwAllPikmins() {
    const iterator = this.#pikminGroup.iterator();
    if (!iterator.hasNext()) {
      console.log("Missed!");
    }
    while (iterator.hasNext()) {
      const pikmin = iterator.next();
      console.log(`Threw a ${pikmin.color} pikmin.`);
    }
  }
}

const pikminMap = new Map([
  [0, { color: "red" }],
  [1, { color: "red" }],
  [2, { color: "blue" }],
  [3, { color: "yellow" }],
] as const);
const pikminGroup = new PikminGroup(pikminMap);
const player = new Player(pikminGroup);
player.throwAllPikmins();
