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
      throw new Error("There's no more Pikumin");
    }
    const pikumin = this.#pikuminGroup.getPikuminAt(this.#index);
    this.#index++;
    return pikumin;
  }
}

class PikuminGroup implements MyIterable<Pikumin> {
  #pikumins: Pikumin[];
  iterator = () => new PikuminIterator(this);

  constructor(pikumins: Pikumin[]) {
    this.#pikumins = pikumins;
  }

  getLength() {
    return this.#pikumins.length;
  }

  getPikuminAt(index: number) {
    return this.#pikumins[index];
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
const pikumins: Pikumin[] = [
  { color: "red" },
  { color: "red" },
  { color: "blue" },
  { color: "yellow" },
];
const pikuminGroup = new PikuminGroup(pikumins);
const player = new Player(pikuminGroup);
player.throwAllPikumin();
