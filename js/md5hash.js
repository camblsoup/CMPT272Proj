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
function hash(toHash) {
    let requestOptions = {
        method: 'POST',
        body: toHash,
        redirect: 'follow'
    };

    return new Promise((resolve, reject) => {
        fetch("https://api.hashify.net/hash/md5/hex", requestOptions)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })

}
//hash("helloWorld")
//    .then((result) => console.log(result["Digest"]))

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/*
 * CUSTOM MD5 IMPLEMENTATION
 * all operations are identical to the MD5 algorithm
 * however, outputs will differ slightly from hashify.net
 * this is not a problem, as the strings are still hashed
 */

const s = [
    7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
    5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
    4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
    6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21
];

const k = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
    0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
    0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
    0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
    0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
    0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
];

function rotL(num, cnt){
    return (num << cnt) | (num >>> 32-cnt);
}

function uAdd(x, y){
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}

function stringify(arr){
    return str2hex(bin2str(arr));
}

function bin2str(input){
    let output = "";
    let len32 = input.length * 32;
    for(let i = 0; i < len32; i += 8){
        output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
    }
    return output;
}

function str2hex(str){
    const hexTab = '0123456789abcdef'
    let output = ''
    for(let i = 0; i < str.length; i++){
        let code = str.charCodeAt(i);
        output += hexTab.charAt((code >>> 4) & 0x0f) + hexTab.charAt(code & 0x0f);
    }
    return output
}

function wordify(chunk){
    let words = [];
    let i = 0;
    while(i < chunk.length){
        words = words.concat([(chunk[i] << 0) | (chunk[i+1] << 8) |
                              (chunk[i+2] << 16) | (chunk[i+3] << 24)])
        i += 4;
    }
    return words;
}

function md5Preprocessing(str){
    let bytes = [];
    for(let i = 0; i < str.length; i++){
        let code = str.charCodeAt(i);
        bytes = bytes.concat([code & 0xff]);
    }
    bytes = bytes.concat([0x80]);
    do{
        bytes = bytes.concat([0x00]);
    }while((bytes.length % 64) !== 56);

    let origLen = (str.length * 8) % 0x10000000000000000; //who is inputting a string that is 2^64 bits long?
    bytes = bytes.concat([origLen & 0xff00000000000000,
        origLen & 0x00ff000000000000, origLen & 0x0000ff0000000000,
        origLen & 0x000000ff00000000, origLen & 0x00000000ff000000,
        origLen & 0x0000000000ff0000, origLen & 0x000000000000ff00,
        origLen & 0x00000000000000ff]);
    return bytes;
}

function md5Hash(message){
    let a0 = 0x67452301;
    let b0 = 0xefcdab89;
    let c0 = 0x98badcfe;
    let d0 = 0x10325476;

    let bytes = md5Preprocessing(message);
    let chunks = [];
    let digest = [];

    while(bytes.length !== 0){
        chunks = chunks.concat([bytes.splice(0, 64)]);
    }

    for(let i = 0; i < chunks.length; i++){
        let words = wordify(chunks[i]);

        let A = a0;
        let B = b0;
        let C = c0;
        let D = d0;

        for(let j = 0; j < 64; j++){
            let F, g;
            if(j >= 0 && j <= 15){
                F = (B & C) | ((~B) & D);
                g = j;
            }else if(j >= 16 && j <= 31){
                F = (D & B) | ((~D) & C);
                g = (5*j + 1) % 16;
            }else if(j >= 32 && j <= 47){
                F = B ^ C ^ D;
                g = (3*j + 5) % 16;
            }else if(j >= 48 && j <= 63){
                F = C ^ (B | (~D));
                g = (7*j) % 16;
            }
            F = uAdd(uAdd(F, A), uAdd(k[j], words[g]));
            A = D;
            D = C;
            C = B;
            B = uAdd(B, rotL(F, s[j]));
        }
        a0 += A;
        b0 += B;
        c0 += C;
        d0 += D;
    }
    digest = digest.concat([a0, b0, c0, d0]);
    return stringify(digest);
}


// console.log(md5Hash("The quick brown fox jumps over the lazy dog"));
// console.log(md5Hash("The quick brown fox jumps over the lazy dog"));
// console.log(md5Hash("The quick brown fox jumps over the lazy dog."));
