//edit Функция изменения параметров

function edit(form) {
  console.log("edit function");
    var edited,
    num = 0;
    validate(editForm);
    table.onclick = function(e) {
        var target = e.target;
            num = target.getAttribute('data-id') - 1;
            console.log(num);
        if (num + 1) {
            ipSplit = mainBase[num].ip.split(":");
            if (!ipSplit[1]) {
                ipSplit[1] = "";
            }

            form.edit__serviceName.value = mainBase[num].name,
                form.edit__adress.value = ipSplit[0],
                form.edit__socket.value = ipSplit[1],
                form.edit__serviceDesc.value = mainBase[num].descrition,
                form.edit__http.value = mainBase[num].url;


        }
        editSave.addEventListener("click", function() {
            edited = validate(editForm);
            edited.id = num + 1;
            mainBase[num] = edited;
            render(mainBase);
        })
    }
}
