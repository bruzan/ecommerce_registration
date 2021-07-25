let selectedRow = null; 

function onFormSubmit() {
    
    const formData = readData();
    if (selectedRow == null) {
        insertClient(formData)
        insertLocalstorage(formData)
    }
        else{
            updateClient(formData)
            updateClientlocalstorage(formData);
        }

    resetForm();

}

// Reads the form data

function readData() {

    const formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["number"] = document.getElementById("number").value;
    formData["city"] = document.getElementById("city").value;

    
    return formData;
}

//Inserts client into localStorage

function insertLocalstorage(formData) {

    let clientName = formData.name
    let email = formData.email;
    let number = formData.number;
    let city = formData.city;

    let data = {
        clientName,
        email,
        number,
        city
    }

    let convertData = JSON.stringify(data);
    localStorage.setItem('client', convertData)

}


// Inserts a new client

function insertClient(formData) {

    const table = document.getElementById("clientList").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.number;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.city;
    cell5 = newRow.insertCell(4)
    cell5.innerHTML = `<a class="btn btn-secondary" onClick="editClient(this)">Edit</a>
                        <a class="btn btn-danger" onClick="deleteClient(this)">Delete</a>`;


}

// Resets the form 

function resetForm() {
    
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("number").value="";
    document.getElementById("city").value="";
    selectedRow = null;

}

// Edits a client

function editClient(client) {

    selectedRow = client.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("number").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;

}

// Updates a client

function updateClient(formData) {

    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.number;
    selectedRow.cells[3].innerHTML = formData.city;


}

// Update local storage

function updateClientlocalstorage(formData) {

    let client = JSON.parse(localStorage.client);
    client.clientName = formData.name;
    localStorage.setItem('client', JSON.stringify(client));

}

// Deletes a client

function deleteClient(client) {
    
    row = client.parentElement.parentElement;
    document.getElementById("clientList").deleteRow(row.rowIndex);
    resetForm();

}