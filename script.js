const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzaeLLtW0ZJNDf6iRBdfOncxB3P-BTSEu2z3m2LTHdRT6ZG9yBiB_97lZ-AexHXVmMy/exec?";

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const resultado = document.getElementById("loginMsg"); // <-- CORREGIDO

  resultado.innerText = "Validando...";

  try {
    const response = await fetch(WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", usuario, password })
    });

    const data = await response.json();

    if(data.status === "OK") {
      resultado.innerText = `Bienvenido ${data.usuario}, UserID: ${data.userID}`;
    } else {
      resultado.innerText = data.message;
    }

  } catch(err) {
    resultado.innerText = "Error de conexión: " + err.message;
  }
});





