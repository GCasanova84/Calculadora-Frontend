$(() => {
  //Función para lograr efecto de pestañeo en la pantalla al pulsar un botón
  const blink = (val) => {
    pant.text("");
    setTimeout(() => pant.text(val), 100);
  };
  //Función que devuelve el último valor del string pasado como parámetro
  const lastChar = (val) => val.charAt(val.length - 1);

  const ops = ["*", "/", "+", "-"];
  const pant = $("#pantalla");
  let currVal = "";
  let storeVal = "";
  let opVal = null;
  //Valor inicial en la pantalla es cero
  pant.text("0");
  //Cada vez que un botón es pulsado se ejecuta la función que hay dentro
  $(".boton").click((e) => {
    const _this = $(e.currentTarget);
    const input = _this.text();
    //Si el botón es un número
    if (_this.hasClass("boton-num")) {
      opVal = null;
      currVal === "" ? (currVal = input) : (currVal = currVal.concat(input));
      blink(currVal);
    }
    //Si el botón es un operador
    if (_this.hasClass("boton-op")) {
      if (opVal === null) {
        storeVal = storeVal.concat(currVal);
        currVal = "";
      }

      opVal = _this.text();

      storeVal =
        storeVal === ""
          ? `0${opVal}`
          : !ops.includes(lastChar(storeVal))
          ? storeVal.concat(opVal)
          : storeVal.replace(/.$/, opVal);

      blink("0");
    }
    //Si el botón es el signo igual
    if (_this.hasClass("boton-eq")) {
      storeVal = storeVal.concat(currVal);
      const result = ops.includes(lastChar(storeVal))
        ? "SYNTAX ERROR!"
        : lastChar(storeVal) === "0" && storeVal.charAt(storeVal.length - 2) === "/"
        ? "INFINITY"
        : eval(storeVal);
      result !== undefined
        ? (blink(result), (storeVal = result.toString()))
        : blink("0");
      currVal = "";
      opVal = null;
    }
  });
});
