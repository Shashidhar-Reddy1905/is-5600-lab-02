/* add your code here */
document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const stockList = document.getElementById("stock-list");
    const userDetailsForm = document.getElementById("user-details-form");
    const stockDetails = document.getElementById("stock-details");
    const deleteUserBtn = document.getElementById("delete-user");
    
    let users = [];
    let selectedUser = null;

    // Fetch users and populate the list
    function fetchUsers() {
        fetch("users.json") // Ensure users.json is available
            .then(response => response.json())
            .then(data => {
                users = data;
                renderUserList();
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    function renderUserList() {
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name;
            li.dataset.userId = user.id;
            li.addEventListener("click", () => selectUser(user));
            userList.appendChild(li);
        });
    }

    function selectUser(user) {
        selectedUser = user;
        userDetailsForm.elements["name"].value = user.name;
        userDetailsForm.elements["email"].value = user.email;
        renderStockList(user.stocks);
    }

    function renderStockList(stocks) {
        stockList.innerHTML = "";
        stocks.forEach(stock => {
            const li = document.createElement("li");
            li.textContent = stock.symbol;
            li.addEventListener("click", () => displayStockDetails(stock));
            stockList.appendChild(li);
        });
    }

    function displayStockDetails(stock) {
        stockDetails.innerHTML = `
            <h3>${stock.name} (${stock.symbol})</h3>
            <p>Shares: ${stock.shares}</p>
            <p>Price: $${stock.price}</p>
        `;
    }

    userDetailsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (selectedUser) {
            selectedUser.name = userDetailsForm.elements["name"].value;
            selectedUser.email = userDetailsForm.elements["email"].value;
            renderUserList();
        }
    });

    deleteUserBtn.addEventListener("click", () => {
        if (selectedUser) {
            users = users.filter(user => user.id !== selectedUser.id);
            selectedUser = null;
            userDetailsForm.reset();
            stockList.innerHTML = "";
            stockDetails.innerHTML = "";
            renderUserList();
        }
    });

    fetchUsers();
});

