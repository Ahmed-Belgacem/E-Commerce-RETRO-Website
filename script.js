document.addEventListener("DOMContentLoaded", function () {
  // Dark/Light Mode Toggle
  const themeBtn = document.querySelector(".dark-btn");
  const themeIcon = themeBtn.querySelector("i");
  const body = document.body;

  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem("theme");

  // If there's a saved theme, apply it on page load
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  // Toggle theme when button is clicked
  themeBtn.addEventListener("click", function () {
    body.classList.toggle("light-mode");

    // Change icon based on current mode
    if (body.classList.contains("light-mode")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "light");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "dark");
    }
  });

  // cart btn
  var popup = document.getElementById("cart");
  var openbtn = document.querySelector(".cart-btn");
  var closebtn = document.getElementById("cartclose");
  var continuebtn = document.getElementById("continue");

  /* open when cart is clicked */
  openbtn.addEventListener("click", function () {
    popup.classList.add("active");
  });
  /* losed when x is clicked */
  closebtn.addEventListener("click", function () {
    popup.classList.remove("active");
  });
  /* losed when continuebtn is clicked */
  continuebtn.addEventListener("click", function () {
    popup.classList.remove("active");
  });
  /* closed when click outside of the cart */
  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });
  /* closed when pressing esc */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      popup.classList.remove("active");
    }
  });

  // cart btn - holding items
  let cartItems = [];
  var cartCounts = document.querySelectorAll(".cart-count");

  // Updates ALL cart-count elements and the Item(s) badge
  function updateCartCount() {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(function (el) {
      el.textContent = total;
    });
  }

  // Renders cart items inside the popup
  function renderCart() {
    const container = document.getElementById("itemcontainer");
    const emptymsg = document.getElementById("emptymsg");

    // Clear the container first
    container.innerHTML = "";

    if (cartItems.length === 0) {
      emptymsg.style.display = "block";
    } else {
      emptymsg.style.display = "none";

      cartItems.forEach(function (item) {
        container.innerHTML += `
                    <div class="cart-item">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-sub">$${item.price}.00 each</div>
                        <div class="cart-item-bottom">
                            <div class="cart-item-controls">
                                <button class="cart-minus">-</button>
                                <span class="cart-qty">${item.quantity}</span>
                                <button class="cart-plus">+</button>
                            </div>
                        <div class="cart-prices">
                           
                            <button class="cart-delete"><i class="fa-regular fa-trash-can"></i></button>
                             <div class="cart-item-price">$${item.price * item.quantity}.00</div>
</div>
                    </div>
                `;
      });

      // + button inside cart popup
      container.querySelectorAll(".cart-plus").forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          cartItems[index].quantity += 1;
          updateCartCount();
          renderCart();
        });
      });

      // - button inside cart popup - kan tosel 0 yetfase5 el item
      container.querySelectorAll(".cart-minus").forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
          } else {
            cartItems.splice(index, 1);
          }
          updateCartCount();
          renderCart();
        });
      });

      container.querySelectorAll(".cart-delete").forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          cartItems.splice(index, 1);

          updateCartCount();
          renderCart();
        });
      });
    }
  }

  var minusBtn = document.getElementById("minus");
  var plusBtn = document.getElementById("plus");
  var counter = document.getElementById("counter");
  var heart = document.querySelector(".btnheart");
  var share = document.querySelector(".btnshare");
  var cartBtn = document.getElementById("cartbtn");

  // Check if we're on the product page
  if (plusBtn && minusBtn && counter) {
    // Counter noti
    function showCounterNotification(action, value) {
      const counterNotification = document.createElement("div");
      counterNotification.className = "counternoti";

      if (action === "increase") {
        counterNotification.innerHTML =
          '<i class="fa-solid fa-plus"></i><span>Quantity: ' +
          value +
          "</span>";
        counterNotification.classList.add("increase");
      } else {
        counterNotification.innerHTML =
          '<i class="fa-solid fa-minus"></i><span>Quantity: ' +
          value +
          "</span>";
        counterNotification.classList.add("decrease");
      }

      document.body.appendChild(counterNotification);

      setTimeout(function () {
        counterNotification.classList.add("show");
      }, 10);

      setTimeout(function () {
        counterNotification.classList.remove("show");
      }, 1500);
    }

    // Plus btn
    plusBtn.addEventListener("click", function () {
      var currentCount = parseInt(counter.value);
      counter.value = currentCount + 1;
      showCounterNotification("increase", currentCount + 1);
    });

    // Minus btn
    minusBtn.addEventListener("click", function () {
      var currentCount = parseInt(counter.value);
      if (currentCount > 1) {
        counter.value = currentCount - 1;
        showCounterNotification("decrease", currentCount - 1);
      }
    });

    // Cart noti
    function showcartnoti() {
      const cartnoti = document.createElement("div");
      cartnoti.className = "cartnoti";
      cartnoti.innerHTML =
        '<i class="fa-solid fa-check"></i><span>Item(s) added to cart</span>';
      document.body.appendChild(cartnoti);

      setTimeout(function () {
        cartnoti.classList.add("show");
      }, 10);

      setTimeout(function () {
        cartnoti.classList.remove("show");
      }, 1500);
    }

    // Add to cart btn
  
      cartBtn.addEventListener("click", function () {
        const quantity = parseInt(counter.value);
        const name = document.querySelector(".cardcontent h4").textContent.trim();
        const price = parseFloat(document.querySelector(".price1").textContent.replace("$", ""),);

        // Check if item already exists in cart
        const existing = cartItems.find((item) => item.name === name);

        if (existing) {
          existing.quantity += quantity;
        } else {
          cartItems.push({ name, price, quantity });
        }

        updateCartCount();
        renderCart();
        showcartnoti();
      });


      let isWishlisted = false;
      heart.addEventListener("click", function () {
        isWishlisted = !isWishlisted;
        const icon = heart.querySelector("i");

        if (isWishlisted) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
          icon.style.color = "#ff4d4d";
        } else {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
          icon.style.color = "#ffffff";
        }
      });


    
      let isShared = false;
      share.addEventListener("click", function () {
        isShared = !isShared;
        const icon = share.querySelector("i");

        if (isShared) {
          icon.style.color = "#00bbff";
        } else {
          icon.style.color = "#ffffff";
        }
      });
    }


  var searchBtn = document.querySelector(".search-btn");


    searchBtn.addEventListener("click", function () {
      showsearchnoti();
    });
  

  function showsearchnoti() {
    const searchnoti = document.createElement("div");
    searchnoti.className = "searchnoti";
    searchnoti.innerHTML =
      '<i class="fa-solid fa-hourglass-half"></i><span>Feature coming soon!</span>';
    document.body.appendChild(searchnoti);

    setTimeout(function () {
      searchnoti.classList.add("show");
    }, 10);

    setTimeout(function () {
      searchnoti.classList.remove("show");
    }, 1500);
  }
});
// Price range update function
function updatePriceDisplay() {
  const priceRange = document.querySelector('input[type="range"]');
  const priceValueDisplay = document.querySelector('.price-values span');

  if (priceRange && priceValueDisplay) {
    priceValueDisplay.textContent = '$' + priceRange.value;
  }
}

// Reset filters function
function resetFilters() {
  // Uncheck all checkboxes
  const checkboxes = document.querySelectorAll('.listcont input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Reset price range
  const priceRange = document.querySelector('input[type="range"]');
  const priceValueDisplay = document.querySelector('.price-values span');

  if (priceRange) {
    priceRange.value = 9999;
  }
  if (priceValueDisplay) {
    priceValueDisplay.textContent = '$9999';
  }
}

// Toggle filter section
function toggleFilterSection(button) {
  const listCont = button.closest('.pctype').nextElementSibling;

  if (listCont && listCont.classList.contains('listcont')) {
    listCont.classList.toggle('collapsed');
    button.classList.toggle('active');
  }
}


