const maxItems = 4;
let yourItems = [];
let wantedItems = [];
let currentType = "";

// ✅ Render Items
function renderItems() {
  const yourItemsContainer = document.getElementById("your-items");
  const wantedItemsContainer = document.getElementById("wanted-items");

  yourItemsContainer.innerHTML = "";
  wantedItemsContainer.innerHTML = "";

  for (let i = 0; i < maxItems; i++) {
    const item = document.createElement("div");
    item.className = "item";
    if (yourItems[i]) {
      item.textContent = `${yourItems[i].name} ($${yourItems[i].price})`;
      item.onclick = () => removeItem("your", i);
    } else {
      item.classList.add("add-item");
      item.textContent = "+ Add Item";
      item.onclick = () => addItem("your");
    }
    yourItemsContainer.appendChild(item);
  }

  for (let i = 0; i < maxItems; i++) {
    const item = document.createElement("div");
    item.className = "item";
    if (wantedItems[i]) {
      item.textContent = `${wantedItems[i].name} ($${wantedItems[i].price})`;
      item.onclick = () => removeItem("wanted", i);
    } else {
      item.classList.add("add-item");
      item.textContent = "+ Add Item";
      item.onclick = () => addItem("wanted");
    }
    wantedItemsContainer.appendChild(item);
  }

  updateSummary();
}

// ✅ Add & Remove Items
function addItem(type) {
  currentType = type;
  openItemSelector();
}

function removeItem(type, index) {
  if (type === "your") {
    yourItems.splice(index, 1);
  } else {
    wantedItems.splice(index, 1);
  }
  renderItems();
}

// ✅ Update Price Summary
function updateSummary() {
  const yourPrice = yourItems.reduce((sum, i) => sum + i.price, 0);
  const wantedPrice = wantedItems.reduce((sum, i) => sum + i.price, 0);

  document.getElementById("your-price").textContent = yourPrice;
  document.getElementById("wanted-price").textContent = wantedPrice;
  document.getElementById("your-value").textContent = yourPrice;
  document.getElementById("wanted-value").textContent = wantedPrice;
}

// ✅ Swap Button
function swapItems() {
  [yourItems, wantedItems] = [wantedItems, yourItems];
  renderItems();
}

// ✅ Item Selector Modal
const items = [
  { name: "2X BOSS DROPS", img: "bossdrops.png", price: 100 },
  { name: "2X MASTERY", img: "mastery.png", price: 200 },
  { name: "BLADE", img: "blade.png", price: 300 },
  { name: "BUDDHA", img: "buddha.png", price: 400 },
];

const modal = document.getElementById("itemModal");
const itemGrid = document.getElementById("itemGrid");
const searchBox = document.getElementById("searchBox");

function openItemSelector() {
  modal.style.display = "flex";
  displayItems(items);
}

function displayItems(itemList) {
  itemGrid.innerHTML = "";
  itemList.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="images/${item.img}" alt=""><br>${item.name}`;
    div.onclick = () => selectItem(item);
    itemGrid.appendChild(div);
  });
}

function selectItem(item) {
  if (currentType === "your" && yourItems.length < maxItems) {
    yourItems.push(item);
  } else if (currentType === "wanted" && wantedItems.length < maxItems) {
    wantedItems.push(item);
  }
  modal.style.display = "none";
  renderItems();
}

searchBox.addEventListener("input", () => {
  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(searchBox.value.toLowerCase())
  );
  displayItems(filtered);
});

document.getElementById("closeModal").onclick = () =>
  (modal.style.display = "none");

// ✅ Initial render
renderItems();
