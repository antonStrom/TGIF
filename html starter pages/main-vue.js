const app = new Vue({
    el: '#app',
    data: {
        membersData: [],
        checked: [],
        checkedParty: [],
        select: []
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
            return this.membersData.filter(member => this.checked.includes(member.party))
        },
        selected() {
            return this.membersData.filter(member => this.select.includes(member.party))
        }
    }
});


// for (let i = 0; i < this.membersData.length; i++) {
//     let allParty = this.membersData[i]
//     if (this.checked.includes(allParty.party)) {
//         this.checkedParty.push(allParty)
//     }
// }