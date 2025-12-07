let editIndex = null; // 編集中のデータの位置を記録


// ======= 初期ロード =======
window.addEventListener("load", function () {
  const saved = JSON.parse(localStorage.getItem("devices")) || [];
  saved.forEach((device, index) => addDeviceToList(device, index));
});


// ======= 登録/更新ボタンの処理 =======
document.getElementById("deviceForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const maker = document.getElementById("maker").value;
  const productName = document.getElementById("productName").value;
  const model = document.getElementById("model").value;
  const note = document.getElementById("note").value;

  const saved = JSON.parse(localStorage.getItem("devices")) || [];


  // 編集中かどうか？
  if (editIndex !== null) {

    // ==== 更新処理 ====
    saved[editIndex] = { maker, productName, model, note };
    localStorage.setItem("devices", JSON.stringify(saved));

    document.getElementById("result").innerText =
      `更新しました！`;

    // UI を編集モードから戻す
    document.querySelector("button[type='submit']").textContent = "登録";
    editIndex = null; // 編集解除
  } else {

    // ==== 新規登録 ====
    const newDevice = { maker, productName, model, note };
    saved.push(newDevice);
    localStorage.setItem("devices", JSON.stringify(saved));

    document.getElementById("result").innerText =
      `登録しました！ メーカー: ${maker}, 製品名: ${productName}, 型番: ${model}`;
  }


  // 一覧を再描画
  document.getElementById("deviceList").innerHTML = "";
  saved.forEach((d, i) => addDeviceToList(d, i));


  // 入力欄クリア
  document.getElementById("maker").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("model").value = "";
  document.getElementById("note").value = "";
});



// ======= リスト表示（削除＋編集） =======
function addDeviceToList(device, index) {
  const list = document.getElementById("deviceList");
  const item = document.createElement("li");
  item.textContent = `${device.maker} - ${device.productName} - ${device.model}`;

  // --- 編集ボタン ---
  const editBtn = document.createElement("button");
  editBtn.textContent = "編集";
  editBtn.style.marginLeft = "10px";
  editBtn.onclick = () => editDevice(index);

  // --- 削除ボタン ---
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = () => deleteDevice(index);

  item.appendChild(editBtn);
  item.appendChild(deleteBtn);
  list.appendChild(item);
}



// ======= 編集処理 =======
function editDevice(index) {
  const saved = JSON.parse(localStorage.getItem("devices")) || [];
  const device = saved[index];

  // フォームに値を入れる
  document.getElementById("maker").value = device.maker;
  document.getElementById("productName").value = device.productName;
  document.getElementById("model").value = device.model;
  document.getElementById("note").value = device.note;

  // 編集モードに切り替え
  document.querySelector("button[type='submit']").textContent = "更新";
  editIndex = index;
}



// ======= 削除処理 =======
function deleteDevice(index) {
  const saved = JSON.parse(localStorage.getItem("devices")) || [];
  saved.splice(index, 1);
  localStorage.setItem("devices", JSON.stringify(saved));

  // 再描画
  document.getElementById("deviceList").innerHTML = "";
  saved.forEach((d, i) => addDeviceToList(d, i));
}
