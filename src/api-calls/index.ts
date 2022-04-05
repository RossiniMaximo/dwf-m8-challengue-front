export async function checkEmail(email) {
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/find-user",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );
  const data = await res.json();

  return {
    exists: data,
    id: data.id,
  };
}

// Esta funcion se contacta con el endpoint que nos permite verificar si hay algun usuario en la tabla Auth
//  que coincida con el email y la password pasadas.
export async function createToken(email, password) {
  // obtiene un token
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/auth/token",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await res.json();
  console.log("data del auth", data.token);
  return {
    token: data.token,
  };
}

export async function lookForPassword(password) {
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/find-password",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    }
  );
  const data = await res.json();
  /* console.log(data);*/
  return data;
}

export async function createUser(user, password) {
  /* console.log(user, password);
  console.log(user.email);*/
  const res = await fetch("https://dwf-m7-challengue.herokuapp.com" + "/auth", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user,
      password,
    }),
  });
  const data = await res.json();
  console.log("data del createUser", data);
  if (data) {
    const token = await createToken(user.email, password);
    localStorage.setItem("auth_token", token.token);
    console.log("token creado al dar de alta usuario", token);
  }
  return data;
}

export async function getNearbyPets() {
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/nearby-missed-pets"
  );
  const data = await res.json();
  /* console.log("dat del getNearby pets", da ta);*/

  return data;
}

// Metodo para enviar mail reportando información acerca de una mascota
// extraviada
export async function reportInfo(pet) {
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/report-info",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ pet }),
    }
  );
  const data = await res.json();
  /* console.log("data del reportInfo", data);
   */ return data;
}

export async function reportPet(pet, userId) {
  console.log("pet que llega", pet);
  console.log("userId que llega", userId);
  const key = localStorage.getItem("auth_token");
  console.log("key antes de reportar el pet", key);

  const data = await fetch("https://dwf-m7-challengue.herokuapp.com" + "/pet", {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer" + " " + key /* key.token */,
    },
    body: JSON.stringify({ pet, userId }),
  });
  /* console.log("data del report pet", data)*/
  return data;
}

export async function getUserPets(userId) {
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/user-pets",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    }
  );
  const data = await res.json();
  console.log("data del getUserPets", data);
  return data;
}

export async function updatePet(body, petId) {
  const key = localStorage.getItem("auth_token");
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/pet/" + petId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer" + " " + key,
      },
      body: JSON.stringify({ ...body }),
    }
  );
  const data = await res.json();
  /* console.log("data del updatePet", data);
   */ return data;
}

export async function deletePet(petId) {
  const key = localStorage.getItem("auth_token");
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/pet/" + petId,
    {
      method: "delete",
      headers: {
        Authorization: "bearer" + " " + key,
      },
    }
  );
  const data = await res.json();
  /* console.log("data del deletePet");
  return data;*/
}

export async function updateUser(data) {
  const key = localStorage.getItem("auth_token");
  const res = await fetch(
    "https://dwf-m7-challengue.herokuapp.com" + "/update-user",
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer" + " " + key,
      },
      body: JSON.stringify({ data }),
    }
  );
  const json = await res.json();
  /* console.log("json", json); */
  return json;
}
