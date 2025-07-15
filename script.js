const maxItems = 4;
let yourItems = [];
let wantedItems = [];

function renderItems() {
  const yourItemsContainer = document.getElementById("your-items");
  const wantedItemsContainer = document.getElementById("wanted-items");

  yourItemsContainer.innerHTML = "";
  wantedItemsContainer.innerHTML = "";

  // Render Your Items
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

  // Render Wanted Items
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

function addItem(type) {
  const name = prompt("Enter item name:");
  const price = parseFloat(prompt("Enter item price:"));
  if (!name || isNaN(price)) return alert("Invalid input!");

  if (type === "your" && yourItems.length < maxItems) {
    yourItems.push({ name, price });
  } else if (type === "wanted" && wantedItems.length < maxItems) {
    wantedItems.push({ name, price });
  }
  renderItems();
}

function removeItem(type, index) {
  if (type === "your") {
    yourItems.splice(index, 1);
  } else {
    wantedItems.splice(index, 1);
  }
  renderItems();
}

function updateSummary() {
  const yourPrice = yourItems.reduce((sum, i) => sum + i.price, 0);
  const wantedPrice = wantedItems.reduce((sum, i) => sum + i.price, 0);

  document.getElementById("your-price").textContent = yourPrice;
  document.getElementById("wanted-price").textContent = wantedPrice;

  // In this version, Value = Price (but you can add custom logic)
  document.getElementById("your-value").textContent = yourPrice;
  document.getElementById("wanted-value").textContent = wantedPrice;
}

renderItems();
