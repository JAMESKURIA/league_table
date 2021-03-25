//Display  the edit section

function showEditSection() {
  const dispBtn = document.querySelector("#dispBtn");

  dispBtn.addEventListener("click", buttonClicked);

  function buttonClicked() {
    const editSection = document.querySelector(".edit-section");

    edit.style.display = "none";
    remove.style.display = "none";
    editSection.classList.toggle("display");
    editSection.style.animation = "fadeIn 1s ease-in-out";

    var search = document.querySelector("#search");
    search.style.transform = "translateY(10%)";

    var span = dispBtn.parentNode;
    var p = span.parentNode;
    var root = p.parentNode;
    var next = root.nextElementSibling;

    //adding styling and changing the button text
    if (next.classList.contains("display")) {
      dispBtn.innerHTML = "Done!";
      dispBtn.style.backgroundColor = "rgb(190, 50, 50)";
      search.style.transform = "translateY(50%)";
      search.style.right = "1%";
    } else {
      dispBtn.innerHTML = "Edit!";
      dispBtn.style.backgroundColor = "rgb(38, 89, 131)";
      search.style.transform = "translateY(50%)";
    }
  }

  //Clear the edit-section inputs
  function clearTable() {
    const clearBtn = document.querySelector("#clear");
    clearBtn.addEventListener("click", function () {
      document.getElementById("form").reset();
    });
  }

  clearTable();
}

//Get and insert data to the table
function getData() {
  const addBtn = document.querySelector("#add");
  var search = document.querySelector("#search");
  var table = document.querySelector(".table");
  var length = table.children[0].lastElementChild.children.length;
  let b = 0;

  addBtn.addEventListener("click", insertData);

  function insertData() {
    const team = document.querySelector("#team").value;
    const P = document.querySelector("#P").value;
    const W = document.querySelector("#W").value;
    const D = document.querySelector("#D").value;
    let L = P - (W * 1 + D * 1);
    const GF = document.querySelector("#GF").value;
    const GA = document.querySelector("#GA").value;
    let GD = GF - GA;
    let Pts = W * 3 + D * 1;

    if (!team || !P || !W || !D || !GF || !GA) {
      alert("Please fill all the boxes");
      return;
    }

    //Add Html table row

    //create the cells
    for (var x = 0; x < 1; x++) {
      //create tr
      var row = document.createElement("tr");

      //create td
      for (var y = 0; y < length; y++) {
        var cell = document.createElement("td");

        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    b = row.rowIndex - 1;

    //assign values to the table

    row.children[0].innerHTML = b;
    row.children[1].innerHTML = team;
    row.children[2].innerHTML = P;
    row.children[3].innerHTML = W;
    row.children[4].innerHTML = D;
    row.children[5].innerHTML = L;
    row.children[6].innerHTML = GF;
    row.children[7].innerHTML = GA;
    row.children[8].innerHTML = GD;
    row.children[9].innerHTML = Pts;

    //removeDuplicate(table.rows);

    //sort the data in the table

    function sortTable() {
      var rows, switching, i, x, y, shouldSwitch;
      switching = true;

      while (switching) {
        switching = false;
        rows = table.rows;
        var list = Array.from(rows);
        var len = table.rows.length;

        for (i = 2; i < len; i++) {
          shouldSwitch = false;

          x = list[i].getElementsByTagName("td")[9];
          y = list[i + 1].getElementsByTagName("td")[9];

          if (y.innerHTML > x.innerHTML) {
            shouldSwitch = true;
            break;
          }
        }

        if (shouldSwitch) {
          list[i].parentNode.insertBefore(list[i + 1], list[i]);

          list[i].getElementsByTagName("td")[0].textContent =
            list[i].rowIndex - 1;

          list[i + 1].getElementsByTagName("td")[0].textContent =
            list[i + 1].rowIndex - 1;

          switching = true;
        }
      }
    }

    //filter the list

    //Display search if only there is more than two items data in the table
    if (row.rowIndex > 2) {
      search.style.display = "block";
      search.style.animation = "fadeIn 1s ease-in-out";
    }

    function filterItems() {
      search.addEventListener("keyup", function (e) {
        // take input and convert it to lowercase
        var text = e.target.value.toLowerCase();
        var lists = row.children;

        Array.from(lists).forEach(function (list) {
          var teamName = list.parentNode.children[1].innerText;
          if (teamName.toLowerCase().indexOf(text) != -1) {
            list.parentNode.style.display = "";
          } else {
            list.parentNode.style.display = "none";
          }
        });
      });
    }

    filterItems();
    selectedRow();
    sortTable();
  }
}
//selected table to output
function selectedRow() {
  var table = document.querySelector(".table");
  for (var x = 2; x < table.rows.length; x++) {
    table.rows[x].addEventListener("click", function () {
      edit.style.display = "";
      edit.style.animation = "fadeIn 1s ease-in-out";
      remove.style.display = "";
      remove.style.animation = "fadeIn 1s ease-in-out";
      clear.style.display = "none";
      clear.style.animation = "fadeIn 0.7s ease-in-out";

      rIndex = this.rowIndex;
      team.value = this.cells[1].textContent;
      P.value = this.cells[2].textContent;
      W.value = this.cells[3].textContent;
      D.value = this.cells[4].textContent;
      GF.value = this.cells[6].textContent;
      GA.value = this.cells[7].textContent;
    });
  }

  //edit the selected row
  function editSelected() {
    edit.addEventListener("click", function () {
      table.rows[rIndex].cells[1].textContent = team.value;
      table.rows[rIndex].cells[2].textContent = P.value;
      table.rows[rIndex].cells[3].textContent = W.value;
      table.rows[rIndex].cells[4].textContent = D.value;
      table.rows[rIndex].cells[5].textContent =
        P.value - (W.value * 1 + D.value * 1);
      table.rows[rIndex].cells[6].textContent = GF.value;
      table.rows[rIndex].cells[7].textContent = GA.value;
      table.rows[rIndex].cells[8].textContent = GF.value - GA.value;
      table.rows[rIndex].cells[9].textContent = W.value * 3 + D.value * 1;

      edit.style.display = "none";
      remove.style.display = "none";
      clear.style.display = "";
    });
  }

  //delete the selected row
  function deleteSelected() {
    remove.addEventListener("click", function () {
      table.deleteRow(rIndex);

      edit.style.display = "none";
      remove.style.display = "none";
      clear.style.display = "";
    });
  }
  editSelected();
  deleteSelected();
}

showEditSection();
getData();
