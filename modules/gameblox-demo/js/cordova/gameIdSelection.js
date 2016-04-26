jQuery(document).ready(function() {
  var gameIdSubmitButton = document.getElementsByClassName("gameIdSubmitButton")[0];
  gameIdSubmitButton.onclick = function(e) {
    window.location = "playerPage.html?gameId=" + document.getElementById("gameIdTextInput").value + "&rnd=" + Math.random();
  }


  jQuery(".qrcodeSelectorLink").click(function(e) {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
          window.location = "playerPage.html?sessionCode=" + result.text;
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
    );
  });

});


