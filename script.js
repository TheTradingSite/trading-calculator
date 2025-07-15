const maxItems = 4;
let yourItems = [];
let wantedItems = [];
let currentType = "";

// ✅ Render Items (Grid-Based)
function renderItems() {
  const yourItemsContainer = document.getElementById("your-items");
  const wantedItemsContainer = document.getElementById("wanted-items");

  yourItemsContainer.innerHTML = "";
  wantedItemsContainer.innerHTML = "";

  // Render Your Items
  for (let i = 0; i < maxItems; i++) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    if (yourItems[i]) {
      itemDiv.innerHTML = `
        <img src="images/${yourItems[i].img}" alt="${yourItems[i].name}">
        <p>${yourItems[i].name}</p>
        <small>$${yourItems[i].price}</small>
      `;
      itemDiv.onclick = () => removeItem("your", i);
    } else {
      itemDiv.classList.add("add-item");
      itemDiv.textContent = "+ Add Item";
      itemDiv.onclick = () => addItem("your");
    }
    yourItemsContainer.appendChild(itemDiv);
  }

  // Render Wanted Items
  for (let i = 0; i < maxItems; i++) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    if (wantedItems[i]) {
      itemDiv.innerHTML = `
        <img src="images/${wantedItems[i].img}" alt="${wantedItems[i].name}">
        <p>${wantedItems[i].name}</p>
        <small>$${wantedItems[i].price}</small>
      `;
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

  document.getElementById("your-price").textContent = `$${yourPrice}`;
  document.getElementById("your-value").textContent = `$${yourPrice}`;

  document.getElementById("wanted-price").textContent = `$${wantedPrice}`;
  document.getElementById("wanted-value").textContent = `$${wantedPrice}`;
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
