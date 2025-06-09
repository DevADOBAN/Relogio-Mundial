class WorldClock {
    constructor() {
        this.timezones = {
            'UTC': 0,
            'GMT': 0,
            'EST': -5,
            'CST': -6,
            'MST': -7,
            'PST': -8,
            'CET': 1,
            'EET': 2,
            'IST': 5.5,
            'JST': 9,
            'AEDT': 11,
        };
    }

    getTimeByZone(zone) {
        const offset = this.timezones[zone];
        if (offset === undefined) {
            throw new Error('Timezone not recognized');
        }
        const date = new Date();
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const localTime = new Date(utc + (3600000 * offset));
        return localTime.toLocaleTimeString();
    }

    getAllTimes() {
        const times = {};
        for (const zone in this.timezones) {
            times[zone] = this.getTimeByZone(zone);
        }
        return times;
    }
}

export default WorldClock;