import moment from "moment";

export default class CalcUtils {
    static calculateAge = (birthday: any) => {
        const now = moment();
        const birthDate = moment(birthday);

        const years = now.diff(birthDate, 'year');
        birthDate.add(years, 'years');

        const months = now.diff(birthDate, 'months');
        birthDate.add(months, 'months');

        const days = now.diff(birthDate, 'days');

        return `${Math.max(years, 0)} tuổi, ${Math.max(months, 0)} tháng, ${Math.max(days, 0)} ngày`;
    }

    static daysInMonth = (month: any, year: any) => {
        return new Date(year, month + 1, 0).getDate();
    }

    static calculateAgeOld = (birthday?: any) => {
        if (!birthday) return null;
        const birthDate = new Date(birthday);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        const dayDiff = currentDate.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        const months = Math.max((currentDate.getMonth() + 12 - birthDate.getMonth()) % 12, 0);
        const days = Math.max(currentDate.getDate() - birthDate.getDate(), 0);
        const totalMonths = Math.max((age * 12) + months, 0);
        if (currentDate.getFullYear() - birthDate.getFullYear() === 1 && currentDate.getMonth() - birthDate.getMonth() === 0 && dayDiff < 0) {
            return 1 + " tuổi, " + 0 + " tháng, " + days + " ngày 1"
        }


        if (age < 0) return `0 tuổi, 0 tháng, 0 ngày 2`
        age = Math.max(age, 0)

        if (totalMonths > 60) return `${age} tuổi, ${months} tháng 3`
        if (totalMonths < 24) {
            return age + " tuổi, " + months + " tháng, " + days + " ngày 4"
        }

        if (totalMonths >= 24 && totalMonths <= 60) {
            return `${age} tuổi, ${months} tháng (${totalMonths} tháng)`
        }
        return age + " tuổi, " + months + " tháng, " + days + " ngày 5"
    }
    static getAgeLabel = (birthday?: any) => {
        if (!birthday) return null;
        const months = moment(birthday).format("MM")
        const years = moment(birthday).format("YYYY")
        const monthNow = moment().format("MM")
        const yearNow = moment().format("YYYY")
        let ageYear: number = 0;
        let ageMonth: number = 0;
        if (months > monthNow) {
            ageYear = Number(yearNow) - Number(years) - 1;
            ageMonth = 12 - Number(months) + Number(monthNow)
        }
        else {
            ageYear = Number(yearNow) - Number(years);
            ageMonth = Number(monthNow) - Number(months)
        }

        if (ageYear <= 5) {
            return `${ageYear} tuổi ${ageMonth} tháng (${Number(ageYear) * 12 + Number(ageMonth)} tháng)`
        }
        else {
            return `${ageYear} tuổi ${ageMonth} tháng`
        }
    }
    static getExpiryStatus = (expireMoment?: any) => {
        const now = moment();
        const remaining = {
            title: "",
            calssName: "",
        }
        expireMoment = moment(expireMoment)
        if (expireMoment < now) {
            remaining.title = 'Đã hết hạn'
            remaining.calssName = 'text-danger'
        }
        const diffMonth: any = expireMoment.diff(moment(), 'months');
        const diffDay: any = expireMoment.diff(moment(), 'days');
        if (diffDay <= 0) {
            remaining.title = 'Đã hết hạn'
            remaining.calssName = 'text-danger'
        } else if (diffMonth <= 3) {
            remaining.title = 'Còn < 3 tháng'
            remaining.calssName = 'text-warning'
        } else if (diffMonth < 6) {
            remaining.title = 'Còn < 6 tháng'
            remaining.calssName = 'text-warning'
        } else if (diffMonth >= 6) {
            remaining.title = 'Còn hạn > 6 tháng'
            remaining.calssName = 'text-dark'
        } else {
            remaining.title = '---'
            remaining.calssName = 'text-dark'
        }
        return {
            ...remaining, diffMonth, diffDay
        };

    }
    static checkAge5 = (birthday?: any) => {
        if (!birthday) return false;
        const now = moment();
        const birthDate = moment(birthday);

        const years = now.diff(birthDate, 'year');
        birthDate.add(years, 'years');

        if (Math.max(years, 0) < 5) {
            return true
        }
        else {
            return false
        }
    }

}
