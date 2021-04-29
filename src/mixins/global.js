export default {
    data() {
        return {
            rowsPerPage: 10,
            customToolbar: [
                ['bold', 'italic', 'underline', 'link'],
            ],
        }
    },
    methods: {
        setUserToken(token) {
            var now = new Date();
            now.setTime(now.getTime() + 43200000);
            var userTokenCookie = 'oshmiToken' + "=" + encodeURIComponent(token);
            userTokenCookie += "; expires=" + now.toGMTString(); + ";"
            document.cookie = userTokenCookie;
        },
        getToken() {
            var cookieArr = document.cookie.split(";");
            for(var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");
                
                if('oshmiToken' == cookiePair[0].trim()) {
                    return decodeURIComponent(cookiePair[1]);
                }
            }  
            return false;
        },
        deleteToken() {
            document.cookie = 'oshmiToken=; expires = Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            localStorage.removeItem('oshmiAdmin');
        },
        getLoggedUser() {
            const loggedUser = JSON.parse(localStorage.getItem('oshmiAdmin'));
            if(loggedUser) {
                return loggedUser;
            }
            return null;
        },
        splitDate(date) {
            return date.split('T')[0]
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
        getSeparatedDate(date) {
            let customDate = date.split('T')[0]
            customDate = customDate.split('-')
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var getMonth = months[customDate[1] - 1]
            var getDay = customDate[2];
            var getYear = customDate[0];

            return {
                month: getMonth,
                day: getDay,
                year: getYear
            }
        },
        getLicenses() {
            return [
                '強制性基本安全訓練課程 - Mandatory Basic Safety Training',
                '強制性基本安全訓練及重新甄審資格課程 - Mandatory Basic Safety Training - Revalidation',
                '密閉空間「核准工人」安全訓練課程 - Certified Work Of Confined Space Operation',
                '密閉空間作業「核准工人」安全訓練重新甄審資格課程 - Certified Worker Of Confined Space Operation (Revalidation)',
                '密閉空間作業「合資格人士」銜接課程 - Certified Worker Upgrade To Competent Person',
                '密閉空間作業「合資格人士和核准工人」 安全訓練課程 - Competent Person & Certified Work Of Confined Space Operation',
                '密閉空間作業「合資格人士和核准工人」 安全訓練重新甄審資格課程 - Competent Person & Certified Work Of Confined Space Operation (Revalidation)',
                '氣體焊接安全訓練 - Gas Welding Safety Training Course',
                '氣體焊接安全訓練及重新甄審資格課程 - Gas Welding Safety Training Course - Revalidation'
            ]
        }
    }
}