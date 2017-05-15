var base1 = ["1;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "2;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "3;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "4;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "5;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "6;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;", "7;Самый главный сервис в Бегете;101.5.150.23:25565;minecraft;;", "8;Форум для крутых парней;101.5.150.11;minecraft;https://forum.office-team.beget;", "9;Рабочие лошадки;101.5.100.16/28:3000;workspace;;", "10;Система подачи печенек;192.168.1.30;kitchen;http://cookies.beget;", "11;Та штука которая всегда должна работать;101.5.100.100;hosting;https://beget.com", "12;Пока не придумали (тест);101.5.100.301;dev;httрs://shit.dev-team.beget;"];

var dashboard = function() {

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
        if (rand < 0.7) {
            return "online";
        } else {
            return "offline";
        }
    }



    function Observable(){
      var observers = [];
      this.sendMessage = function (msg){
        for (var i = 0; i < observers.length; i++) {
          observers[i].notify(msg);
        }
      };
      this.addObserver = function(observer){
        observers.push(observer);
      };
    }

    function Observer(behavior){
      this.notify = function (msg) {
        behavior(msg);
      };
    }

    var observable = new Observable();
    var obs1 = new Observer(function(msg){console.log(msg);});
    var obs2 = new Observer(function(msg){alert(msg);});
    observable.addObserver(obs1);
    observable.addObserver(obs2);
    setTimeout(function functionName() {observable.sendMessage("time:" +new Date());

  },3000);
/*
    var form = document.getElementById("addForm");
    form.addEventListener("submit", validate);


    function validate() {
      var serviceName = document.getElementById("serviceName"),
      adress = document.getElementById("adress"),
      socket = document.getElementById('socket'),
      serviceDesc = document.getElementById('serviceDesc'),
      http = document.getElementById("http");

      event.preventDefault();


      function validateIpAndPort(input) {
          var parts = input.split(":");
          var ip = parts[0].split(".");
          var port = parts[1];
          return validateNum(port, 1, 65535) &&
              ip.length == 4 &&
              ip.every(function (segment) {
                  return validateNum(segment, 0, 255);
              });
      }

      function validateNum(input, min, max) {
          var num = +input;
          return num >= min && num <= max && input === num.toString();
      }

    }
*/

    var tmpl = document.getElementById('mainPanel-template').innerHTML.trim();
    tmpl = _.template(tmpl);


    document.getElementById('table').innerHTML = tmpl({
      list: mainBase
    });


}();
