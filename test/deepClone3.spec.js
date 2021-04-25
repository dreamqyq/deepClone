const chai = require("chai");

const assert = chai.assert;
const deepClone = require("../src/deepClone3");
describe("deepClone3 能复制特殊对象", () => {
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
    const bi = 12345678901234567890n;
    const bi2 = deepClone(bi);
    assert(bi === bi2);
  });
  describe("对象", () => {
    it("能够复制普通对象", () => {
      const a = { name: "Enoch", child: { name: "little Enoch" } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });
    it("自动跳过原型属性", () => {
      const a = Object.create({ name: "a" });
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert.isFalse("name" in a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("能够复制数组对象", () => {
      const a = [
        [11, 12],
        [21, 22],
        [31, 32]
      ];
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a[0] !== a2[0]);
      assert(a[1] !== a2[1]);
      assert(a[2] !== a2[2]);
      assert.deepEqual(a, a2);
    });
    it("能够复制函数", () => {
      const a = function (x, y) {
        return x + y;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert(a(1, 2) === a2(1, 2));
    });
    it("可以复制正则表达式", () => {
      //   const a = /hi\d+/gi;
      const a = new RegExp("hi\\d+", "gi");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a.source === a2.source);
      assert(a.flags === a2.flags);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("可以复制日期", () => {
      const a1 = new Date();
      a1.xxx = { yyy: { zzz: 1 } };
      const a2 = new Date("2013-03-01T01:10:00");
      a2.xxx = { yyy: { zzz: 1 } };
      const b1 = deepClone(a1);
      const b2 = deepClone(a2);
      assert(a1 !== b1);
      assert(a1.getTime() === b1.getTime());
      assert(a1.xxx.yyy.zzz === b1.xxx.yyy.zzz);
      assert(a1.xxx.yyy !== b1.xxx.yyy);
      assert(a1.xxx !== b1.xxx);
      assert(a2 !== b2);
      assert(a2.getTime() === b2.getTime());
      assert(a2.xxx.yyy.zzz === b2.xxx.yyy.zzz);
      assert(a2.xxx.yyy !== b2.xxx.yyy);
      assert(a2.xxx !== b2.xxx);
    });
    it("能够复制 Boolean", () => {
      const a = new Boolean(true);
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.valueOf() === a2.valueOf());
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("能够复制 Error", () => {
      const a = new Error("error");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.message === a2.message);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("能够复制 Map", () => {
      const a = new Map();
      const o = { x: 1, y: 2 };
      a.set("name", "Enoch");
      a.set("obj", o);
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.get("name") === a2.get("name"));
      assert(a.get("obj") !== a2.get("obj"));
      assert(a.get("obj").x === a2.get("obj").x);
      assert(a.get("obj").y === a2.get("obj").y);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("能够复制 Set", () => {
      const a = new Set();
      const o = { name: "Enoch" };
      a.add(o);
      a.add(1);
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      const aValues = a.values();
      const a2Values = a2.values();
      assert(a !== a2);
      assert(aValues.next().value !== a2Values.next().value);
      assert(a.values().next().value.name === a2.values().next().value.name);
      assert(aValues.next().value === a2Values.next().value);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("能够复制 Number", () => {
      const a = new Number("123");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.valueOf() === a2.valueOf());
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("能够复制 String", () => {
      const a = new String("123");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.valueOf() === a2.valueOf());
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("很复杂的对象", () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol()
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol()
          }
        ]
      };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert.isNaN(a2.n);
      assert(a.n2 === a2.n2);
      assert(a.s === a2.s);
      assert(a.bool === a2.bool);
      assert(a.null === a2.null);
      assert(a.u === a2.u);
      assert(a.sym === a2.sym);
      assert(a.o !== a2.o);
      assert.isNaN(a2.o.n);
      assert(a.o.n2 === a2.o.n2);
      assert(a.o.s === a2.o.s);
      assert(a.o.bool === a2.o.bool);
      assert(a.o.null === a2.o.null);
      assert(a.o.u === a2.o.u);
      assert(a.o.sym === a2.o.sym);
      assert(a.array !== a2.array);
      assert(a.array[0] !== a2.array[0]);
      assert.isNaN(a2.array[0].n);
      assert(a.array[0].n2 === a2.array[0].n2);
      assert(a.array[0].s === a2.array[0].s);
      assert(a.array[0].bool === a2.array[0].bool);
      assert(a.array[0].null === a2.array[0].null);
      assert(a.array[0].u === a2.array[0].u);
      assert(a.array[0].sym === a2.array[0].sym);
    });
  });
});
