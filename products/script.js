let selectedRow = null; 

function onFormSubmit() {
    
    const formData = readData();
    if (selectedRow == null) {
        insertProduct(formData)
        insertLocalstorage(formData)
    }
        else{
            updateProduct(formData)
            updateProductlocalstorage(formData);
        }

    resetForm();

}

// Reads the form data

function readData() {

    const formData = {};
    formData["product"] = document.getElementById("product").value;
    formData["brand"] = document.getElementById("brand").value;
    formData["price"] = document.getElementById("price").value;
    formData["quantity"] = document.getElementById("quantity").value;

    
    return formData;
}

//Inserts client into localStorage

function insertLocalstorage(formData) {

    let productName = formData.product;
    let brand = formData.brand;
    let price = formData.price;
    let quantity = formData.quantity;

    let data = {
        productName,
        brand,
        price,
        quantity
    }

    let convertData = JSON.stringify(data);
    localStorage.setItem('product', convertData)

}


// Inserts a new client

function insertProduct(formData) {

    const table = document.getElementById("productList").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.product;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.brand;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.price;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.quantity;
    cell5 = newRow.insertCell(4)
    cell5.innerHTML = `<a class="btn btn-secondary" onClick="editProduct(this)">Edit</a>
                        <a class="btn btn-danger" onClick="deleteProduct(this)">Delete</a>`;


}

// Resets the form 

function resetForm() {
    
    document.getElementById("product").value="";
    document.getElementById("brand").value="";
    document.getElementById("price").value="";
    document.getElementById("quantity").value="";
    selectedRow = null;

}

// Edits a client

function editProduct(product) {

    selectedRow = product.parentElement.parentElement;
    document.getElementById("product").value = selectedRow.cells[0].innerHTML;
    document.getElementById("brand").value = selectedRow.cells[1].innerHTML;
    document.getElementById("price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("quantity").value = selectedRow.cells[3].innerHTML;

}

// Updates a client

function updateProduct(formData) {

    selectedRow.cells[0].innerHTML = formData.product;
    selectedRow.cells[1].innerHTML = formData.brand;
    selectedRow.cells[2].innerHTML = formData.price;
    selectedRow.cells[3].innerHTML = formData.quantity;


}

// Update local storage

function updateProductlocalstorage(formData) {

    let product = JSON.parse(localStorage.product);
    product.productName = formData.product;
    localStorage.setItem('product', JSON.stringify(product));

}

// Deletes a client

function deleteProduct(client) {
    
    row = client.parentElement.parentElement;
    document.getElementById("productList").deleteRow(row.rowIndex);
    resetForm();

}