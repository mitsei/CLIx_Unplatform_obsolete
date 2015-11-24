// This is the client-side script.
<script type="text/javascript">
// Initialize the Http request.
var xhr = new XMLHttpRequest();
xhr.open('get', 'api');

// Track the state changes of the request.
xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
            alert(xhr.responseText); // 'This is the returned text.'
        } else {
            alert('Error: ' + xhr.status); // An error occurred during the request.
        }
    }
};
