// var query;
// function getQuery() {
//   query = document.getElementById("execQuery").value;
//   console.log(query);
// }

// function getUrlVars(url) {
//   var hash;
//   var myJson = {};
//   var hashes = url.slice(url.indexOf("?") + 1).split("&");
//   for (var i = 0; i < hashes.length; i++) {
//     hash = hashes[i].split("=");
//     myJson[hash[0]] = hash[1];
//     // If you want to get in native datatypes
//     // myJson[hash[0]] = JSON.parse(hash[1]);
//   }
//   return myJson;
// }

let get_data = async () => {
  var myQuery = document.getElementById("execQuery").value;
  console.log(myQuery);
  // console.log("+============================++++++++++++++++++++++");
  // var q = getUrlVars(window.location.href).q;
  // q.split("+").join(" ");
  // console.log(q);
  let url = `http://localhost:3000/insert_que?q=${myQuery}`;
  // console.log(url);

  let response = await fetch(url);

  if (response.status == 400) {
    const errorMessage = document.getElementById("showData");
    errorMessage.innerHTML = "";
    errorMessage.innerHTML = "<h3>The query is not valid</h3>";
    document.getElementById("showData").appendChild(errorMessage);
    return;
  }

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
