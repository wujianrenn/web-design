//函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。(把原本一个函数里的多个参数，均分成每个函数里面一个参数)

// function curry(fn, args) {
//     //获取函数需要的参数长度
//     let length = fn.length;

//     args = args || [];//若未传递参数数组，则初始化为空数组

//     return function () {//返回一个匿名函数，用于接受新传递的参数
//         let subArgs = args.slice(0);//把args里的内容传递给新数组subArgs

//         //拼接得到现有的所有参数
//         for (let i = 0; i < arguments.length; i++) {
//             subArgs.push(arguments[i]);
//         }
        
//         //判断参数的长度是否已经满足函数所需参数的长度
//         if (subArgs.length >= length) {
//             //如果满足，执行函数
//             return fn.apply(this, subArgs);
//         } else {
//             //如果不满足，递归返回柯里化的函数，等待参数的传入
//             return curry.call(this, fn, subArgs);
//         }
//     };
// }


function curry(fn) {
    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      } else {
        return function(...moreArgs) {
          return curried.apply(this, args.concat(moreArgs));
        };
      }
    };
  }
  

//--------------两个功能一致---------------
//es6实现
function curry(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}