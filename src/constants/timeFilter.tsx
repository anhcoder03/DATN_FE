import moment from "moment";
export const timeFilter =  [
    {
        title:'Hôm nay',
        from:new Date(moment().startOf("day").unix() * 1000),
        to :new Date(moment().endOf("day").unix() * 1000),
    },
    {
        title:'Hôm qua',
        from:new Date(moment().subtract(1, "day").startOf("day").unix() * 1000),
        to :new Date(moment().subtract(1, "day").endOf("day").unix() * 1000),
    },
    {
        title:'Tuần này',
        from:new Date(moment().startOf("isoWeek").unix() * 1000),
        to:new Date(moment().endOf("day").unix() * 1000),
    },
    {
        title:'Tháng này',
        from:new Date(moment().startOf("month").unix() * 1000),
        to:new Date(moment().endOf("day").unix() * 1000),
    },
    {
        title:'Tháng trước',
        from:new Date(moment().subtract(1, "month").startOf("month").unix() * 1000),
        to:new Date(moment().subtract(1, "month").endOf("month").unix() * 1000),
    },
    {
        title:'Năm nay',
        from:new Date(moment().startOf("year").unix() * 1000),
        to:new Date(moment().endOf("day").unix() * 1000),
    }
]
export const timeMiniFilter =  [
    {
        title:'Hôm nay',
        from:new Date(moment().startOf("day").unix() * 1000),
        to :new Date(moment().endOf("day").unix() * 1000),
    },
    {
        title:'Hôm qua',
        from:new Date(moment().subtract(1, "day").startOf("day").unix() * 1000),
        to :new Date(moment().subtract(1, "day").endOf("day").unix() * 1000),
    },
    {
        title:'Tháng này',
        from:new Date(moment().startOf("month").unix() * 1000),
        to:new Date(moment().endOf("day").unix() * 1000),
    },
    {
        title:'Tháng trước',
        from:new Date(moment().subtract(1, "month").startOf("month").unix() * 1000),
        to:new Date(moment().subtract(1, "month").endOf("month").unix() * 1000),
    },
]
export const timeMonthFilter =  [
    {
        title:'Tháng này',
        from:new Date(moment().startOf("month").unix() * 1000),
        to:new Date(moment().endOf("day").unix() * 1000),
    },
    {
        title:'Tháng trước',
        from:new Date(moment().subtract(1, "month").startOf("month").unix() * 1000),
        to:new Date(moment().subtract(1, "month").endOf("month").unix() * 1000),
    }
]
export const timeWeekhFilter =  [
    {
        title:'Tuần này',
        from:new Date(moment().startOf("isoWeek").unix() * 1000),
        to:new Date(moment().endOf("day").unix() * 1000),
    },
    {
        title:'Tuần trước',
        from:new Date(moment().subtract(1, "week").startOf("isoWeek").unix() * 1000),
        to:new Date(moment().subtract(1, "week").endOf("isoWeek").unix() * 1000),
    },
]