function hasPrototypeProperty(object, name){		// 判断一个对象的属性是否属于原型，是则 true，不是或属性未定义则 false
  return !object.hasOwnProperty(name) && (name in object);
}

function mix(...mixins) {		// mix函数是Mixin模式的实现，它可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。Mixin模式指的是将多个类的接口“混入”（mix in）另一个类的编程模式。
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

	function copyProperties(target, source) {
	  for (let key of Reflect.ownKeys(source)) {
	    if ( key !== "constructor" && key !== "prototype" && key !== "name" ) {
	      let desc = Object.getOwnPropertyDescriptor(source, key);
	      Object.defineProperty(target, key, desc);
	    }
	  }
	}

  return Mix;
}
