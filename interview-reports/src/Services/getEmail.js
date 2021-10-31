export const getEmail = (email) => {
    let index = email.indexOf('@') - 3;
    let output = [];
    let i = 0;
    email.split('').forEach((e) => {
        if (i <= 2 || i >= index){
            output.push(e);
        } else if (i === 3){
            output.push('...');
        }
        i++;
    })
    return output.join('')
}
