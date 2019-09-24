const membersData = data.results[0].members


let newData = [{
        Party: "Democrat",
        Number: 0,
        Voted: 0,
        Average: 0,
    },
    {
        Party: "Republican",
        Number: 0,
        Voted: 0,
        Average: 0
    },
    {
        Party: "Independent",
        Number: 0,
        Voted: 0,
        Average: 0
    }
];
let leastMemberVotes = []





for (var i = 0; i < membersData.length; i++) {
    var allParty = membersData[i].party
    var pctVotes = membersData[i].votes_with_party_pct
    var missedVotes = membersData[i].missed_votes

    if (pctVotes != null) {
        if (allParty.includes("D")) {
            newData[0].Number++;
            if (membersData[i].total_votes != null) {
                newData[0].Voted = Math.round(newData[0].Voted + pctVotes);
                newData[0].Average = Math.round(newData[0].Voted / newData[0].Number);
                leastMemberVotes.push(membersData[i])
            }
        } else if (allParty.includes("R")) {
            newData[1].Number++;
            if (membersData[i].total_votes != null) {
                newData[1].Voted = Math.round(newData[1].Voted + pctVotes);
                newData[1].Average = Math.round(newData[1].Voted / newData[1].Number);
                leastMemberVotes.push(membersData[i])
            }
        } else if (allParty.includes("I")) {
            newData[2].Number++;
            if (membersData[i].votes_with_party_pct != null) {
                newData[2].Voted = Math.round(newData[2].Voted + pctVotes);
                newData[2].Average = Math.round(newData[2].Voted / newData[2].Number);
                leastMemberVotes.push(membersData[i])
            }
        }
    }
}

let attendanceSortAsc = [...leastMemberVotes.sort((a, b) => parseFloat(a.missed_votes) - parseFloat(b.missed_votes))]
let tenPercent = attendanceSortAsc[Math.round(leastMemberVotes.length * 0.1)].missed_votes

let leastToWorst = [...leastMemberVotes.sort((b, a) => parseFloat(a.missed_votes) - parseFloat(b.missed_votes))]
let leastEngaged = leastToWorst[Math.round(leastToWorst.length * 0.1)].missed_votes


let sortBig = [...leastMemberVotes.sort((a, b) => parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct))]
let leastLoyal = sortBig[Math.round(sortBig.length * 0.1)].votes_with_party_pct

let sortSmall = [...leastMemberVotes.sort((b, a) => parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct))]
let mostLoyal = sortSmall[Math.round(sortSmall.length * 0.1)].votes_with_party_pct


senateGlance()



let topTen = getTopTenPercentArray(attendanceSortAsc, tenPercent, "missed_votes")
let topTenLoyal = getTopTenPercentArray(sortBig, leastLoyal, "votes_with_party_pct")
// let bottomTen = getBottomTenPercentArray(sortSmall, leastEngaged, "missed_votes")
// let bottomTenLoyal = getBottomTenPercentArray(sortBig, leastLoyal, "votes_with_party_pct")

// 


let bottomTen = []
for (i = 0; i < leastToWorst.length; i++) {
    let fff = leastToWorst[i]

    if (fff.missed_votes >= leastEngaged) {
        bottomTen.push(fff)
    }
}

let bottomTenLoyal = []
for (i = 0; i < sortBig.length; i++) {
    let rrr = sortBig[i]
    // console.log(rrr.votes_with_party_pct <= leastLoyal, `${rrr.votes_with_party_pct} <= ${leastLoyal}`)
    if (rrr.votes_with_party_pct <= leastLoyal) {
        bottomTenLoyal.push(rrr)
    }
}

if (location.pathname == "/senate_senate-party-loyalty-starter-page.html" || location.pathname == "/senate_house-party-loyalty-starter-page.html") {
    loyalTable("leastLoyal", bottomTenLoyal);
    loyalTable("mostLoyal", topTenLoyal);
}

if (location.pathname == "/senate_senate-attendance-starter-page.html" || location.pathname == "/senate_house-attendance-starter-page.html") {
    loyalTable("table2", bottomTen);
    loyalTable("table3", topTen);
}




//   First table (senate at a glance)
function senateGlance() {
    var tbl = document.getElementById("table1")
    var header = document.createElement("thead");
    var hRow = document.createElement("tr");

    var hCell1 = document.createElement("td");
    var hText1 = document.createTextNode("Party");
    hCell1.appendChild(hText1);
    hRow.appendChild(hCell1);

    var hCell2 = document.createElement("td");
    var hText2 = document.createTextNode("Number of representative");
    hCell2.appendChild(hText2);
    hRow.appendChild(hCell2);

    var hCell3 = document.createElement("td");
    var hText3 = document.createTextNode("Average votes with party");
    hCell3.appendChild(hText3);
    hRow.appendChild(hCell3);

    header.appendChild(hRow);
    tbl.appendChild(header);

    var tblBody = document.createElement("tbody");
    for (i = 0; i < newData.length; i++) {
        var row = document.createElement("tr");

        row.insertCell().innerHTML = newData[i].Party;
        row.insertCell().innerHTML = newData[i].Number;
        row.insertCell().innerHTML = newData[i].Average + "%";

        tblBody.appendChild(row);

    }

    tbl.appendChild(tblBody);
}


function getTopTenPercentArray(sortedArray, topValue, key) {
    let array = [];
    for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i][key] <= topValue) {
            array.push(sortedArray[i])
        } else {
            break;
        }
    }
    return array;
}

// function getBottomTenPercentArray(sortedArray, topValue, key) {
//     let array = [];
//     for (let i = 0; i < sortedArray.length; i++) {
//         if (sortedArray[i][key] >= topValue) {
//             array.push(sortedArray[i])
//         } else {
//             break;
//         }
//     }
//     return array;
// }

//   most/least loyal
function loyalTable(id, top) {
    var tbl = document.getElementById(id)

    var tblBody = document.createElement("tbody");
    for (i = 0; i < top.length; i++) {
        var row = document.createElement("tr");

        if (top == bottomTen || top == topTen) {
            row.insertCell().innerHTML = top[i].first_name + " " + top[i].last_name;
            row.insertCell().innerHTML = top[i].missed_votes;
            row.insertCell().innerHTML = top[i].missed_votes_pct + "%";
        }


        if (top == bottomTenLoyal || top == topTenLoyal) {
            row.insertCell().innerHTML = top[i].first_name + " " + top[i].last_name;
            row.insertCell().innerHTML = top[i].total_votes;
            row.insertCell().innerHTML = top[i].votes_with_party_pct + "%";
        }

        tblBody.appendChild(row);


    }

    tbl.appendChild(tblBody)
}