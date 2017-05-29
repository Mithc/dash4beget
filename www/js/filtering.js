hideOnline.addEventListener("click", filter);

// filter скрывает все online сервисы
function filter() {

console.log("filter function");
    f = _.filter(mainBase, function(item) {
        return item.status == "offline";
    });
    render(f);
    renderBar();
}
