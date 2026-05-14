const profBtn = document.getElementById("profBtn");
const eleveBtn = document.getElementById("eleveBtn");
const profSection = document.getElementById("profSection");
const eleveSection = document.getElementById("eleveSection");

const profCodeInput = document.getElementById("profCode");
const validateProf = document.getElementById("validateProf");
const profError = document.getElementById("profError");
const profTable = document.getElementById("profTable");
const profBody = document.getElementById("profBody");

const newEleveNom = document.getElementById("newEleveNom");
const newEleveDate = document.getElementById("newEleveDate");
const newEleveCode = document.getElementById("newEleveCode");
const createEleve = document.getElementById("createEleve");

const eleveNomInput = document.getElementById("eleveNom");
const eleveCodeInput = document.getElementById("eleveCode");
const validateEleve = document.getElementById("validateEleve");
const eleveError = document.getElementById("eleveError");
const eleveTable = document.getElementById("eleveTable");
const eleveBody = document.getElementById("eleveBody");

const profCodeSecret = "@QL4P4U03849";
let currentEleve = null;

// Charger les élèves depuis localStorage
let eleves = JSON.parse(localStorage.getItem("eleves")) || {};

function saveEleves() {
  localStorage.setItem("eleves", JSON.stringify(eleves));
}

// Choix du rôle
profBtn.addEventListener("click", () => {
  profSection.classList.remove("hidden");
  eleveSection.classList.add("hidden");
});

eleveBtn.addEventListener("click", () => {
  eleveSection.classList.remove("hidden");
  profSection.classList.add("hidden");
});

// Professeur login
validateProf.addEventListener("click", () => {
  if (profCodeInput.value === profCodeSecret) {
    profError.classList.add("hidden");
    profTable.classList.remove("hidden");
    afficherTableProf();
  } else {
    profError.classList.remove("hidden");
  }
});

// Créer un nouvel élève
createEleve.addEventListener("click", () => {
  const nom = newEleveNom.value.trim();
  const date = newEleveDate.value;
  const code = newEleveCode.value.trim();

  if (nom && date && code) {
    eleves[nom] = {
      dateNaissance: date,
      code: code,
      note: "",
      app: "",
      etat: "Appris"
    };
    saveEleves();
    afficherTableProf();
    alert("Élève créé avec succès !");
    newEleveNom.value = "";
    newEleveDate.value = "";
    newEleveCode.value = "";
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});

// Élève login
validateEleve.addEventListener("click", () => {
  const nom = eleveNomInput.value.trim();
  const code = eleveCodeInput.value.trim();
  if (eleves[nom] && eleves[nom].code === code) {
    eleveError.classList.add("hidden");
    eleveTable.classList.remove("hidden");
    currentEleve = nom;
    afficherTableEleve(nom);
  } else {
    eleveError.classList.remove("hidden");
    eleveTable.classList.add("hidden");
  }
});

// Tableau Professeur
function afficherTableProf() {
  profBody.innerHTML = "";
  Object.keys(eleves).forEach(nom => {
    const eleve = eleves[nom];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nom}</td>
      <td>${eleve.dateNaissance}</td>
      <td>${eleve.code}</td>
      <td><input type="number" min="0" max="20" value="${eleve.note}"></td>
      <td><input type="text" value="${eleve.app}"></td>
      <td>
        <select>
          <option ${eleve.etat==="Appris"?"selected":""}>Appris</option>
          <option ${eleve.etat==="Va réviser..."?"selected":""}>Va réviser...</option>
          <option ${eleve.etat==="Cahier de bord"?"selected":""}>Cahier de bord</option>
        </select>
      </td>
    `;
    const inputs = tr.querySelectorAll("input, select");
    inputs[0].addEventListener("input", () => { eleves[nom].note = inputs[0].value; saveEleves(); });
    inputs[1].addEventListener("input", () => { eleves[nom].app = inputs[1].value; saveEleves(); });
    inputs[2].addEventListener("change", () => { eleves[nom].etat = inputs[2].value; saveEleves(); });
    profBody.appendChild(tr);
  });
}

// Tableau Élève
function afficherTableEleve(nom) {
  eleveBody.innerHTML = "";
  const eleve = eleves[nom];
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${nom}</td>
    <td>${eleve.dateNaissance}</td>
    <td>${eleve.note}</td>
    <td>${eleve.app}</td>
    <td>${eleve.etat}</td>
  `;
  eleveBody.appendChild(tr);
}