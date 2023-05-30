export const getInterval = (postedT: string) => {
    const dtPosted = new Date(postedT).getTime()
    const curTime = new Date().getTime()

    var delta = Math.abs(curTime - dtPosted) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = Math.ceil(delta % 60);

    return {
        days,
        hours,
        minutes,
        seconds
    }
}