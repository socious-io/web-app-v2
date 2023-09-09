export function getFormValues(obj) {
 
    return Object.entries(obj.controls).reduce((prev, curr) => {
        if(curr[1].type !=="password")
            prev[curr[0]] = curr[1].value;
        else
            prev[curr[0]] = curr[1].value.trim();
        return prev;
    }, {});
}
