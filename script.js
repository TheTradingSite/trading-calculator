// === GLOBALS ===
const maxItems = 4;
let yourItems = [];
let wantedItems = [];
let currentType = "";

// === RENDER ITEMS (Grid-Based) ===
function renderItems() {
  const yourItemsContainer = document.getElementById("your-items");
  const wantedItemsContainer = document.getElementById("wanted-items");

  yourItemsContainer.innerHTML = "";
  wantedItemsContainer.innerHTML = "";

  // === Render Your Items ===
  for (let i = 0; i < maxItems; i++) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    if (yourItems[i]) {
      itemDiv.innerHTML = `
        <img src="images/${yourItems[i].img}" alt="${yourItems[i].name}">
        <p>${yourItems[i].name}</p>
        <small>$${yourItems[i].price}</small>
      `;
      itemDiv.style.background = "#4b6cb7"; // ✅ Blue for "Your Items"
      itemDiv.onclick = () => removeItem("your", i);
    } else {
      itemDiv.classList.add("add-item");
      itemDiv.textContent = "+ Add Item";
      itemDiv.onclick = () => addItem("your");
    }
    yourItemsContainer.appendChild(itemDiv);
  }

  // === Render Wanted Items ===
  for (let i = 0; i < maxItems; i++) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    if (wantedItems[i]) {
      itemDiv.innerHTML = `
        <img src="images/${wantedItems[i].img}" alt="${wantedItems[i].name}">
        <p>${wantedItems[i].name}</p>
        <small>$${wantedItems[i].price}</small>
      `;
      itemDiv.style.background = "#6a11cb"; // ✅ Purple for "Wanted Items"
      itemDiv.onclick = () => removeItem("wanted", i);
    } else {
      itemDiv.classList.add("add-item");
      itemDiv.textContent = "+ Add Item";
      itemDiv.onclick = () => addItem("wanted");
    }
    wantedItemsContainer.appendChild(itemDiv);
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

// === SWAP BUTTON ===
function swapItems() {
  [yourItems, wantedItems] = [wantedItems, yourItems];
  renderItems();
}

/* =====================================================
    ✅ INVENTORY SELECTOR (Brainrots + Real Items)
====================================================== */

// ✅ Dummy Inventory (Brainrots + Real Items)
const inventoryItems = [
  // 25 Brainrots
  ...Array.from({ length: 25 }, (_, i) => ({
    name: "Brainrots",
    img: "brainrots.png",
    price: 100
  })),

  // Real Items
  { name: "Sword of Truth", img: "sword.png", price: 500 },
  { name: "Golden Shield", img: "shield.png", price: 450 },
  { name: "Magic Wand", img: "wand.png", price: 350 },
  { name: "Dragon Egg", img: "egg.png", price: 800 }
];

const modal = document.getElementById("itemModal");
const categoryPanel = document.getElementById("categoryPanel");
const itemGrid = document.getElementById("itemGrid");
const searchBox = document.getElementById("searchBox");

// === OPEN INVENTORY MODAL ===
function openInventorySelector() {
  modal.style.display = "flex";
  displayCategories();
  displayItems(inventoryItems);
}

// === DISPLAY CATEGORIES ===
function displayCategories() {
  categoryPanel.innerHTML = "";

  // Brainrots Category
  const brainrotBtn = document.createElement("button");
  brainrotBtn.className = "category-button";
  brainrotBtn.textContent = "Brainrots";
  brainrotBtn.onclick = () =>
    displayItems(inventoryItems.filter(i => i.name === "Brainrots"));
  categoryPanel.appendChild(brainrotBtn);

  // Real Items Category
  const realItemsBtn = document.createElement("button");
  realItemsBtn.className = "category-button";
  realItemsBtn.textContent = "Special Items";
  realItemsBtn.onclick = () =>
    displayItems(inventoryItems.filter(i => i.name !== "Brainrots"));
  categoryPanel.appendChild(realItemsBtn);
}

// === DISPLAY ITEMS IN MODAL ===
function displayItems(itemList) {
  itemGrid.innerHTML = "";
  itemList.forEach(item => {
    const div = document.createElement("div");
    div.className = "modal-item";
    div.innerHTML = `
      <img src="images/${item.img}" alt="${item.name}">
      <p>${item.name}</p>
      <small>$${item.price}</small>
    `;
    div.onclick = () => selectItem(item);
    itemGrid.appendChild(div);
  });
}

// === SELECT ITEM FROM MODAL ===
function selectItem(item) {
  if (currentType === "your" && yourItems.length < maxItems) {
    yourItems.push(item);
  } else if (currentType === "wanted" && wantedItems.length < maxItems) {
    wantedItems.push(item);
  }
  modal.style.display = "none";
  renderItems();
}

// === SEARCH FUNCTION ===
searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  const filtered = inventoryItems.filter(i =>
    i.name.toLowerCase().includes(query)
  );
  displayItems(filtered);
});

// === CLOSE MODAL ===
document.getElementById("closeModal").onclick = () =>
  (modal.style.display = "none");

// ✅ INITIAL RENDER
renderItems();
