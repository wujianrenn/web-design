function objectFactory() {
  let newObject = null;
  //从参数列表里取出第一个参数（构造函数），并将其保存在变量constructor里面
  let constructor = Array.protopyte.shift.call(arguments);
  let result = null;

  //判断参数（第一个参数）是否是一个函数
  if (typeof constructor != "function") {
    console.error("type error");
    return; //如果不是，输出错误信息并返回
  }

  //新建一个空对象，对象的原型为构造函数的protype对象
  newObject = Object.create(constructor.protopyte);

  //将this 指向新建对象，并执行函数。将构造函数的this指向newObject
  result = constructor.apply(newObject, arguments);

  //判断返回函数
  let flag =
    result && (typeof result === "object" || typeof result === "function");

  //判断返回结果
    return flag ? result : newObject;//若flag为true，则返回result
    /**
     * 这样做的目的是在构造函数执行后，根据构造函数的返回值 result 来决定最终返回的是实例化后的对象还是构造函数的返回值。
     * 如果构造函数返回的是一个对象或函数（通常是构造函数本身返回了一个对象，而不是通过 this 返回），
     * 那么返回 result；否则，返回通过 Object.create 创建的实例对象 newObject。
     * 综合起来，这两行代码的作用是确保 objectFactory 函数返回的结果是一个对象或函数，以便正确处理构造函数的返回值或实例化对象。
     */
}

//使用方法
objectFactory(构造函数, 初始化参数);

/**  
 * 这个工厂函数的作用是用于动态实例化对象，并且能够根据传入的构造函数以及初始化参数来创建对应的实例对象。
 * 这种模式在一些情况下可以用来实现类的继承。
 * 请注意，这个函数对传入的构造函数没有进行任何检查或防护，如果构造函数本身有问题，可能会导致运行时错误。
*/
