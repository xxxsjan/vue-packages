# utils

## 技术栈

rollup

## 相关工具介绍

### 生成水印

```javaScript
/**
 * id string
 * text string
 * style { 
 *      width :number, 
 *      height :number, 
 *      fontSize:number, 
 *      fontColor:string, 
 *      rotate :number(-180~180) 
 *  }
 */
useWatermark({
    id: 'app',
    text: '水印',
});
```

### TimeStorage: 时效性localStorage

```javaScript
const storage = new TimeStorage()
storage.set({
    key:'test',
    value:{test1:1,test2:2}
    cb:(data)=>{
        console.log(data)
    }
    hours:7
})
const testData = storage.get("test")
console.log(testData)
const removeData = storage.remove("test")
console.log(removeData)

```

### 鼠标跟随样式

```javaScript
// 使用
const instance = useSuperMouse();

// 提供remove 做移除，相关逻辑已封装
instance.remove();

```
