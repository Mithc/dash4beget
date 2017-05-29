// исходная база сервисов х2

var base1 = ["1;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "2;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "3;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "4;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "5;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "6;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;", "7;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "8;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "9;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "10;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "11;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "12;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;"];


//Generate mainBase from base1

var mainBase = [];
for (var i = 0; i < base1.length; i++) {
    var service = new Service(base1[i].split(';'));
    mainBase.push(service);
}

function Service(data) {
    this.id = data[0];
    this.name = data[1];
    this.ip = data[2];
    this.descrition = data[3];
    this.url = data[4];
    this.status = status();
}

function status() {
    var rand = Math.random();
    if (rand < 0.85) {
        return "online";
    } else {
        return "offline";
    }
}

// Observer
/*
function Observable() {
    var observers = [];
    this.sendMessage = function(msg) {
        for (var i = 0; i < observers.length; i++) {
            observers[i].notify(msg);
        }
    };
    this.addObserver = function(observer) {
        observers.push(observer);
    };
}

function Observer(behavior) {
    this.notify = function(msg) {
        behavior(msg);
    };
}

var observable = new Observable();

var del = new Observer(function(id) {
    mainBase.splice(id,1);
});
var edit = new Observer(function(id) {

});

observable.addObserver(del);

setTimeout(function functionName() {
    observable.sendMessage("time:" + new Date());
}, 3000);
*/
// Первоначальный рендер Таблицы и Баров

renderBar();
render(mainBase);

// fakeBackend Обновляет статус сервиса каждые 5 секунд

var fakeBackend = setInterval(function() {
    for (var i = 0; i < mainBase.length; i++) {
        mainBase[i].status = status();
    }
}, 5000);


// render Отрисовывает таблицу сервисов

function render(db) {
    if (table.firstChild) {
        table.firstChild.remove();
    }

    var tmpl = document.getElementById('mainPanel-template').innerHTML.trim();
    tmpl = _.template(tmpl);


    document.getElementById('table').innerHTML = tmpl({
        list: db
    });
}

// renderBar Отрисовывает бары со статистикой

function renderBar() {
    if (progressBars.firstChild) {
        progressBars.firstChild.remove();
    }
    var on = 0,
        off = 0,
        len = mainBase.length;
    for (var i = 0; i < len; i++) {
        if (mainBase[i].status === "online") {
            on++;
        }
    }
    on = Math.floor(on / len * 100);
    off = 100 - on;

    var tmpl = document.getElementById('progressBars-template').innerHTML.trim();
    tmpl = _.template(tmpl);
    var obj = {
        online: on,
        offline: off
    };
    document.getElementById('progressBars').innerHTML = tmpl(obj);
}

//Ререндер таблицы сервисов каждые 5 секунд

var interval = setInterval(function() {
    renderBar();
    render(mainBase);
}, 5000);


hideOnline.addEventListener("click", filter);
//rerender.addEventListener("click", render(mainBase));

// filter скрывает все online сервисы
function filter() {
    f = _.filter(mainBase, function(item) {
        return item.status == "offline";
    });
    render(f);
    renderBar();
}

/*
// наблюдатель за кнопокой добавления сервиса

addData.addEventListener("click", validate);
*/
// validate функция проверки введенных данных, если данные введены верно добавляет их в mainBase
/*
function validation() {
  this.invalidities = [];
}

validation.prototype = {
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },
  getInvalidities: function() {
    return this.invalidities.join(". \n");
  },
  checkValidity: function(input) {
    if (input.value.length < 3) {
      this.addInvalidity("Минимальная длинна 3 символа")
    }
  }
};

var serviceName = form.serviceName;

serviceName.CustomValidation = new CustomValidation();

serviceName.addEventListener('keyup', function () {
  serviceName.CustomValidation.checkValidity(this);
})
*/


function validate(form) {
    var serviceName = form.serviceName.value,
        adress = form.adress.value,
        socket = form.socket.value,
        serviceDesc = form.serviceDesc.value,
        http = form.http.value,
        err,
        errNum,
        newElement;


    form.serviceName.addEventListener('keyup', function() {
        if (serviceName.length < 3) {
          removeClass(errorMassage1, 'hidden');
          console.log(123213);
        } else {
          addClass(errorMassage1, 'hidden');
          console.log(1232141241);
        }
    });

    if (serviceName == "" || serviceName == " ") {
        err = "Введите имя сервиса",
            errNum = 1
    } else if (!validateIpAndPort(adress)) {
        err = "Проверьте IP-адрес",
            errNum = 2
    } else if (socket && !validateNum(socket, 0, 65536)) {
        err = "Проверьте Порт",
            errNum = 3
    } else if (serviceDesc == "" || serviceDesc == " ") {
        err = "Введите описание сервиса",
            errNum
    }

    if (err) {
        /*
                if (errNum = 1) {
                    form.serviceName.insertAdjacentHTML("afterEnd", '');
                }*/

        alert(err);
    } else {
        if (http) {
            newElement = http.split(":");
            if (newElement[0] === "http") {
                socket = "80";
            } else if (newElement[0] === "https") {
                socket = "443";
            }
        }
        if (socket) {
            newElement = new Service([mainBase.length + 1, serviceName, adress + ":" + socket, serviceDesc, http, status()]);
        } else {
            newElement = new Service([mainBase.length + 1, serviceName, adress, serviceDesc, http, status()]);
        }

    }

    function validateIpAndPort(input) {
        var parts = input.split("/");
        var ip = parts[0].split(".");
        var port = parts[1];
        if (parts[1]) {
            return validateNum(port, 1, 32) &&
                ip.length == 4 &&
                ip.every(function(segment) {
                    return validateNum(segment, 0, 255);
                });
        } else {
            return ip.length == 4 &&
                ip.every(function(segment) {
                    return validateNum(segment, 0, 255);
                });
        }
    }

    function validateNum(input, min, max) {
        var num = +input;
        return num >= min && num <= max && input === num.toString();
    }
    return newElement;
}

// ТУДУ
//edit Функция изменения параметров

function edit(form) {
    var edited;
    table.onclick = function(e) {
        var target = e.target,
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

            //записать все в mainBase

        }
        editSave.addEventListener("click", function() {
            edited = validate(form);
            console.log(edited);
            console.log(num);
            edited.id = num + 1;
            mainBase[num] = edited;
            render(mainBase);
            console.log("stop");
        })
    }
}

function addNewService(form) {
    mainBase.push(validate(form));
    render(mainBase);
}


//edit Функция удаления сервиса

function del() {
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
