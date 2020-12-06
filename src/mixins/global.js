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
    }
}