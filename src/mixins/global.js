export default {
    methods: {
        getLoggedUser() {
            const loggedUser = JSON.parse(localStorage.getItem('oshmiAdmin'));
            if(loggedUser) {
                return loggedUser;
            }
            return null;
        },
        toast(val) {
            this.$bvToast.toast(val.message, {
                title: val.title,
                variant: val.type,
                autoHideDelay: 3500,
            })
        },
        move(to) {
            if(this.$route.path != to) {
                this.$router.push({path: to})
            }
        },
        getMonths() {
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        getDate(date) {
            let customDate = date.split('T')[0]
            customDate = customDate.split('-')
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var getMonth = months[customDate[1] - 1]
            var getDay = customDate[2];
            var getYear = customDate[0];

            var newDate = getMonth + " " + getDay + ", " + getYear

            return newDate
        },
        getLicenses() {
            return [
                'License A',
                'License B',
                'License C',
                'License D',
                'License E',
                'License F'
            ]
        }
    }
}