let data = JSON.parse(localStorage.getItem("checklist")) || [
  {
    name: "证件",
    items: [
      { text: "护照", done: false },
      { text: "签证", done: false },
      { text: "身份证", done: false },
      { text: "银行卡", done: false }
    ]
  },
  {
    name: "电子设备",
    items: [
      { text: "充电器", done: false },
      { text: "数据线", done: false },
      { text: "充电宝", done: false }
    ]
  }
];

function save() {
  localStorage.setItem("checklist", JSON.stringify(data));
}

function render() {
  const container = document.getElementById("lists");
  container.innerHTML = "";

  data.forEach((cat, ci) => {
    const div = document.createElement("div");
    div.className = "category";
    div.innerHTML = `<h3>${cat.name}</h3>`;

    cat.items.forEach((item, ii) => {
      const el = document.createElement("div");
      el.className = "item";
      el.draggable = true;

      el.innerHTML = `
        <span>
          <input type="checkbox" ${item.done ? "checked" : ""}
            onchange="toggle(${ci},${ii})">
          ${item.text}
        </span>
      `;

      // 拖拽
      el.addEventListener("dragstart", () => {
        el.classList.add("dragging");
        window.dragIndex = { ci, ii };
      });

      el.addEventListener("dragend", () => {
        el.classList.remove("dragging");
      });

      el.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      el.addEventListener("drop", () => {
        let from = window.dragIndex;
        let to = { ci, ii };

        let item = data[from.ci].items.splice(from.ii, 1)[0];
        data[to.ci].items.splice(to.ii, 0, item);

        save();
        render();
      });

      div.appendChild(el);
    });

    container.appendChild(div);
  });
}

function toggle(ci, ii) {
  data[ci].items[ii].done = !data[ci].items[ii].done;
  save();
}

function addItem() {
  const input = document.getElementById("newItem");
  if (!input.value) return;

  data[0].items.push({ text: input.value, done: false });
  input.value = "";

  save();
  render();
}

// 导出
function exportData() {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "checklist.json";
  a.click();
}

// 导入
function importData(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    data = JSON.parse(reader.result);
    save();
    render();
  };

  reader.readAsText(file);
}

render();
