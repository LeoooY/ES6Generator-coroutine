// Fundebug
// 链接：https://www.zhihu.com/question/22855484/answer/657320514
/* 
  所谓函数重载(method overloading)，就是函数名称一样，但是输入输出不一样。或者说，允许某个函数有各种不同输入，根据不同的输入，返回不同的结果。凭直觉，函数重载可以通过if…else或者switch实现，这就不去管它了。jQuery之父John Resig提出了一个非常巧(bian)妙(tai)的方法，利用了闭包。从效果上来说，people对象的find方法允许3种不同的输入: 0个参数时，返回所有人名；1个参数时，根据firstName查找人名并返回；2个参数时，根据完整的名称查找人名并返回。难点在于，people.find只能绑定一个函数，那它为何可以处理3种不同的输入呢？它不可能同时绑定3个函数find0,find1与find2啊！这里的关键在于old属性。由addMethod函数的调用顺序可知，people.find最终绑定的是find2函数。然而，在绑定find2时，old为find1；同理，绑定find1时，old为find0。3个函数find0,find1与find2就这样通过闭包链接起来了。根据addMethod的逻辑，当f.length与arguments.length不匹配时，就会去调用old，直到匹配为止。
*/

function addMethod(object, name, f)
{　　
    var old = object[name];　　
    object[name] = function()
    {
        // f.length为函数定义时的参数个数
        // arguments.length为函数调用时的参数个数　　　　
        if (f.length === arguments.length)
        {　　
            return f.apply(this, arguments);　　　　
        }
        else if (typeof old === "function")
        {
            return old.apply(this, arguments);　　　　
        }　　
    };
}


// 不传参数时，返回所有name
function find0()
{　　
    return this.names;
}


// 传一个参数时，返回firstName匹配的name
function find1(firstName)
{　　
    var result = [];　　
    for (var i = 0; i < this.names.length; i++)
    {　　　　
        if (this.names[i].indexOf(firstName) === 0)
        {　　　　　　
            result.push(this.names[i]);　　　　
        }　　
    }　　
    return result;
}


// 传两个参数时，返回firstName和lastName都匹配的name
function find2(firstName, lastName)
{　
    var result = [];　　
    for (var i = 0; i < this.names.length; i++)
    {　　　　
        if (this.names[i] === (firstName + " " + lastName))
        {　　　　　　
            result.push(this.names[i]);　　　　
        }　　
    }　　
    return result;
}


var people = {　　
    names: ["Dean Edwards", "Alex Russell", "Dean Tom"]
};


addMethod(people, "find", find0);
addMethod(people, "find", find1);
addMethod(people, "find", find2);


console.log(people.find()); // 输出["Dean Edwards", "Alex Russell", "Dean Tom"]
console.log(people.find("Dean")); // 输出["Dean Edwards", "Dean Tom"]
console.log(people.find("Dean", "Edwards")); // 输出["Dean Edwards"]