//表示Promise的三种状态
const PENDING = 'pending';//状态：进行中
const RESOLVED = 'resolved';//已完成
const REJECTED = 'rejected';//已拒绝

function MyPromise(fn) {
    //保存初始化状态
    var self = this;

    //初始化状态
    this.state = PENDING;

    //用于保存resolve或者rejected传入的值
    this.value = null;

    //用于保存resolve的回调函数
    this.resolvedCallbacks = [];

    //用于保存reject的回调函数
    this.rejectedCallbacks = [];
    //共有三个属性

    //状态转变为resolved方法，从初始状态“PENDING”转变
    function resolve(value) {
        //判断传入元素是否为Promise值，如果是，则状态改变必须等待前一个状态改变后再进行改变
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }

        //保证代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            //只有状态为pending时才能转变
            if (self.state === PENDING) {
                //修改状态
                self.state = RESOLVED;

                //设置传入的值
                self.value = value;

                //执行回调函数
                self.resolvedCallbacks.forEach(callback => {
                    callback(value);
                });
            }
        }, 0);
    }

    //状态转变为rejected方法
    function reject(value) {
        //保证代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            //只有状态为pending时才能改变
            if (self.state === PENDING) {
                //修改状态
                self.state = REJECTED;

                //设置传入的值
                self.value = value;

                //执行回调函数
                self.rejectedCallbacks.forEach(callback => {
                    callback(value);
                })
            }
        }, 0);
    }

    //将两个方法传入函数执行
    try {
        fn(resolve, reject);
    } catch (e) {
        //遇到错误时，捕获错误，执行reject函数
        reject(e);
    }
}

//用于添加处理Promise状态变化的回调函数
MyPromise.prototype.then = function (onResolved, onRejected) {
    //首先判断两个参数是否为函数类型，因为这两个参数是可选参数
    onResolved =
        typeof onResolved === 'function'
            ? onResolved
            : function (value) {
                return value;
            };
    
    onRejected =
        typeof onRejected === "function"
            ? onRejected
            : function (error) {
                throw error;
            };
    
    //如果是等待状态，则将函数加入到对应列表中
    if (this.state === PENDING) {
        this.resolvedCallbacks.push(onResolved);
        this.rejectedCallbacks.pusn(onRejected);
    }

    //如果状态已经凝固，则直接执行对应状态的函数
    if (this.state === RESOLVED) {
        onResolved(this.value)
    }

    //执行onRejected回调函数并将当前的值存入
    if (this.state === REJECTED) {
        onRejected(this.value)
    }
};


/** 
 * 总结起来，这段代码实现了一个简化版的 Promise，
 * 支持异步操作，并通过 then 方法注册回调函数来处理异步操作的结果。
 * 在异步操作完成后，根据 Promise 的状态变化，
 * 调用相应的回调函数，并将执行器函数传入的值传递给回调函数。
 */

/**  
 * 原生Promise的作用
 * 
 * Promise 是用于处理异步操作的一种机制，它提供了一种更加优雅和可读性更高的方式来管理异步操作的状态和结果。
 * * * * * 在 JavaScript 中，异步操作经常用于处理网络请求、文件读写、定时器等场景，
 * * * * * 而传统的回调函数在处理多个异步操作时可能会导致回调地狱（callback hell）的问题，代码难以维护和理解。
 * Promise 通过将异步操作的结果封装成一个对象，使得我们可以更方便地处理异步操作的状态和结果。
 * * * * * Promise 的状态可以有三种：pending（进行中）、resolved（已完成）和 rejected（已拒绝）。
 * * * * * 当异步操作执行完成时，Promise 的状态从 pending 转变为 resolved 或 rejected，同时可以携带执行结果或错误信息。
 * 在实际的 JavaScript 中，Promise 是原生支持的，通过 Promise 构造函数创建 Promise 实例。
 * * * * * 而在我提供的代码中，MyPromise 类是一个对 Promise 的简化模拟实现，其核心原理和 Promise 是类似的。
 * 这个模拟的代码很像 Promise，因为它采用了 Promise 的核心思想，
 * * * * * 即通过构造函数创建 Promise 实例，在异步操作完成时，
 * * * * * 通过 resolve 和 reject 方法将 Promise 的状态转变为 resolved 或 rejected，并触发相应的回调函数。
 * * * * * 它还实现了 then 方法，用于注册在不同状态下的回调函数。
 * 尽管这个模拟的代码和实际 Promise 有很多相似之处，但也有一些区别。
 * * * * * 实际的 Promise 还支持更多的功能，例如 Promise.all、Promise.race 等方法，以及使用 async/await 语法更加简化的异步操作。
 * * * * * 此外，实际的 Promise 还具有更好的性能和错误处理机制。
 * 总的来说，这个简化的模拟代码是对 Promise 的原理和思想的一种尝试，有助于理解 Promise 的基本工作原理和作用。
 * * * * * 但在实际开发中，我们通常会使用原生的 Promise 或使用现代的异步处理方式，如 async/await，以获得更好的可读性、性能和错误处理能力。
 *  
 */