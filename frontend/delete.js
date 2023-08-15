let deleteData = async () => {
  var c_id = document.getElementById("c_id").value;

  let url = `http://localhost:3000/insert_que?q=delete from price_history.customer where c_id=${c_id}`;
  // console.log(url);

  let response = await fetch(url);
  console.log(response);

  if (response.status == 400) {
    const errorMessage = document.createElement("showData");
    errorMessage.innerHTML = "<h3>Please enter a valid customer ID.</h3>";
    document.getElementById("showData").appendChild(errorMessage);

    return;
  }

  const u = document.getElementById("user");
  u.innerHTML = "";
  const deletedUser = document.createElement("delUser");
  deletedUser.innerHTML = `<h2>Customer ID: ${c_id} deleted</h2>`;
  u.appendChild(deletedUser);

  // if(response.body = "Wrong Query")

  myTable = await response.json(); // fill array with data.
  console.log(myTable);

  make_the_table(); // convert data to table.
};

let make_the_table = () => {
  // Extract value from table header.
  let col = [];
  for (let i = 0; i < myTable.length; i++) {
    for (let key in myTable[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // Create a table.
  const table = document.createElement("table");

  // Create table header row using the extracted headers above.
  let tr = table.insertRow(-1); // table row.

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th"); // table header.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // add json data to the table as rows.
  for (let i = 0; i < myTable.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = myTable[i][col[j]];
    }
  }

  // Now, add the newly created table with json data, to a container.
  const divShowData = document.getElementById("showData");
  divShowData.innerHTML = "";
  divShowData.appendChild(table);
};
