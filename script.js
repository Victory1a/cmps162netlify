// Ship data array
const ships = [
    { name: "Ambassador Class", length: 526, crew: 700, speed: "Warp 9.6", price: 500000, image: "images/ambassador.jpg" },
    { name: "Constitution II Class", length: 305, crew: 430, speed: "Warp 8", price: 750000, image: "images/constitution.jpg" },
    { name: "Defiant Class", length: 120, crew: 50, speed: "Warp 9.985", price: 900000, image: "images/defiant.jpg" },
    { name: "Excelsior II Class", length: 467, crew: 750, speed: "Warp 9.2", price: 650000, image: "images/excelsior.jpg" },
    { name: "Galaxy Class", length: 641, crew: 1000, speed: "Warp 9.6", price: 1200000, image: "images/galaxy.jpg" },
    { name: "Intrepid Class", length: 344, crew: 200, speed: "Warp 9.975", price: 800000, image: "images/intrepid.jpg" },
    { name: "Miranda Class", length: 243, crew: 220, speed: "Warp 9", price: 400000, image: "images/miranda.jpg" },
    { name: "Nova Class", length: 221, crew: 80, speed: "Warp 8", price: 350000, image: "images/nova.jpg" },
    { name: "Oberth Class", length: 150, crew: 80, speed: "Warp 6", price: 300000, image: "images/oberth.jpg" },
    { name: "Prometheus Class", length: 414, crew: 200, speed: "Warp 9.99", price: 950000, image: "images/prometheus.jpg" },
    { name: "Sovereign Class", length: 685, crew: 855, speed: "Warp 9.975", price: 1500000, image: "images/sovereign.jpg" },
    { name: "Universe Class", length: 3200, crew: 2000, speed: "Warp 9.999", price: 2000000, image: "images/universe.jpg" }
];

// Initialize cart and total cost from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalCartCost = parseFloat(localStorage.getItem("totalCartCost")) || 0;

// Function to add a ship to the cart
function addToCart(shipName, shipPrice) {
    cart.push({ name: shipName, price: shipPrice });
    totalCartCost += shipPrice;

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalCartCost", totalCartCost);

    updateCart();
}

// Function to update the cart displays
function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    const totalCostElement = document.getElementById("total-cost");

    if (cartItemsElement) {
        cartItemsElement.innerHTML = "";
        cart.forEach(ship => {
            const li = document.createElement("li");
            li.textContent = `${ship.name} - $${ship.price.toLocaleString()}`;
            cartItemsElement.appendChild(li);
        });
    }

    if (totalCostElement) {
        totalCostElement.textContent = totalCartCost.toLocaleString();
    }
}

// New displayShips function with additional features
function displayShips(shipList) {
    const shipListElement = document.querySelector(".ship-list");
    shipListElement.innerHTML = "";

    shipList.forEach(ship => {
        const shipSection = document.createElement("div");
        shipSection.classList.add("ship-section");

        // New event to show detailed info when clicking on ship name
        shipSection.innerHTML = `
            <h3 onclick="showShipInfo('${ship.name}')">${ship.name}</h3>
            <img src="${ship.image}" alt="${ship.name}">
            <p>Length: ${ship.length} meters | Crew: ${ship.crew} | Speed: ${ship.speed}</p>
            <p>Price: $${ship.price.toLocaleString()}</p>
            <button onclick="addToCart('${ship.name}', ${ship.price})">Add to Cart</button>
            <button onclick="selectForComparison('${ship.name}')">Select for Comparison</button>
        `;
        shipListElement.appendChild(shipSection);
    });
}

// Show detailed ship info when clicking on name
function showShipInfo(shipName) {
    const ship = ships.find(s => s.name === shipName);
    if (ship) {
        alert(`
            Name: ${ship.name}
            Length: ${ship.length} meters
            Crew: ${ship.crew}
            Speed: ${ship.speed}
            Price: $${ship.price.toLocaleString()}
        `);
    }
}

// Variables to hold selected ships for comparison
let selectedShips = [];

// Select ships for comparison
function selectForComparison(shipName) {
    if (selectedShips.length < 2) {
        const ship = ships.find(s => s.name === shipName);
        if (ship) {
            selectedShips.push(ship);
            alert(`${ship.name} added for comparison!`);
        }

        // Automatically compare when 2 ships are selected
        if (selectedShips.length === 2) {
            compareShips();
        }
    } else {
        alert("You can only compare 2 ships at a time!");
    }
}

// Compare two selected ships and display results
function compareShips() {
    const [ship1, ship2] = selectedShips;

    const comparisonResult = `
        🚀 Comparing ${ship1.name} vs ${ship2.name}
        -----------------------------
        Length: ${ship1.length}m vs ${ship2.length}m
        Crew: ${ship1.crew} vs ${ship2.crew}
        Speed: ${ship1.speed} vs ${ship2.speed}
        Price: $${ship1.price.toLocaleString()} vs $${ship2.price.toLocaleString()}
    `;

    // Show alert with comparison result
    alert(comparisonResult);

    // Display comparison results dynamically
    displayComparisonResults(comparisonResult);

    // Clear selected ships after comparison
    selectedShips = [];
}

// Display comparison results dynamically on the page
function displayComparisonResults(comparisonResult) {
    const comparisonElement = document.getElementById("comparison-results");
    if (comparisonElement) {
        comparisonElement.innerText = comparisonResult;
    }
}

// On page load, initialize the results display area
// This function initializes the comparison area (no need to create the div)
function initializeComparisonResults() {
    const comparisonElement = document.getElementById("comparison-results");
    if (comparisonElement) {
        comparisonElement.innerText = "Select two ships to compare."; // Set initial text
    }
}

// Function to display the comparison results in the existing comparison-results div
function displayComparisonResults(comparisonResult) {
    const comparisonElement = document.getElementById("comparison-results");
    if (comparisonElement) {
        comparisonElement.innerText = comparisonResult; // Update with the comparison data
    }
}

// Function to filter ships based on user input (name and speed)
function filterShips() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const selectedSpeed = document.getElementById("speed-filter").value;

    // First, filter by search input (name)
    let filteredShips = ships.filter(ship => ship.name.toLowerCase().includes(searchInput));

    // Then, filter by selected speed
    if (selectedSpeed !== "All") {
        filteredShips = filteredShips.filter(ship => ship.speed === selectedSpeed);
    }

    // Display the filtered ships
    displayShips(filteredShips);
}

// Function to populate the speed filter dropdown
function populateSpeedFilter() {
    const speedFilter = document.getElementById("speed-filter");
    const speeds = [...new Set(ships.map(s => s.speed))];
    speeds.unshift("All"); // Add 'All' option to show all ships
    speeds.forEach(speed => {
        speedFilter.add(new Option(speed, speed));
    });
}

// Function to apply discount for high-value orders
function applyDiscount() {
    let discountRate = 0;

    switch (true) {
        case totalCartCost >= 3000000:
            discountRate = 0.3; // 30% discount for purchases over $2,000,000
            break;
        case totalCartCost >= 2000000:
            discountRate = 0.2; // 20% discount for purchases over $2,000,000
            break;
        case totalCartCost >= 1000000:
            discountRate = 0.1; // 10% discount for purchases over $1,000,000
            break;
        default:
            discountRate = 0; // No discount
    }

    let totalCostWithDiscount = totalCartCost * (1 - discountRate);

    if (discountRate > 0) {
        alert(`You've unlocked a ${discountRate * 100}% discount! New total: $${totalCostWithDiscount.toLocaleString()}`);
    }

    return totalCostWithDiscount;
}

// Updated completePurchase function to apply discount
function completePurchase() {
    let finalTotal = applyDiscount(); // Apply discount before finalizing

    alert(`Purchase completed! Your total is $${finalTotal.toLocaleString()}. Thank you for shopping with us.`);

    // Clear cart and localStorage
    cart = [];
    totalCartCost = 0;
    localStorage.removeItem("cart");
    localStorage.removeItem("totalCartCost");

    window.location.href = "index.html";
}

// Proceed to Checkout
function proceedToCheckout() {
    // Save cart data to localStorage (already done in addToCart)
    window.location.href = "checkout.html";
}

// Load Checkout Page
function loadCheckout() {
    const checkoutItemsElement = document.getElementById("checkout-items");
    const checkoutTotalCostElement = document.getElementById("checkout-total-cost");

    // Retrieve cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedTotalCost = parseFloat(localStorage.getItem("totalCartCost")) || 0;

    // Display cart items and total cost
    if (checkoutItemsElement) {
        checkoutItemsElement.innerHTML = "";
        storedCart.forEach(ship => {
            const li = document.createElement("li");
            li.textContent = `${ship.name} - $${ship.price.toLocaleString()}`;
            checkoutItemsElement.appendChild(li);
        });
    }

    if (checkoutTotalCostElement) {
        checkoutTotalCostElement.textContent = storedTotalCost.toLocaleString();
    }
}

// Go Back to Shop
function goBack() {
    window.location.href = "index.html";
}

// Load the cart display on page load (for shopping page)
updateCart();

// Populate the speed filter on page load
populateSpeedFilter();

// Display all ships initially
displayShips(ships);
initializeComparisonResults();

// Apply filters when search or speed filter changes
document.getElementById("speed-filter").addEventListener("change", filterShips);
document.getElementById("search-input").addEventListener("input", filterShips);