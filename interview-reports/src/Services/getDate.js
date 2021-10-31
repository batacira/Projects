export const getDate = (date) => {
    let d = new Date(date);
    let output = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + ".";
    return output;
}