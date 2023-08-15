let insertData = () => {
  //   const addNew = document.createElement("newCustomer");
  //   addNew.innerHTML = "<h1>heelo</h1>";

  //   const display = document.getElementById("addNewCustomer");
  //   display.innerHTML = "";

  console.log("mil gaya");
  c_id = document.getElementById("c_id").value;
  c_name = document.getElementById("c_name").value;
  c_email = document.getElementById("c_email").value;
  c_password = document.getElementById("c_password").value;
  c_address = document.getElementById("c_address").value;
  console.log(c_id);
  console.log(c_name);
  console.log(c_email);
  console.log(c_password);

  get_data();

  const form = document.getElementById("register");
  form.reset();
};

let get_data = async () => {
  let url = `http://localhost:3000/insert_que?q=insert+into+price_history.customer+values+(${c_id}, '${c_name}', '${c_email}', '${c_password}', '${c_address}')`;
  console.log(url);

  let response = await fetch(url);

  if (response.status == 400) {
    // const errorMessage = document.createElement("showData");
    // errorMessage.innerHTML = "<h3>The query is not valid</h3>";
    // document.getElementById("showData").appendChild(errorMessage);
    const registered = document.getElementById("failure");
    registered.innerHTML = "";

    const success = document.createElement("success");
    success.innerHTML = `<h2>User with ID: ${c_id} already exists.</h2>`;

    registered.appendChild(success);
    return;
  }

  const registered = document.getElementById("registered");
  registered.innerHTML = "";

  const success = document.createElement("success");
  success.innerHTML = `<h2>User with ID: ${c_id} Added Successfully!</h2>`;

  registered.appendChild(success);

  console.log(response);
  myTable = await response.json(); // fill array with data.

  // make_the_table(); // convert data to table.
};

let showData = async () => {
  let url = `http://localhost:3000/insert_que?q=select * from price_history.customer`;
  console.log(url);

  let response = await fetch(url);

  if (response.status == 400) {
    const errorMessage = document.createElement("showData");
    errorMessage.innerHTML = "<h3>The query is not valid</h3>";
    document.getElementById("showData").appendChild(errorMessage);
    return;
  }

  console.log(response);
  myTable = await response.json(); // fill array with data.

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
