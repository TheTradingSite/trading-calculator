// === GLOBALS ===
const maxItems = 4;
let yourItems = [];
let wantedItems = [];
let currentType = "";

// === INITIAL RENDER ===
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
        <img src="images/${yourItems[i].img}" alt="${yourItems[i].name}" style="width:50px;height:50px;">
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
        <img src="images/${wantedItems[i].img}" alt="${wantedItems[i].name}" style="width:50px;height:50px;">
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

// === UPDATE PRICE SUMMARY ===
function updateSummary() {
  const yourPrice = yourItems.reduce((sum, i) => sum + i.price, 0);
  const wantedPrice = wantedItems.reduce((sum, i) => sum + i.price, 0);

  document.getElementById("your-price").textContent = `$${yourPrice}`;
  document.getElementById("your-value").textContent = `$${yourPrice}`;
  document.getElementById("wanted-price").textContent = `$${wantedPrice}`;
  document.getElementById("wanted-value").textContent = `$${wantedPrice}`;
}

// === INVENTORY MODAL ===
function openInventorySelector() {
  document.getElementById("inventoryModal").style.display = "flex";
}

function closeInventory() {
  document.getElementById("inventoryModal").style.display = "none";
}
