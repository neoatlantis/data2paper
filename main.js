import { DropFileLoader } from "./fileloader.js";
import { slice_data } from "./data_slicing.js";




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
        $("#filename").text(metadata.name);

        let slices = slice_data(data);
        slices.forEach((s) => draw_code(s));

        //  window.print();
    });

});
