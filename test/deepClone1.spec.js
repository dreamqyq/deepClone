const chai = require("chai");

const assert = chai.assert;
const deepClone = require("../src/deepClone1");
describe("deepClone1 最简单的递归实现", () => {
  it("是一个类", () => {
    assert.isFunction(deepClone);
  });
  it("能够复制基本类型", () => {
    const n = 123;
    const n2 = deepClone(n);
    assert(n === n2);
    const s = "123456";
    const s2 = deepClone(s);
    assert(s === s2);
    const b = true;
    const b2 = deepClone(b);
    assert(b === b2);
    const u = undefined;
    const u2 = deepClone(u);
    assert(u === u2);
    const empty = null;
    const empty2 = deepClone(empty);
    assert(empty === empty2);
    const sym = Symbol();
    const sym2 = deepClone(sym);
    assert(sym === sym2);
  });
  describe("复制对象对象", () => {
    it("能够复制普通对象", () => {
      const a = { name: "Enoch", child: { name: "little Enoch" } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });
  });
});
