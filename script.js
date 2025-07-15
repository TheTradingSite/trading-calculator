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

  const renderSlot = (container, items, type, index) => {
    const div = document.createElement("div");
    div.className = "item";

    if (items[index]) {
      const item = items[index];
      div.innerHTML = `
        <img src="images/${item.img}" style="width:50px;height:50px;">
        <p>${item.name}</p>
        <small>$${item.price}</small>
      `;
      div.onclick = () => removeItem(type, index);
    } else {
      div.textContent = "+ Add Item";
      div.onclick = () => addItem(type);
    }

    container.appendChild(div);
  };

  for (let i = 0; i < maxItems; i++) {
    renderSlot(yourItemsContainer, yourItems, "your", i);
    renderSlot(wantedItemsContainer, wantedItems, "wanted", i);
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
    div.innerHTML = `
      <img src="images/${item.img}" style="width:40px;height:40px;display:block;margin:0 auto 5px;">
      ${item.name}<br>
      <small>$${item.price} | $${item.value}</small>
    `;
    div.onclick = () => selectItem(item);
    grid.appendChild(div);
  });

  document.getElementById("inventoryModal").style.display = "block";
}

function closeInventory() {
  document.getElementById("inventoryModal").style.display = "none";
}

// ✅ === FIXED SELECT ITEM (Toggle version) ===
function selectItem(item) {
  let arr = currentType === "your" ? yourItems : wantedItems;
  const index = arr.findIndex(i => i.name === item.name);

  if (index !== -1) {
    arr.splice(index, 1); // ✅ Remove if already selected
  } else if (arr.length < maxItems) {
    arr.push(item); // ✅ Add if space available
  }

  renderItems();
  closeInventory();
}

// === PRICE SUMMARY ===
function updateSummary() {
  const sum = arr => arr.reduce((total, item) => total + item.price, 0);
  document.getElementById("your-price").textContent = `$${sum(yourItems)}`;
  document.getElementById("wanted-price").textContent = `$${sum(wantedItems)}`;
}

// === SWAP BUTTON FUNCTIONALITY ===
function swapTrades() {
  const button = document.querySelector(".swap-button");
  const yourItemsGrid = document.getElementById("yourItems");
  const wantedItemsGrid = document.getElementById("wantedItems");

  // Spin animation
  button.classList.add("spin");

  // === Swap the contents of the two trade columns ===
  const tempHTML = yourItemsGrid.innerHTML;
  yourItemsGrid.innerHTML = wantedItemsGrid.innerHTML;
  wantedItemsGrid.innerHTML = tempHTML;

  // === Swap totals ===
  const yourPrice = document.getElementById("yourPrice").innerText;
  const yourValue = document.getElementById("yourValue").innerText;
  const wantedPrice = document.getElementById("wantedPrice").innerText;
  const wantedValue = document.getElementById("wantedValue").innerText;

  document.getElementById("yourPrice").innerText = wantedPrice;
  document.getElementById("yourValue").innerText = wantedValue;
  document.getElementById("wantedPrice").innerText = yourPrice;
  document.getElementById("wantedValue").innerText = yourValue;

  // Remove spin class after 0.5s so it can trigger again
  setTimeout(() => {
    button.classList.remove("spin");
  }, 500);
}

