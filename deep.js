document.getElementById('addPurchaseBtn').addEventListener('click', function() {
    document.getElementById('purchaseForm').style.display = 'block';
    document.getElementById('editIndex').value = -1;
    document.getElementById('purchaseFormFields').reset();
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('purchaseForm').style.display = 'none';
});

document.getElementById('purchaseFormFields').addEventListener('submit', function(event) {
    event.preventDefault();

    const number = document.getElementById('number').value;
    const name = document.getElementById('name').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const discount = parseFloat(document.getElementById('discount').value);
    const tax = parseFloat(document.getElementById('tax').value);
    const subtotal = (quantity * unitPrice) - discount + tax;

    const editIndex = parseInt(document.getElementById('editIndex').value);
    const tableBody = document.querySelector('#purchaseTable tbody');

    if (editIndex === -1) {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${number}</td>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${unitPrice.toFixed(2)}</td>
            <td>${discount.toFixed(2)}</td>
            <td>${tax.toFixed(2)}</td>
            <td>${subtotal.toFixed(2)}</td>
            <td class="actions">
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        `;
    } else {
        const row = tableBody.rows[editIndex];
        row.cells[0].textContent = number;
        row.cells[1].textContent = name;
        row.cells[2].textContent = quantity;
        row.cells[3].textContent = unitPrice.toFixed(2);
        row.cells[4].textContent = discount.toFixed(2);
        row.cells[5].textContent = tax.toFixed(2);
        row.cells[6].textContent = subtotal.toFixed(2);
    }

    document.getElementById('purchaseFormFields').reset();
    document.getElementById('purchaseForm').style.display = 'none';
});

document.querySelector('#purchaseTable tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('editBtn')) {
        const row = event.target.closest('tr');
        const cells = row.cells;

        document.getElementById('number').value = cells[0].textContent;
        document.getElementById('name').value = cells[1].textContent;
        document.getElementById('quantity').value = cells[2].textContent;
        document.getElementById('unitPrice').value = cells[3].textContent;
        document.getElementById('discount').value = cells[4].textContent;
        document.getElementById('tax').value = cells[5].textContent;

        document.getElementById('editIndex').value = row.rowIndex - 1;
        document.getElementById('purchaseForm').style.display = 'block';
    } else if (event.target.classList.contains('deleteBtn')) {
        const row = event.target.closest('tr');
        row.remove();
    }
});