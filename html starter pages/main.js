const members = data.results[0].members


function generateTable(members) {
    var tbl = document.getElementById('table')
    tbl.innerHTML = "";
    var header = document.createElement("thead");
    var hRow = document.createElement("tr");
    var hCell1 = document.createElement("td");
    var hText1 = document.createTextNode("Name");
    hCell1.appendChild(hText1);
    hRow.appendChild(hCell1);

    var hCell2 = document.createElement("td");
    var hText2 = document.createTextNode("Party");
    hCell2.appendChild(hText2);
    hRow.appendChild(hCell2);

    var hCell3 = document.createElement("td");
    var hText3 = document.createTextNode("States");
    hCell3.appendChild(hText3);
    hRow.appendChild(hCell3);

    var hCell4 = document.createElement("td");
    var hText4 = document.createTextNode("Years in Office");
    hCell4.appendChild(hText4);
    hRow.appendChild(hCell4);

    var hCell5 = document.createElement("td");
    var hText5 = document.createTextNode("%Votes w/Party");
    hCell5.appendChild(hText5);
    hRow.appendChild(hCell5);

    header.appendChild(hRow);
    tbl.appendChild(header);

    var tblBody = document.createElement("tbody");
    for (i = 0; i < members.length; i++) {
        var row = document.createElement("tr");
        d = document.getElementById("Democrat")
        if (members[i].middle_name == null) {
            members[i].middle_name = ""
        }

        row.insertCell().innerHTML = (members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name).link(members[i].url)
        row.insertCell().innerHTML = members[i].party;
        row.insertCell().innerHTML = members[i].state;
        row.insertCell().innerHTML = members[i].seniority;
        row.insertCell().innerHTML = members[i].votes_with_party_pct + "%";


        tblBody.appendChild(row);
        tbl.setAttribute("id", "table")
        row.setAttribute("id", "roow")

    }

    tbl.appendChild(tblBody)
}

generateTable(members);

function filterMembers() {
    // let selectedValues = [...document.querySelectorAll('input:checked')].map(checkbox => checkbox.value);
    // console.log(selectedValues)
    let selected = [];
    var boxes = document.getElementsByTagName("INPUT");
    var select = document.getElementById("selectstate");

    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.checked) {
            selected.push(box.value)
        }
    }
    //  let filteredMembers = members.filer(member => selected.includes(member.party))
    let filtered = [];
    for (let i = 0; i < members.length; i++) {
        if (selected.includes(members[i].party) && (members[i].state == select.value || select.value == "all")) {
            filtered.push(members[i])
        }
    }
    if (filtered.length > 0) {
        generateTable(filtered)
    } else {
        alert("Please select something")
    }
}

// var select = document.getElementById("selectstate");
// for (var i = 0; i < members.length; i++) {
//     var opt = members[i].state;
//     var el = document.createElement("option");
//     el.innerHTML = opt;
//     el.value = opt;
//     select.appendChild(el);

// }


let allStates = []
let select = document.getElementById("selectstate");
for (let i = 0; i < members.length; i++) {
    let eachState = members[i].state;
    allStates.push(eachState)
}

var allUnique = allStates.filter((item, index) => allStates.indexOf(item) === index).sort()
for (i = 0; i < allUnique.length; i++) {
    let unique = allUnique[i]
    let options = document.createElement("option");
    options.innerHTML = unique;
    select.appendChild(options)
}

// console.log(allUnique)




document.getElementById("Republican").addEventListener("click", filterMembers);
document.getElementById("Democrat").addEventListener("click", filterMembers);
document.getElementById("Independant").addEventListener("click", filterMembers);
document.getElementById("selectstate").addEventListener("change", filterMembers);



// window.onload = function () {
//     var accordions = document.querySelectorAll('#accordion .accordion-toggle');
//     for (var i = 0; i < accordions.length; i++) {
//         accordions[i].onclick = function () {

//             // Hide the other panels
//             // ( at first: avoid testing wich is not to hide :P )
//             var contents = this.parentElement.getElementsByClassName('accordion-content');
//             for (var i = 0; i < contents.length; i++) {
//                 contents[i].className = 'accordion-content';
//             }

//             // Expand or collapse this panel
//             this.nextElementSibling.className = 'accordion-content default';
//         };
//     }
// };

// var accordions = document.getElementsByClassName("accordion");

// for (var i = 0; i < accordions.length; i++) {
//     accordions[i].onclick = function () {
//         var content = this.nextElementSibling;

//         if (content.style.maxHeight) {
//             content.style.maxHeight = null;
//         } else {
//             content.style.maxHeight = content.scrollHeight + "px";
//         }
//     }
// }


function readMore() {
    var dots =
        document.getElementById("dots");
    var moreText =
        document.getElementById("more");
    var btnText =
        document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}


// var accordions = document.querySelectorAll("#accordion .accordion-toggle");
// for (var i = 0; i < accordions.length; i++) {
//     accordions[i].onclick = function () {
//         var contents = this.parentElement.getElementsByClassName("accordion-content");
//         for (var i = 0; i < contents.length; i++) {
//             contents[i].className = "accordion-content";
//         }
//         this.nextElementSibling.className = "accordion-content default";
//     };
// }






/*
var select = document.getElementById("selectstate");
 for(var i = 0; i < members.length; i++) {
     var opt = members[i].state;
     var el = document.createElement("option");
     el.innerHTML = opt;
     el.value = opt;
     select.appendChild(el);
 }
*/



/*
   for (i = 0; i < members.length; i++){
       var rows = document.createElement("tr");
       if (members[i].party === "R"){
           members.style.display = "block";
       } else {
           members.style.display = "none";
       }
   }
*/


//if (members[i].party === "R");

/*
const hideR = document.querySelector("#Republican");
hideR.addEventListener("change".function(e){
    if(hideR.chekced){
    members.style.display = "none";
} else {
    members.style.display = "initial";
}
}
                       });

*/



/*
if (filtered.length > 0) {
generateTable(filtered)
}else{alert("select something")}
}
*/