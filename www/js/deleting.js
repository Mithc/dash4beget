//del Функция удаления сервиса

function del() {
  console.log("deleting function");
    table.onclick = function(e) {
        var target = e.target;
        var num = target.getAttribute('data-id');
        if (num) {
            mainBase.splice(num - 1, 1);
            for (var i = 0; i < mainBase.length; i++) {
                mainBase[i].id = i + 1;
            }
            render(mainBase);
        }
    }
}
