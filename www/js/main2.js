var base1 = ["1;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "2;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "3;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "4;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "5;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "6;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;", "7;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "8;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "9;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "10;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "11;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "12;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;"];

var dashboard = function() {

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
  var obs1 = new Observer(function(msg) {
    console.log(msg);
  });
  var obs2 = new Observer(function(msg) {

  });
  observable.addObserver(obs1);
  observable.addObserver(obs2);
  setTimeout(function functionName() {
    observable.sendMessage("time:" + new Date());
  }, 3000);










  renderBar();
  render(mainBase);
  var fakeBackend = setInterval(function() {
    for (var i = 0; i < mainBase.length; i++) {
      mainBase[i].status = status();
    }
  }, 5000);


  function render(db) {
    if (table.firstChild) {
      table.firstChild.remove();
    }

    var tmpl = document.getElementById('mainPanel-template').innerHTML.trim();
    tmpl = _.template(tmpl);


    document.getElementById('table').innerHTML = tmpl({
      list: db
    });

    console.log(1);
  }

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

  //RERENDR EVERY 5 SECONDS!

  var interval = setInterval(function() {
    renderBar();
    render(mainBase);
  }, 5000);


  hideOnline.addEventListener("click", filter);
  rerender.addEventListener("click", render(mainBase));

  function filter() {
    f = _.filter(mainBase, function(item) {
      return item.status == "offline";
    });
    render(f);
    renderBar();
    clearInterval(interval);

  }


  //TODo



  function validate() {
    var serviceName = document.getElementById("serviceName"),
      adress = document.getElementById("adress"),
      socket = document.getElementById('socket'),
      serviceDesc = document.getElementById('serviceDesc'),
      http = document.getElementById("http");

    function validateIpAndPort(input) {
      var parts = input.split("/");
      var ip = parts[0].split(".");
      var port = parts[1];
      if (parts[1]) {
        return validateNum(port, 1, 65535) &&
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
  }validate();

  function edit() {

  }


}();
