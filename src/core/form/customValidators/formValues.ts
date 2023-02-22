export function getFormValues(obj) {
    return Object.entries(obj.controls).reduce((prev, curr) => {
        prev[curr[0]] = curr[1].value;
        return prev;
    }, {});
}
