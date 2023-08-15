let myTable;

let get_data = async () => {
  let p_name = document.getElementById("prod_name").value;
  console.log(p_name);
  let url = `http://localhost:3000/insert_que?q=select * from+price_history.price where prod_id in (select prod_id from price_history.product where prod_name='${p_name}')`;
  let response = await fetch(url);
  myTable = await response.json(); // fill array with data.

  make_the_table(); // convert data to table.
};

let take_data = (res) => {
  myTable = res;
  console.log("table mil gai");
  console.log(myTable);
  make_the_table(); // convert
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

module.exports = {
  take_data,
};
