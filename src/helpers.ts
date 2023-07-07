import * as moment from "moment";

export const getDatesPeriod = (startDate : string, endDate : string , steps = 1) : string[] => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate));
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    
    return dateArray.map((v)=>v.toISOString().slice(0,10) as string)
}

export const getMinDateFormat = () => {
    const date = new Date();
    
    return date.toLocaleDateString("en-GB", { // you can use undefined as first argument
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

export const dateDiffInDays = (a : Date, b : Date) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export const createSlots = (startTime : string , endTime : string , slotDuration : number , prepBreakInMinute : number) : {startTime : string , endTime : string}[] => {
    let slotTime = moment(startTime, "HH:mm");
    const slotEndTime = moment(endTime, "HH:mm");
    
    let times = [];
    while (slotTime < slotEndTime)
    {
      let time : {
        startTime : string,
        endTime? : string
      } = {
        startTime : slotTime.format("HH:mm")
      }
      slotTime = slotTime.add(slotDuration, 'minutes');
      time.endTime = slotTime.format("HH:mm");
      slotTime = slotTime.add(prepBreakInMinute, 'minutes');

      times.push(time)
    }
    
    return times;
}