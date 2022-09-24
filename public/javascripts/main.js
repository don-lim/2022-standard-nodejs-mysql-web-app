const isEmpty = value => { // same as 'function isEmpty(value){'
    if (typeof value === 'number') return false
    else if (typeof value === 'string') return value.trim().length === 0
    else if (Array.isArray(value)) return value.length === 0
    else if (typeof value === 'object') return value == null || Object.keys(value).length === 0
    else if (typeof value === 'boolean') return false
    else return !value
}

const modalAlert = (msgHTML,title) => { // same as 'function modalAlert(msgHTML,title){'
    console.log(msgHTML,title)
    title = isEmpty(title) ? 'Message' : title; // Let 'Message' be the default value if there's no object or text.
    let str = '<h4 class="modal-title">'+title+'</h4>'
    str += msgHTML;
    str += '<div class="plainmodal-close" onclick="$(\'#alertWindow\').plainModal(\'close\')">&#215;</div>';
    $('#alertWindow').html(str);
    setTimeout(() => {$('#alertWindow').plainModal('open');}, '500');
}

const modalPrompt = (content,onclickAction,buttonName,title) => { // function to confirm user input
    // here write texts to be displayed on the pop-up window:
    title = isEmpty(title) ? 'Prompt' : title; // Let 'Notice' be the default value if there's no object or text.
    buttonName = isEmpty(buttonName) ? 'OK' : buttonName; // Let OK' be the default value if there's no object or text.
    let str = '<div class="modal-header">';
    str += '<div class="plainmodal-close" onclick="$(\'#promptWindow\').plainModal(\'close\');">&#215;</div>';
    str += '<h4 class="modal-title">' + title + '</h4>';
    str += '</div>';
    str += '<div class="modal-body" id="popcontent1">';
    str += content;
    str += '</div>';
    str += '<div class="modal-footer">';
    str += '<button class="plainmodal-close" onclick="$(\'#promptWindow\').plainModal(\'close\')">Close</button>';
    str += '<button class="plainmodal-close btn-primary" onclick="' + onclickAction + ';$(\'#promptWindow\').plainModal(\'close\');">' + buttonName + '</button>';
    str += '</div>';
    
    $('#promptWindow').html(str);
    setTimeout(() => {$('#promptWindow').plainModal('open');}, '500'); // somehow this command doesn't work without a short pause
}

const submitForm = (url,params) => { // same as 'function submitForm(url,params){'
    let data = {}; // You have to declare a global variable to use it throughout the function. This is similar to 'let data = new Array()'. However, you sometimes may need to define an array as 'let myArray = []' because arrays flanked by [] and {} behave little bit differently.

    // 'if - else if - else' method
    /*if(url=='controller/addDept'){
        let dept_code_new = $('#dept_code_new').val();
        let name_new = $('#name_new').val();
        data={"dept_code_new":dept_code_new,"name_new":name_new};
    } else if {

    } else {

    }*/

    // 'switch - case' method is easier to read
    switch (url) {
        case 'controller/addDept':
            let dept_code_new = $('#dept_code_new').val(); //get the value from the <input id="dept_code_new">
            let name_new = $('#name_new').val(); //get the value from the <input id="name_new">
            data={ "dept_code_new":dept_code_new, "name_new":name_new };
            break;
        case 'controller/delDept':
            data={ "dept_code":params };
            break;
        case 'controller/modDept':
            let dept_code_mod = $('#dept_code_mod').val(); //Get the value from the <input id="dept_code_mod"> in the pop-up window. The pop-up has disappeared or hidden from the screen, but the HTML in the pop-up is still there.
            let name_mod = $('#name_mod').val(); //Get the value from the <input id="name_mod"> in the pop-up window. The pop-up has disappeared or hidden from the screen, but the HTML in the pop-up is still there.
            data={ "dept_code":params, "dept_code_mod":dept_code_mod, "name_mod":name_mod };
            break;                
        default:
            alert('Something went wrong. 😢 \''+ url +'\' is unknown.');
            return false; // stop the function and do not perform next processes.
    }

    console.log("data:",data); // Avoid using console.log in client side scripts. Erase them in production.

    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data), // this simulates stringified JSON gathered from multiple <input id="name"> inside the <body></body> tag.
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('response from controller.js:', data);
        //modalAlert(JSON.stringify(data),'Response');
        //setTimeout(function() {
            modalPrompt(
                '<p>Received Response:</p><p>' + JSON.stringify(data) + '</p><p>Do you wish to reload the page?</p>','location.reload(true)','Reload','Response');
        //}, 100);
    })
    .catch((error) => {console.error('Error:', error);}); // You can reuse the variable 'data', since it will be reset when this function is called again. But, kindly use a new variable for your reviewers or colleagues not to be confused.
                
    /*// old method similar to 'fetch'
    $.ajax({ 
        type : 'POST',
        url  : url,
        data : params,
        success :  function(result){
            $(".div1").html(result);
        }
    });*/
}