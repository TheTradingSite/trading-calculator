// === GLOBALS ===
const maxItems = 4;
let yourItems = [];
let wantedItems = [];
let currentType = "";
let selectedItem = null;

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

  // Bind variation buttons safely
  const variationBtns = document.querySelectorAll(".variation-btn");
  variationBtns.forEach(btn => {
    btn.addEventListener("click", () => handleVariationClick(btn));
  });

  const swapBtn = document.querySelector(".swap-button");
  if (swapBtn) swapBtn.addEventListener("click", swapTrades);
});

// === RENDER ITEMS ===
function renderItems() {
  const yourItemsContainer = document.getElementById("your-items");
  const wantedItemsContainer = document.getElementById("wanted-items");
  if (!yourItemsContainer || !wantedItemsContainer) return;

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
        ${item.variation ? `<span class="variation-tag ${item.variation}">${item.variation}</span>` : ""}
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
  (type === "your" ? yourItems : wantedItems).splice(index, 1);
  renderItems();
}

// === INVENTORY MODAL ===
function openInventorySelector() {
  const grid = document.getElementById("inventoryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  inventoryData.forEach(item => {
    const div = document.createElement("div");
    div.className = "inventory-item";
    div.innerHTML = `
      <img src="images/${item.img}" style="width:40px;height:40px;display:block;margin:0 auto 5px;">
      ${item.name}<br><small>$${item.price} | $${item.value}</small>
    `;
    div.onclick = () => selectItem(item);
    grid.appendChild(div);
  });

  document.getElementById("inventoryModal").style.display = "block";
}
function closeInventory() {
  document.getElementById("inventoryModal").style.display = "none";
}

// === SELECT ITEM ===
function selectItem(item) {
  selectedItem = item;
  closeInventory();
  openVariation();
}

// === VARIATION MODAL ===
function openVariation() {
  document.getElementById("variationModal").style.display = "flex";
}
function closeVariation() {
  document.getElementById("variationModal").style.display = "none";
}
function handleVariationClick(btn) {
  let variation = btn.dataset.type;
  let newItem = { ...selectedItem };

  switch (variation) {
    case "gold": newItem.price *= 1.5; newItem.value *= 1.5; break;
    case "diamond": newItem.price *= 2; newItem.value *= 2; break;
    case "rainbow": newItem.price *= 2.5; newItem.value *= 2.5; break;
    case "candy": newItem.price *= 3; newItem.value *= 3; break;
  }
  newItem.price = Math.round(newItem.price);
  newItem.value = Math.round(newItem.value);
  newItem.variation = variation !== "default" ? variation : "";

  let arr = currentType === "your" ? yourItems : wantedItems;
  if (arr.length < maxItems) arr.push(newItem);

  renderItems();
  closeVariation();
}

// === PRICE SUMMARY ===
function updateSummary() {
  const sum = arr => arr.reduce((total, item) => total + item.price, 0);
  const yp = document.getElementById("your-price");
  const wp = document.getElementById("wanted-price");
  if (yp) yp.textContent = `$${sum(yourItems)}`;
  if (wp) wp.textContent = `$${sum(wantedItems)}`;
}

// === SWAP BUTTON FUNCTIONALITY ===
function swapTrades() {
  const button = document.querySelector(".swap-button");
  if (!button) return;
  button.classList.add("spin");
  [yourItems, wantedItems] = [wantedItems, yourItems];
  renderItems();
  setTimeout(() => button.classList.remove("spin"), 1000);
}
