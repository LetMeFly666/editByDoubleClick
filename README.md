<!--
 * @Author: LetMeFly
 * @Date: 2026-08-19 12:11:50
 * @LastEditors: LetMeFly.xyz
 * @LastEditTime: 2026-08-20 10:58:32
-->
# Edit by DoubleClick

> 【HTML】双击编辑字段并定位到双击的位置

一个轻量的文件名编辑组件，使用原生 JavaScript，无需任何依赖。

支持：

* 点击 ✏️ 编辑文件名
* 双击文件名编辑
* 双击时光标定位到点击位置
* 再次点击 ✏️ 时恢复上次光标位置
* 点击其他页面区域完成编辑
* 切换窗口不会自动结束编辑
* 使用浏览器原生 Selection API，不计算字符宽度

## 使用

引入 `main.js`：

```html
<script src="https://editByDoubleClick.LetMeFly.xyz/main.js"></script>
```

准备一个容器：

```html
<div id="file"></div>
```

初始化：

```javascript
new FileNameEditor(document.querySelector("#file"), {
    filename: "example.txt",
    size: "12.5 MB",
    onChange(name) {
        console.log("filename:", name);
    }
});
```

### 参数

| 参数         | 类型         | 说明          |
| ---------- | ---------- | ----------- |
| `filename` | `string`   | 文件名         |
| `size`     | `string`   | 文件大小显示文本    |
| `onChange` | `function` | 文件名修改完成后的回调 |

例如：

```javascript
new FileNameEditor(document.querySelector("#file"), {
    filename: "测试文件😀.txt",
    size: "1.2 MB",
    onChange(name) {
        // 保存新的文件名
        console.log(name);
    }
});
```

组件本身不依赖任何框架，直接引入 `main.js` 即可使用。

---

[在线地址](https://editByDoubleClick.LetMeFly.xyz/) · [Github地址](https://github.com/LetMeFly666/editByDoubleClick)

<details><summary>vibe coding · 版权所无</summary>

你设计一个功能 (HTML)：
大概300px长，显示一个文件名（可能会好多行那种）、显示一个文件大小的span，显示一个修改图标（✏️）
可以点击✏️修改文件名，重点在：
也可以双击文件名来修改文件名。
点击修改框的其他位置完成编辑，但是切换到其他页面失去focus的时候不算（可能人家切其他位置复制文件名回来发现光标没了）
如果有过光标定位，再次点击修改按钮而非双击导致修改时，仍然定位到上次结束修改时光标的位置

提示：千万不要算光标定位，各种字体中英文emoji还有各种style，你算不对的
你可能需要增加许多看不到的元素来辅助定位，甚至每个字上都需要设置click事件

</details>
