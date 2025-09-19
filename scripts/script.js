let activeCategory = "All plants";
let activeID = null;
let plantId = null;
let openModal = false;

const spinner = document.getElementById("spinner");
function showLoader() {
  spinner.classList.remove("hidden");
}
function hideLoader() {
  spinner.classList.add("hidden");
}

const allCategory = document.getElementById("allCategory");
const card_section = document.getElementById("card_section");

fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    
    renderCategories(data.categories, allCategory);
  });

loadPlants("All plants");

function loadPlants(category, id = null) {
  showLoader();

  if (category === "All plants") {
    fetch("https://openapi.programming-hero.com/api/plants")
      .then((res) => res.json())
      .then((data) => {
        cardSections(data.plants, card_section);
        hideLoader();
      })
      .catch(() => hideLoader());
  } else {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        cardSections(data.plants, card_section);
        hideLoader();
      })
      .catch(() => hideLoader());
  }
}

function cardSections(plants, card_section) {
  const plantsHTML = plants
  ?.map(
    (plant) => `
   <div class="bg-white rounded-md p-4 shadow">
     <img src="${plant.image}" class="h-40 w-full rounded-md object-cover"/>
     <h1 id="modal" data-plantid="${plant.id}" class="text-left font-semibold plant-card cursor-pointer pt-2">${plant.name}</h1>
     <p class="text-left text-sm text-gray-600 pt-2">${plant.description.slice(0, 80)}...</p>

     <div class="flex justify-between items-center mt-3">
       <button class="bg-green-600 text-white text-xs px-2 py-1 rounded-full">${plant.category}</button>
       <p class="font-bold">৳${plant.price}</p>
     </div>

     <button class="button_cart w-full bg-[#15803D] mt-4 rounded-full py-2 px-2 text-white text-3 font-medium ">
       Add to cart
     </button>
   </div>
  `
  )
  .join("");

  card_section.innerHTML = `
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      ${plantsHTML}
    </section>
  `;

  document.querySelectorAll(".plant-card").forEach((card) => {
    card.addEventListener("click", () => {
      plantId = card.dataset.plantid;
      openModal = true;

      console.log(plantId);

      fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
        .then((res) => res.json())
        .then((data) => {
          plantModal(data.plants);
        });
    });
  });

  // -------------handel to add to cart --------------

  document.querySelectorAll(".button_cart").forEach((btn) => {
    const cartItems = document.getElementById("cart_items");
    const cartTotal = document.getElementById("cart_total");
    const totalRow = document.getElementById("cart_total_row");

    btn.addEventListener("click", () => {
    
      const productCard = btn.closest("div");
      const productName = productCard.querySelector("h1").innerText;
      const productPriceText =
        productCard.querySelector("p.font-bold").innerText;
      const productPrice = parseInt(productPriceText.replace("৳", ""));

      totalRow.classList.remove("hidden");

      const cartItem = document.createElement("div");
      cartItem.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "p-2",
        "bg-green-100",
        "rounded"
      );

      cartItem.innerHTML = `
      <div>
        <div class="cart-name font-medium">${productName}</div>
        <div class="cart-price text-gray-600">৳${productPrice} × <span class="cart-qty">1</span></div>
      </div>
      <button class="remove-btn text-gray-600 hover:text-red-500">❌</button>
    `;

      cartItems.appendChild(cartItem);

      cartItem.querySelector(".remove-btn").addEventListener("click", () => {
        cartItem.remove();
        updateTotal();

        if (cartItems.children.length === 0) {
          totalRow.classList.add("hidden");
        }
      });

      alert(`${productName} has been added to the cart..`);


      updateTotal();
    });

    function updateTotal() {
      let total = 0;
      cartItems.querySelectorAll(".cart-price").forEach((priceEl) => {
        let text = priceEl.innerText;
        let price = parseInt(text.split("×")[0].replace("৳", "").trim());
        let qty = parseInt(priceEl.querySelector(".cart-qty").innerText);
        total += price * qty;
      });
      cartTotal.innerText = "৳" + total;
    }
  });
}

function renderCategories(categories, container) {
  const categoryHTML = categories
    .map((cat) => {
      const isActive = activeCategory === cat.category_name;
      const baseClasses =
        "hoverss mb-[2px] text-left cursor-pointer font-medium w-full py-2 px-3 rounded";
      const activeClasses = "bg-[#15803D] text-white";
      const inactiveClasses = "hover:bg-green-500";

      return `
        <li 
          class="${baseClasses} ${isActive ? activeClasses : inactiveClasses} category-item"
          data-name="${cat.category_name}"
          data-id="${cat.id}">
          ${cat.category_name}
        </li>`;
    })
    .join("");

  const isAllActive = activeCategory === "All plants";
  const baseClasses =
    "hoverss mb-[2px] text-left cursor-pointer font-medium w-full py-2 px-3 rounded";
  const activeClasses = "bg-[#15803D] text-white";
  const inactiveClasses = "hover:bg-green-500";

  container.innerHTML = `
    <h1 class="text-[20px] font-semibold mb-2">Categories</h1>
    <ul class="space-y-2 ">
      <li class="${baseClasses} ${isAllActive ? activeClasses : inactiveClasses} category-item"
          data-name="All plants"
          data-id="all">
        All plants
      </li>
      ${categoryHTML}
    </ul>
  `;

  document.querySelectorAll(".category-item").forEach((li) => {
    li.addEventListener("click", () => {
      activeCategory = li.dataset.name;
      activeID = li.dataset.id;

      renderCategories(categories, container);

      if (activeCategory === "All plants") {
        loadPlants("All plants");
      } else {
        loadPlants(activeCategory, activeID);
      }
    });
  });
}


function plantModal(data) {
  const modalHTML = `
    <div id="plantModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg w-96 p-5 relative">
        <button id="closeModal" class="absolute close-modal bottom-2 right-2 border-1 border-black text-black py-1 px-4 rounded-full">Close</button>
        <h2 id="modalTitle" class="text-xl font-bold mb-2">${data.name}</h2>
        <img id="modalImage" src="${data.image}" class="w-full h-48 object-cover rounded-md mb-3"/>
        
        <p class="text-black mb-1 font-bold">Category: ${data.category}</p>
        <p class="font-bold text-lg">Price: <span id="modalPrice">৳${data.price}</span></p>
        <p class="text-gray-600 mb-6">
          <span class="font-semibold text-black">Description:</span> ${data.description}
        </p>
      </div>
    </div>
  `;

  const modalContainer = document.getElementById("plantModalContainer");
  modalContainer.innerHTML = modalHTML;

  const modal = document.getElementById("plantModal");
  modal.classList.remove("hidden"); // ✅ show the modal manually

  document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.add("hidden");
    console.log("Modal closed");
  });
}
