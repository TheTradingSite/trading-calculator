// === GLOBALS ===
const maxItems = 4;
let yourItems = [];
let wantedItems = [];
let currentType = "";

// ✅ Example Inventory Data
const inventoryData = [
  { name: "Golden Crown", price: 500, value: 700, img: "golden-crown.png" },
  { name: "Emerald Sword", price: 300, value: 400, img: "emerald-sword.png" },
  { name: "Ruby Staff", price: 200, value: 250, img: "ruby-staff.png" },
  { name: "Mystic Armor", price: 450, value: 600, img: "mystic-armor.png" },
  { name: "Dragon Egg", price: 800, value: 1000, img: "dragon-egg.png" },
  { name: "Silver Ring", price: 100, value: 150, img: "silver-ring.png" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderItems();
});

// === RENDER ITEMS ===
function renderItems() {
  const yourItemsContainer = document.getElementById("your-items");
  const wantedItemsContainer = document.getElementById("wanted-items");
  yourItemsContainer.innerHTML = "";
  wantedItemsContainer.innerHTML = "";

  for (let i = 0; i < maxItems; i++) {
    const yourDiv = document.createElement("div");
    yourDiv.className = "item";

    if (yourItems[i]) {
      yourDiv.innerHTML = `
        <img src="images/${yourItems[i].img}" style="width:50px;height:50px;">
        <p>${yourItems[i].name}</p>
        <small>$${yourItems[i].price}</small>
      `;
      yourDiv.onclick = () => removeItem("your", i);
    } else {
      yourDiv.textContent = "+ Add Item";
      yourDiv.onclick = () => addItem("your");
    }
    yourItemsContainer.appendChild(yourDiv);
  }

  for (let i = 0; i < maxItems; i++) {
    const wantedDiv = document.createElement("div");
    wantedDiv.className = "item";

    if (wantedItems[i]) {
      wantedDiv.innerHTML = `
        <img src="images/${wantedItems[i].img}" style="width:50px;height:50px;">
        <p>${wantedItems[i].name}</p>
        <small>$${wantedItems[i].price}</small>
      `;
      wantedDiv.onclick = () => removeItem("wanted", i);
    } else {
      wantedDiv.textContent = "+ Add Item";
      wantedDiv.onclick = () => addItem("wanted");
    }
    wantedItemsContainer.appendChild(wantedDiv);
  }

  updateSummary();
}

// === ADD & REMOVE ITEMS ===
function addItem(type) {
  currentType = type;
  openInventorySelector();
}

function removeItem(type, index) {
  if (type === "your") {
    yourItems.splice(index, 1);
  } else {
    wantedItems.splice(index, 1);
  }
  renderItems();
}

// === INVENTORY MODAL ===
function openInventorySelector() {
  const grid = document.getElementById("inventoryGrid");
  grid.innerHTML = "";
  inventoryData.forEach(item => {
    const div = document.createElement("div");
    div.className = "inventory-item";
    div.innerHTML = `${item.name}<br>$${item.price} | $${item.value}`;
    div.onclick = () => selectItem(item);
    grid.appendChild(div);
  });
  document.getElementById("inventoryModal").style.display = "block";
}

function closeInventory() {
  document.getElementById("inventoryModal").style.display = "none";
}

function selectItem(item) {
  if (currentType === "your") {
    if (yourItems.length < maxItems) yourItems.push(item);
  } else {
    if (wantedItems.length < maxItems) wantedItems.push(item);
  }
  renderItems();
  closeInventory();
}

// === PRICE SUMMARY ===
function updateSummary() {
  const yourPrice = yourItems.reduce((sum, i) => sum + i.price, 0);
  const wantedPrice = wantedItems.reduce((sum, i) => sum + i.price, 0);
  document.getElementById("your-price").textContent = `$${yourPrice}`;
  document.getElementById("wanted-price").textContent = `$${wantedPrice}`;
}

// === SWAP TRADES ===
function swapTrades() {
  [yourItems, wantedItems] = [wantedItems, yourItems];
  renderItems();
}
