/*
 * Function for dividing data into slices, adding header to each of them, and
 * return as an array for QRCode encoding.
 */

const HEADER_LEN = 2 + 8 + 1 + 1; // MAGIC Bytes(2) + 64-bit hash(8) + piece nr. + count;
const VOLUME_MAX = 400 - HEADER_LEN;
const VOLUME_MIN = 100 - HEADER_LEN;
const Nmax = 12;

function slice_data(data){
    
    var divlen, n;
    if(data.length < Nmax * VOLUME_MIN){
        divlen = VOLUME_MIN;
        n = Math.ceil(data.length / divlen);
    } else {
        divlen = Math.ceil(data.length / Nmax);
        n = Nmax;
    }

    if(divlen > VOLUME_MAX){
        throw Error("File too large.");
    }

    let hash = new BLAKE2s(8).update(data).digest();

    let i = 0, ret = [];
    let index = 0;
    while(i < data.length){
        let raw_slice = data.subarray(i, i+divlen);
        i += divlen;

        let slice = new Uint8Array(raw_slice.length + HEADER_LEN);
        slice.set(raw_slice, HEADER_LEN);

        slice[0] = 0x70; // just a magic word, being "p"
        slice[1] = 0x01; // another magic word, but also indicating version

        slice.set(hash, 2);
        slice[10] = index; index += 1;
        slice[11] = n; // total

        ret.push(slice);
    }

    return ret;

}

export { slice_data };
