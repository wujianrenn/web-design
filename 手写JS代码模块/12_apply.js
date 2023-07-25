//apply函数实现
Function.prototype.myApply = function (context) {//在它的原型上添加一个自定义方法，模拟原生的apply方法，这样所有的函数对象都可以使用这个自定义的方法了
    //判断调用对象是否为函数（调用者必须是函数！）
    if (typeof this != 'function') {
        throw new TypeError('Error');
    }

    let result = null;//用于保存函数调用后的结果
    //判断context是否存在，如果未传入（或传入的值是null、undefined）则为window
    context = context || window;
    //将函数设为对象的方法
    context.fn = this;//this表示当前执行函数的上下文。此处即为把函数this设为context对象的fn方法了，this指向这个对象，函数可以访问到context的属性和方法
    //调用方法
    if (arguments[1]) {//检查传入的参数是否包含第二个参数[1]
        result = context.fn(...arguments[1]);//若包含则解构传给.fn
    } else {
        result = context.fn();//不包含，直接调用
    }

    //将属性删除
    delete context.fn;//防止context对象里出现无用的属性
    return result
}


/**    
 * 总的来说，这段代码实现了一个简单的 apply 方法的模拟。
 * 它允许你在指定的上下文中调用一个函数，并传递一个数组或类数组对象作为参数。
 * 类似于原生的 apply 方法，这个 myApply 方法改变了函数的执行上下文，并立即执行函数。
 * 注意，在实际开发中，我们通常使用原生的 apply 方法，因为它是 JavaScript 提供的标准方法，同时它也能接收真正的数组作为参数，而不仅限于类数组对象。
 */



/**    
 * apply 函数的实现步骤：
        判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
        判断传入上下文对象是否存在，如果不存在，则设置为 window 。
        将函数作为上下文对象的一个属性。
        判断参数值是否传入
        使用上下文对象来调用这个方法，并保存返回结果。
        删除刚才新增的属性
        返回结果
 */