function validate(form) {
    console.log("validation function");
    var serviceName = form.serviceName.value,
        adress = form.adress.value,
        socket = form.socket.value,
        serviceDesc = form.serviceDesc.value,
        http = form.http.value,
        err = 0,
        newElement,
        newElementHttp;

    form.serviceName.addEventListener('keyup', function() {
        if (form.serviceName.value.length > 2) {
            errorMassage1.classList.add('hiddenMassage');
            errorMassage5.classList.add('hiddenMassage');
            err++;
        } else {
            errorMassage1.classList.remove('hiddenMassage');
            errorMassage5.classList.remove('hiddenMassage');
            err--;
        }
    });

    form.adress.addEventListener('keyup', function() {
        if (validateIpAndPort(form.adress.value)) {
            errorMassage2.classList.add('hiddenMassage');
            errorMassage6.classList.add('hiddenMassage');
            err++;
        } else {
            errorMassage2.classList.remove('hiddenMassage');
            errorMassage6.classList.remove('hiddenMassage');
            err--;
        }
    });

    form.socket.addEventListener('keyup', function() {
        if (form.socket.value) {
            if (validateNum(form.socket.value, 0, 65536)) {
                errorMassage3.classList.add('hiddenMassage');
                errorMassage7.classList.add('hiddenMassage');
                err++;
            } else {
                errorMassage3.classList.remove('hiddenMassage');
                errorMassage7.classList.remove('hiddenMassage');

                err--;
            }
        }
    });

    form.serviceDesc.addEventListener('keyup', function() {
        if (form.serviceDesc.value.length > 2) {
            errorMassage4.classList.add('hiddenMassage');
            errorMassage8.classList.add('hiddenMassage');
            err++;
        } else {
            errorMassage4.classList.remove('hiddenMassage');
            errorMassage8.classList.remove('hiddenMassage');

            err--;
        }
    });


    if (!err) {
        socket = form.socket.value;
        if (http) {
            newElementHttp = http.split(":");
            if (newElementHttp[0] === "http") {
                socket = "80";
            } else if (newElementHttp[0] === "https") {
                socket = "443";
            }
        }
        if (socket) {
            newElement = new Service([mainBase.length + 1, form.serviceName.value, form.adress.value + ":" + socket, form.serviceDesc.value, form.http.value, status()]);
        } else {
            newElement = new Service([mainBase.length + 1, form.serviceName.value, form.adress.value, form.serviceDesc.value, form.http.value, status()]);
        }
    }

    function validateIpAndPort(input) {
        var parts = input.split("/");
        var ip = parts[0].split(".");
        var port = parts[1];
        if (!parts[2]) {
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

    }

    function validateNum(input, min, max) {
        var num = +input;
        return num >= min && num <= max && input === num.toString();
    }
    if (newElement) {
        return newElement;
    } else {
        return false;
    }
}

addSave.addEventListener('click', function() {
    mainBase.push(validate(addForm));
    console.log(mainBase);
    render(mainBase);
})
