
// performs a given iterator on each member of an array; if the member is a function, it's invoked
// and the iterator is performed on the result
export function invokeEach(arr, iterator) {
    arr.forEach(item => {
        if (typeof item === 'function') {
            item = item();
        }

        iterator(item);
    });
}
