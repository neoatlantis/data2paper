import { DropFileLoader } from "./fileloader.js";
import { slice_data } from "./data_slicing.js";

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}


function draw_code(data){
    class UA extends Uint8Array{
        constructor(x){ super(x); }
        charCodeAt(i){ return this[i]; }
    }

    let c = $("<span>").addClass("qrcode-container").appendTo("#qrcodes");

    let xcode = new QRCode({
        content: new UA(data),
        container: "svg-viewbox",
        ecl: "H",
        padding: 0,
    }).svg();
    $(xcode).appendTo(c);

}


$(function(){

    const loader = new DropFileLoader("body");

    loader.on("load", function(data, metadata){
        
        $("#qrcodes").empty();

        let { slices, key } = slice_data(data);
        slices.forEach((s) => draw_code(s));

        $(".filename").text(metadata.name);
        $(".datetime").text(new Date().toISOString());
        $(".key").text(buf2hex(key).toUpperCase());

        window.print();
    });

});
