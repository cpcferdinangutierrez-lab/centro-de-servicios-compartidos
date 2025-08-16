const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwof8jWD5N0N8vjKV5liI3Ms-Hepmt6vf91fwl0e0HiHjNSbwpSt3ULesF5D4f2mOx_/exec";

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const loginMsg = document.getElementById("loginMsg");

  loginMsg.style.color = "black";
  loginMsg.innerText = "Validando...";

  try {
    const response = await fetch(WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", usuario, password })
    });

    const data = await response.json();

    if(data.status === "OK") {
      loginMsg.style.color = "green";
      loginMsg.innerText = `Bienvenido ${data.usuario}, UserID: ${data.userID}`;
    } else {
      loginMsg.style.color = "red";
      loginMsg.innerText = data.message;
    }

  } catch(err) {
    loginMsg.style.color = "red";
    loginMsg.innerText = "Error de conexión: " + err.message;
  }
});





