/*
 * MD5 HASH FUNCTION
 * USES HASHIFY.NET API
 */

//using this function:
//      hash("anystring").then(result => {
//              let hashed = result["Digest"]
//              /* Operate on the returned value */
//          }).catch(err => console.log(err));
//
//@param {string} toHash - string to be hashed
//@return {Promise} - returns a promise object
function hash(toHash: string) {
    const requestOptions = {
        method: 'POST',
        body: toHash,
        redirect: 'follow' as RequestRedirect
    };

    return new Promise((resolve, reject) => {
        fetch("https://api.hashify.net/hash/md5/hex", requestOptions)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })

}

export default hash;
//hash("helloWorld")
//    .then((result) => console.log(result["Digest"]))