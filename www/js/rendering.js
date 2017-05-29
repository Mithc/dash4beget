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

// fakeBackend Обновляет статус сервиса каждые 5 секунд

var fakeBackend = setInterval(function() {
    for (var i = 0; i < mainBase.length; i++) {
        mainBase[i].status = status();
    }
}, 5000);


// render Отрисовывает таблицу сервисов

function render(db) {
  console.log("render function");
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
  console.log("renderBar function");
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

renderBar();
render(mainBase);
