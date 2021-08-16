// Добавление данных на страницу юзера
fetch("http://localhost:8080/rest/user").then(
    res => {
        res.json().then(
            data => {
                $('#header').append(data.username+' with roles: '+ data.rolesToString);
                let temp = "";
                temp += "<tr>";
                temp += "<td>" + data.id + "</td>"
                temp += "<td>" + data.name + "</td>"
                temp += "<td>" + data.lastname + "</td>"
                temp += "<td>" + data.age + "</td>"
                temp += "<td>" + data.username + "</td>"
                temp += "<td>" + data.rolesToString + "</td></tr>"
                document.getElementById("userpage").innerHTML = temp;
            })
    })