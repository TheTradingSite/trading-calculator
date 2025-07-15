// === GLOBAL VARIABLES ===
let currentSlot = null;
let currentType = "";

// ✅ Example Inventory Data
const inventoryData = [
  { name: "Golden Crown", price: 500, value: 700 },
  { name: "Emerald Sword", price: 300, value: 400 },
  { name: "Ruby Staff", price: 200, value: 250 },
  { name: "Mystic Armor", price: 450, value: 600 },
  { name: "Dragon Egg", price: 800, value: 1000 },
  { name: "Silver Ring", price: 100, value: 150 }
];

// === OPEN INVENTORY ===
function openInventory(slot, type) {
  currentSlot = slot;
  currentType = type;
  document.getElementById("inventoryModal").style.display = "flex";
  loadInventory();
}

// === CLOSE INVENTORY ===
function closeInventory() {
  document.getElementById("inventoryModal").style.display = "none";
}

// === LOAD INVENTORY ===
function loadInventory() {
  const inventoryGrid = document.getElementById("inventoryGrid");
  inventoryGrid.innerHTML = "";
  inventoryData.forEach(item => {
    const div = document.createElement("div");
    div.className = "inventory-item";
    div.innerText = item.name;
    div.onclick = () => selectItem(item);
    inventoryGrid.appendChild(div);
  });
}

// === SELECT ITEM ===
function selectItem(item) {
  currentSlot.innerText = item.name;
  currentSlot.dataset.price = item.price;
  currentSlot.dataset.value = item.value;
  currentSlot.style.color = "#3cb371";
  closeInventory();
  updateTotals(currentType);
}

// === UPDATE TOTALS ===
function updateTotals(type) {
  let totalPrice = 0, totalValue = 0;
  document.querySelectorAll(`#${type}Items .item-slot`).forEach(slot => {
    totalPrice += parseInt(slot.dataset.price || 0, 10);
    totalValue += parseInt(slot.dataset.value || 0, 10);
  });
  document.getElementById(`${type}Price`).innerText = `$${totalPrice}`;
  document.getElementById(`${type}Value`).innerText = `$${totalValue}`;
}

// === SWAP SIDES (OPTIONAL FEATURE) ===
function swapSides() {
  document.querySelector(".swap-button").classList.add("spin");
  setTimeout(() => {
    document.querySelector(".swap-button").classList.remove("spin");
  }, 500);

  // Swap values visually (optional: implement swapping logic)
}
