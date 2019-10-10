const app = new Vue({
    el: '#app',
    data: {
        membersData: [],
        checked: ["R", "D", "I"],
        checkedParty: [],
        select: "all"
    },
    created() {
        this.getData('https://api.propublica.org/congress/v1/113/senate/members.json')
    },
    methods: {
        getData: async function (url) {
            this.membersData = await fetch(url, {
                    method: "GET",
                    headers: new Headers({
                        'X-API-key': 'Gqs9dMSRw1Y8Dws25dBBhFwLX0t19eeVPELeUxfK'
                    })
                })
                .then(response => response.json())
                .then(data => data.results[0].members)
        },

    },
    computed: {
        filteredMembers() {
            if (this.select == "all") {
                return this.membersData.filter(member => this.checked.includes(member.party))
            } else {
                return this.membersData.filter(member => this.checked.includes(member.party) && this.select.includes(member.state))
            }
        },
    }
});





// let selected = this.select.includes(membersData.state)

// for (let i = 0; i < this.membersData.length; i++) {
//     let allParty = this.membersData[i]
//     if (this.checked.includes(allParty.party)) {
//         this.checkedParty.push(allParty)
//     }
// }