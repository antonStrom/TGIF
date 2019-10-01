const app = new Vue({
    el: '#app',
    data: {
        membersData: [],
        name: "",
        names: {},
        checkedNames: []
    },
    created() {
        this.getData('https://api.propublica.org/congress/v1/113/house/members.json')
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
            // console.log(this.membersData)
        }
    },
    computed: {}
});