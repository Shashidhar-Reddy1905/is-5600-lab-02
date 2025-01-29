
/* add your code here */
document.addEventListener("DOMContentLoaded", () => {
    const stocksData = JSON.parse(stockContent); // Loaded from stocks-complete.js
    const userData = JSON.parse(userContent); // Loaded from users.js
  
    initializeDashboard(userData, stocksData);
  });
  
  function initializeDashboard(users, stocks) {
    renderUserList(users, stocks);
  
    document.querySelector("#save").addEventListener("click", (e) => {
      e.preventDefault();
      updateUser(users, stocks);
    });
  
    document.querySelector("#delete").addEventListener("click", (e) => {
      e.preventDefault();
      deleteUser(users, stocks);
    });
  }
  
  /**
   * Renders the user list and attaches event listeners.
   */
  function renderUserList(users, stocks) {
    const userList = document.querySelector(".user-list");
    userList.innerHTML = "";
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute("id", id);
      userList.appendChild(listItem);
    });
  
    userList.addEventListener("click", (event) => handleUserSelection(event, users, stocks));
  }
  
  /**
   * Handles user selection from the list.
   */
  function handleUserSelection(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find((u) => u.id == userId);
    
    if (user) {
      populateUserForm(user);
      displayUserPortfolio(user, stocks);
    }
  }
  
  /**
   * Populates the form with selected user data.
   */
  function populateUserForm(user) {
    const { id, user: userInfo } = user;
    
    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = userInfo.firstname;
    document.querySelector("#lastname").value = userInfo.lastname;
    document.querySelector("#address").value = userInfo.address;
    document.querySelector("#city").value = userInfo.city;
    document.querySelector("#email").value = userInfo.email;
  }
  
  /**
   * Updates the selected user information.
   */
  function updateUser(users, stocks) {
    const id = document.querySelector("#userID").value;
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        users[i].user.firstname = document.querySelector("#firstname").value;
        users[i].user.lastname = document.querySelector("#lastname").value;
        users[i].user.address = document.querySelector("#address").value;
        users[i].user.city = document.querySelector("#city").value;
        users[i].user.email = document.querySelector("#email").value;
        
        renderUserList(users, stocks);
        break;
      }
    }
  }
  
  /**
   * Deletes the selected user.
   */
  function deleteUser(users, stocks) {
    const userId = document.querySelector("#userID").value;
    const index = users.findIndex((user) => user.id == userId);
  
    if (index > -1) {
      users.splice(index, 1);
      renderUserList(users, stocks);
      document.querySelector("form").reset();
    }
  }
  
  /**
   * Displays the user's stock portfolio.
   */
  function displayUserPortfolio(user, stocks) {
    const portfolioArea = document.querySelector(".portfolio-list");
    portfolioArea.innerHTML = "";
  
    user.portfolio.forEach(({ symbol, owned }) => {
      const stockItem = document.createElement("div");
      stockItem.innerHTML = `
        <p>Symbol: ${symbol}</p>
        <p>Shares: ${owned}</p>
        <button id="${symbol}" class="view-stock">View</button>
      `;
      portfolioArea.appendChild(stockItem);
    });
  
    portfolioArea.addEventListener("click", (event) => {
      if (event.target.classList.contains("view-stock")) {
        showStockDetails(event.target.id, stocks);
      }
    });
  }
  
  /**
   * Shows stock details when selected.
   */
  function showStockDetails(symbol, stocks) {
    const stock = stocks.find((s) => s.symbol == symbol);
    const stockInfoArea = document.querySelector(".stock-form");
  
    if (stock) {
      stockInfoArea.style.display = "block";
      document.querySelector("#stockName").textContent = stock.name;
      document.querySelector("#stockSector").textContent = stock.sector;
      document.querySelector("#stockIndustry").textContent = stock.subIndustry;
      document.querySelector("#stockAddress").textContent = stock.address;
      document.querySelector("#logo").src = `logos/${symbol}.svg`;
    }
  }

