let modTemplate = '<p>You are about to change the name of the department. ';
modTemplate += 'Please, enter the new information about the department.</p>';
modTemplate += '<table><tr><td style="background-color:white">Dept Code: </td>';
modTemplate += '<td style="background-color:white"><input type="text" id="dept_code_mod" value="{*dept_code*}"> '; //input box 1
modTemplate += '<span style="font-size:0.75rem">enter numbers only</span></td></tr>';
modTemplate += '<tr><td style="background-color:white">Dept Name: </td>';
modTemplate += '<td style="background-color:white"><input type="text" id="name_mod" value="{*name*}"></td></tr></table>'; // input box 2
modTemplate += '<p style="font-size:0.75rem">* Department Code is a unique number. Don\'t use an existing number.</p>';

const fillModTemplate = (param1,param2) =>{ // same as 'function fillModStr(param1,param2){'
    return modTemplate.replace("{*dept_code*}", param1).replace("{*name*}", param2)
}