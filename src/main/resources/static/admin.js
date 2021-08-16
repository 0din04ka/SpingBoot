// Стартовые функции
     $(document).ready(function () {
             createTable();
             addHeader();
             addRoles();
         }
     )

// Стартовые методы

// Создание таблицы юзеров
function createTable() {
    fetch("http://localhost:8080/rest/").then(
        res => {
            res.json().then(
                data => {
                    if (data.length > 0) {
                        var temp = "";
                        data.forEach((u) => {
                            temp += "<tr id='stringId"+u.id+"'>";
                            temp += "<td id='id"+u.id+"'>" + u.id + "</td>"
                            temp += "<td id='name"+u.id+"'>" + u.name + "</td>"
                            temp += "<td id='lastname"+u.id+"'>" + u.lastname + "</td>"
                            temp += "<td id='age"+u.id+"'>" + u.age + "</td>"
                            temp += "<td id='username"+u.id+"'>" + u.username + "</td>"
                            temp += "<td id='roles"+u.id+"'>" + u.rolesToString + "</td>"
                            temp += '<td><button type="button" class="btn btn-info" onclick="updateFormWriter('+u.id+')">Edit</button></td>'
                            temp += '<td><button type="button" class="btn btn-danger" onclick="deleteFormWriter('+u.id+')">Delete</button></td></tr>'
                        })
                        document.getElementById("userstable").innerHTML = temp;
                    }
                }
            )
        }
    )
}

// Создание шапки с именем и ролями
function addHeader(){
    fetch("http://localhost:8080/rest/user/").then(
        res => {
            res.json().then(
                data => {
                    console.log(data)
                    $('#header').append(data.username+' with roles: '+ data.rolesToString);
                })
        })
}

// Добавление ролей в Селекты
function addRoles(){
    fetch("http://localhost:8080/rest/roles/").then(
        res => {
            res.json().then(
                data => {
                    if (data.length > 0) {
                        var temp = "";
                        data.forEach((u) => {
                            temp += "<option value='"+u.id+"'>"+u.role+"</option>"
                        })
                        document.getElementById("newRoles").innerHTML = temp;
                        document.getElementById("editRoles").innerHTML = temp;
                        document.getElementById("delroles").innerHTML = temp;
                    }
                }
            )
        }
    )
}



// Методы для добавления

// Считывание данных из формы для добавления
     function readAddForm() {
         let addForm = {};
         addForm['name'] = document.getElementById('newName').value;
         addForm['lastname'] = document.getElementById('newLastName').value;
         addForm['age'] = document.getElementById('newAge').value;
         addForm['username'] = document.getElementById('newUsername').value;
         addForm['password'] = document.getElementById('newPassword').value;
         let addRoles = [];
         $("#newRoles option:selected").each(function () {
             addRoles.push($(this).val());
             addForm['roles'] = addRoles;
         });
         return addForm;
     }

// Запрос на добавление юзера
     function addUser() {
         fetch('http://localhost:8080/rest/add', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(readAddForm()),
         }).then(function (response) {
              addNewRow();
         })
     }

// Добавление нового юзера в таблицу
     function addNewRow() {
         fetch("http://localhost:8080/rest/addedUser").then(
             res => {
                 res.json().then(
                     data => {
                         $('#maintable > tbody:last-child').append(
                             '<tr id="stringId'+data.id+'">'+
                             '<td id="id'+data.id+'">' + data.id + '</td>' +
                             '<td id="name'+data.id+'">' + data.name + '</td>' +
                             '<td id="lastname'+data.id+'">' + data.lastname + '</td>' +
                             '<td id="age'+data.id+'">' + data.age + '</td>' +
                             '<td id="username'+data.id+'">' + data.username + '</td>' +
                             '<td id="roles'+data.id+'">' + data.rolesToString + '</td>' +
                             '<td>' + `<button type='button' id='editButton'  class='btn btn-info' onclick='updateFormWriter(`+data.id+`)'>Edit</button></td>` +
                             '<td>' + `<button type='button' id='deleteButton' class='btn btn-danger' onclick='deleteFormWriter(`+data.id+`)'>Delete</button></td></tr>`
                         );
                     })

             })
     }

// Открытие таблицы с юзерами
     function  openTablePage() {
         $('.nav-tabs a[href="#users"]').tab('show');
     };

// Очистка формы для добавления нового юзера
     function clearAddForm() {
         $('#addForm')[0].reset();
     };



// Методы для удаления

// Открытие модального окна с данными юзера
     function deleteFormWriter(id) {
         fetch("http://localhost:8080/rest/findOne/" + id).then(
             res => {
                 res.json().then(
                     data => {
                         $('#delid').val(data.id)
                         $('#delname').val(data.name)
                         $('#dellastname').val(data.lastname)
                         $('#delage').val(data.age)
                         $('#delusername').val(data.username)
                         $('#delpassword').val(data.password)
                         $('#deluser').modal()
                     })
             })
     }

// Считывание данных из формы для удаления
     function readDeleteForm() {
         let delForm = {};
         delForm['id'] = document.getElementById('delid').value;
         delForm['name'] = document.getElementById('delname').value;
         delForm['lastname'] = document.getElementById('delname').value;
         delForm['age'] = document.getElementById('delage').value;
         delForm['username'] = document.getElementById('delusername').value;
         delForm['password'] = document.getElementById('delpassword').value;
         return delForm;
     }

// Запрос на удаление юзера
     function deleteUser() {
         fetch('http://localhost:8080/rest/delete', {
             method: 'DELETE',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(readDeleteForm()),
         })
             .catch(error => console.error(error))
     }

// Удаление юзера из таблицы
     function deleteRow() {
         $(`#stringId${readDeleteForm().id}`).remove();
     }

// Закрытие модального окна для удаления
     function closeDeleteModal() {
         $('#deluser').modal('hide');
     }



// Методы для обновления

// Открытие модального окна с данными юзера
     function updateFormWriter(id) {
         fetch("http://localhost:8080/rest/findOne/" + id).then(
             res => {
                 res.json().then(
                     data => {
                         $('#editid').val(data.id)
                         $('#editname').val(data.name)
                         $('#editlastname').val(data.lastname)
                         $('#editage').val(data.age)
                         $('#editusername').val(data.username)
                         $('#editpassword').val(data.password)
                         $('#edituser').modal()
                     })
             })
     }

// Считывание данных из формы для редактирования
     function readEditForm() {
         let editForm = {};
         editForm['id'] = document.getElementById('editid').value;
         editForm['name'] = document.getElementById('editname').value;
         editForm['lastname'] = document.getElementById('editlastname').value;
         editForm['age'] = document.getElementById('editage').value;
         editForm['username'] = document.getElementById('editusername').value;
         editForm['password'] = document.getElementById('editpassword').value;
         let roles = [];
         $("#editRoles option:selected").each(function () {
             roles.push($(this).val());
             editForm['roles'] = roles;
         });
         return editForm;
     }

// Обновление строки в таблице юзеров
     function addEditedRow() {
         $(`#id${readEditForm().id}`).text(readEditForm().id)
         $(`#name${readEditForm().id}`).text(readEditForm().name)
         $(`#lastname${readEditForm().id}`).text(readEditForm().lastname)
         $(`#age${readEditForm().id}`).text(readEditForm().age)
         $(`#username${readEditForm().id}`).text(readEditForm().username)
         $(`#password${readEditForm().id}`).text(readEditForm().password)
         $(`#roles${readEditForm().id}`).text(readEditForm().roles.toString().replace("2","USER").replace("1","ADMIN")
             .replace(","," ").replace("ADMIN USER","USER ADMIN"))
     }

// Запрос на обновление юзера
     function updateUser() {
         fetch('http://localhost:8080/rest/update', {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(readEditForm()),
         })
             .catch(error => console.error(error))
     }

// Закрытие модального окна для обновления
     function closeEditModal() {
         $('#edituser').modal('hide');
     }