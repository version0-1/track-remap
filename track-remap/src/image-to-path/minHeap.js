/**
 * Binary min-heap ordered by f (for A* open list)
 */
export class MinHeapF {
  constructor() {
    /** @type {{ x: number, y: number, f: number, g: number }[]} */
    this.a = [];
  }

  /**
   * @param {{ x: number, y: number, f: number, g: number }} n
   */
  push(n) {
    const a = this.a;
    a.push(n);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].f <= a[i].f) break;
      const t = a[p];
      a[p] = a[i];
      a[i] = t;
      i = p;
    }
  }

  /**
   * @returns {{ x: number, y: number, f: number, g: number }|undefined}
   */
  pop() {
    const a = this.a;
    if (a.length === 0) return undefined;
    const top = a[0];
    const last = a.pop();
    if (a.length === 0) return top;
    a[0] = last;
    let i = 0;
    for (;;) {
      const l = i * 2 + 1;
      const r = l + 1;
      let smallest = i;
      if (l < a.length && a[l].f < a[smallest].f) smallest = l;
      if (r < a.length && a[r].f < a[smallest].f) smallest = r;
      if (smallest === i) break;
      const t = a[i];
      a[i] = a[smallest];
      a[smallest] = t;
      i = smallest;
    }
    return top;
  }

  get length() {
    return this.a.length;
  }
}
