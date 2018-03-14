
var contractAddress = "0xF9B8986790f34d5147bf831D0bbc739986b36dd6";
var toAddress = "0x7aE5a2DcD420c5c67931099EB7a31aBbd1c29448";
var contract = null;
var contractABI = null;

if(web3){
    $.getJSON('https://api.etherscan.io/api?module=contract&action=getabi&address=' + contractAddress, function(data) {
        contractABI = JSON.parse(data.result);
        if (contractABI != ''){
            contract = web3.eth.contract(contractABI).at(contractAddress);
            console.log(contract);
        } else {
            console.error("Error");
        }            
    });
} else {
    alert("NO METAMASK DETECTED!");
}




$("button").click(function(e){
    var data = e.target.dataset;
    var design = data.design;
    var price = data.price;
    var email = $("#inputEmail").val();
    var name = $("#inputName").val();
    var size = $("#inputSize").val();
    var txHash = null;

    // console.log(email,name,size,design,price);

    if(!email){
        alert("Fill in email!");
        return;
    }

    if(!name){
        alert("Fill in name!");
        return;
    }

    if(!size){
        alert("Fill in size!");
        return;
    }


    contract.transfer(toAddress, web3.toWei(price), function(error, response){
        if(error){
            alert(error);
        } else {
            console.log(response);
            alert("Tnx! We will contact you soon!");

            var url = "https://hooks.slack.com/services/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";
            var text = "Email: " + email + "\nName: " + name + "\nSize: " + size + "\nDesign: " + design + "\nPrice: " + price + "\nTX: " + response;
            $.ajax({
                data: 'payload=' + JSON.stringify({
                    "text": text
                }),
                dataType: 'json',
                processData: false,
                type: 'POST',
                url: url
            });
        }
    });
})