const server = require('./index');
const unipi = require("./evok");
const fetch = require("node-fetch");
const uniPi = {};

uniPi.checkOutput = (value, port) => {
  if (value === 1) {
    unipi.digitalOutput(port, true);
  } else {
    unipi.digitalOutput(port, false);
  }
  data = {
    circuit: port,
    value: value
  };
  fetch("http://localhost:4000/api/PLC", {
    headers: {
      "content-type":"application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
    method: "POST"
  });
};

uniPi.connectUnipi = async () => {
  try {
    await unipi
      .on("connected", () => {
        console.log(
          "\x1b[46m%s\x1b[0m",
          `UniPi Connected with address: ${unipi.wsUrl()}`
        );
          /*
        unipi.inputs().forEach(input => {
          console.log(
            input
          );
        });*/
      })
      .on("input", input => {
        const circuit = input.circuit;
        let data = {};
        // Rules (This will go somewhere else)
        switch (circuit) {
          case "2_04":
            uniPi.checkOutput(input.value, "1_01");
            
            break;
          case "2_02":
            uniPi.checkOutput(input.value, "1_02");
            
            break;
        }
        console.log(
          `Input value changed: ${input.circuit} to ${
            input.value === 1 ? "true" : "false"
          }`
        );
      });

    await unipi.on("error", err => {
      console.error("Error: ", err);
    });

    // await unipi.on("message", message => {
    //   console.log("Received: ", message);
    // });
    await unipi.connect();
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};

/*
uniPi.getInitialInputs = async () => {
  try {
    //console.log(state.inputs);
    state.inputs.forEach(input => {
      console.log(
        `Input ${input.circuit} state is ${
          input.value === 1 ? "true" : "false"
        }`
      );
    });
  } catch (err) {
    console.error(err);
  }
};
*/

module.exports = uniPi;
