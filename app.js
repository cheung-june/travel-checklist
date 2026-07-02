/* ===== 默认数据（已包含你要求的全部物品） ===== */
const defaultData = [
{
name: "证件 / 资金",
items: [
{ text: "护照", done: false },
{ text: "签证", done: false },
{ text: "身份证", done: false },
{ text: "银行卡", done: false },
{ text: "韩元", done: false },
{ text: "电话卡", done: false }
]
},
{
name: "电子设备",
items: [
{ text: "手机", done: false },
{ text: "充电器", done: false },
{ text: "数据线", done: false },
{ text: "充电宝", done: false },
{ text: "转换插头", done: false },
{ text: "相机", done: false },
{ text: "相机电池", done: false }
]
},
{
name: "洗漱 / 个护",
items: [
{ text: "牙刷", done: false },
{ text: "牙膏", done: false },
{ text: "洗面奶", done: false },
{ text: "剃须刀", done: false },
{ text: "毛巾", done: false }
]
},
{
name: "随身杂物",
items: [
{ text: "筷子", done: false },
{ text: "垃圾袋", done: false },
{ text: "奶茶袋", done: false },
{ text: "纸巾", done: false },
{ text: "湿巾", done: false }
]
},
{
name: "衣物",
items: [
{ text: "衣服", done: false },
{ text: "内衣", done: false },
{ text: "袜子", done: false },
{ text: "睡衣", done: false }
]
}
];

/* ===== 初始化 ===== */
let data = JSON.parse(localStorage.getItem("checklist_v2")) || defaultData;

/* ===== 存储 ===== */
function save() {
localStorage.setItem("checklist_v2", JSON.stringify(data));
}

/* ===== 渲染 ===== */
function render() {
const root = document.getElementById("lists");
root.innerHTML = "";

data.forEach((cat, ci) => {
const div = document.createElement("div");
div.className = "category";

/* 分类头 + 添加按钮 */
div.innerHTML = `
  <div class="category-header">
    <h3>${cat.name}</h3>
    <button onclick="toggleAdd(${ci})">＋</button>
  </div>

  <div id="add-${ci}" class="add-input" style="display:none">
    <input id="input-${ci}" placeholder="添加物品">
    <button onclick="addItem(${ci})">添加</button>
  </div>
`;

/* 列表项 */
cat.items.forEach((item, ii) => {
  const el = document.createElement("div");
  el.className = "item";

  el.innerHTML = `
    <input type="checkbox" ${item.done ? "checked" : ""}
      onchange="toggle(${ci},${ii})">
    <span>${item.text}</span>
  `;

  div.appendChild(el);
});

root.appendChild(div);

});
}

/* ===== 勾选 ===== */
function toggle(ci, ii) {
data[ci].items[ii].done = !data[ci].items[ii].done;
save();
}

/* ===== 展开输入框 ===== */
function toggleAdd(ci) {
const el = document.getElementById("add-${ci}");
el.style.display = el.style.display === "none" ? "flex" : "none";
}

/* ===== 添加项 ===== */
function addItem(ci) {
const input = document.getElementById("input-${ci}");
const value = input.value.trim();

if (!value) return;

data[ci].items.push({
text: value,
done: false
});

input.value = "";

save();
render();
}

/* ===== 初始化渲染 ===== */
render();
