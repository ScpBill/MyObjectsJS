class MyMap {
    #entries = [];
    constructor(iterable = null) {
        if (iterable === null || iterable === undefined) return;

        if (typeof iterable[Symbol.iterator] !== 'function') {
            let nameOfObject = `${typeof iterable + iterable instanceof Object ? '' : ' ' + iterable}`;
            throw new TypeError(`${nameOfObject} is not iterable (cannot read property ${Symbol.iterator})`);
        }
        for (let entry of iterable) {
            if (!(entry instanceof Object)) {
                throw new TypeError(`Iterator value ${entry} is not an entry object`)
            }
            let indexEntry = this.#entries.indexOf(entry[0]);
            if (indexEntry === -1) {
                this.#entries.push({ key: entry[0], value: entry[1] });
            } else {
                this.#entries[indexEntry].value = entry[1];
            }
        }
    }
    static groupBy(items, callbackFn) {
        const mapObj = new this();
        items.forEach((item) => {
            let keyValue = callbackFn(item);
            mapObj.set(keyValue, item);
        });
        return mapObj;
    }
    get size() {
        return this.#entries.length;
    }
    set size(value) {
        return value;
    }
    get [Symbol.toStringTag]() {
        return 'MyMap';
    }
    clear() {
        this.#entries = [];
    }
    delete(key) {
        let indexKey = this.#entries.findIndex(x => x.key == key);
        if (indexKey !== -1) {
            this.#entries.splice(indexKey, 1);
            return true;
        } else {
            return false;
        }
    }
    *entries() {
        for (let entry of this.#entries) {
            yield entry;
        }
    }
    forEach(callbackFn, thisArg = null) {
        for (let i = 0; i < this.#entries.length; i++) {
            callbackFn.call(thisArg || globalThis, this.#entries[i].value, this.#entries[i].key, this);
        }
    }
    get(key) {
        let indexKey = this.#entries.findIndex(x => x.key == key);
        return indexKey === -1 ? undefined : this.#entries[indexKey].value;
    }
    has(key) {
        return this.#entries.some(x => x.key == key);
    }
    *keys() {
        for (let entry of this.#entries) {
            yield entry.key;
        }
    }
    set(key, value) {
        let indexKey = this.#entries.findIndex(x => x.key == key);
        if (indexKey !== -1) {
            this.#entries[indexKey].value = value;
        } else {
            this.#entries.push({ key, value });
        }
    }
    values() {
        for (let entry of this.#entries) {
            yield entry.value;
        }
    }
    *[Symbol.iterator]() {
        yield* this.entries();
    }
}
