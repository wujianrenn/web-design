function getType(value) {
    //判断数据是null的情况
    if (value === null) {
        return value + " ";
    }

    //判断数据是引用类型的情况
    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value),//获取值的类型字符串,返回结果类似于[Object 类型],如[Object, Object]表示对象类型
            type = valueClass.split(" ")[1].split(" ");//获得拆分后数组的第二个元素，即类型名称
        type.pop();//删除类型名称中的最后一个字符，即“]”
        return type.join(" ").toLowerCase();//转小写并返回，如[Object, Object] --> object;  [Object, Array] --> array
    } else {
        //判断数据是基本数据类型的情况和函数的情况
        return typeof value;
    }
}



/**  
 *总的来说，这段代码是一个简单的函数，用于获取传入值的数据类型。
 它对于大部分情况可以正确地判断数据类型，包括基本数据类型、引用类型和 null 类型。
 然而，需要注意的是，对于复杂数据类型如日期对象、正则表达式等，它并不能准确地返回对应的类型名称。
 在实际开发中，可以结合其他方法或库来更全面地处理数据类型的判断和处理。 
*/