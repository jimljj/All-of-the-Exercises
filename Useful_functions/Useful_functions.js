function hasPrototypeProperty(object, name){		// 判断一个对象的属性是否属于原型，是则 true，不是或属性未定义则 false
  return !object.hasOwnProperty(name) && (name in object);
}