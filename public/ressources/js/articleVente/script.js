import { Api } from "./../core/api.js";
import { WEB_URL } from "./../core/bootstrap.js";
const tbodyarticleVente = document.getElementById("tableauArticleVente");

// PARTIE LIBELLE EXISTE OU PAS DANS LA BASE DE DONNEES

const libelleInput = document.getElementById('libelle');
const messageArticle = document.getElementById('message');

libelleInput.addEventListener('input', async function () {
    const libelle = libelleInput.value.trim();

    if (libelle.length >= 3) {
        try {
            const response = await fetch(`http://localhost:8000/api/articlevente`);
            const data = await response.json();

            const articleExists = data.some(article => article.libelle.toLowerCase() === libelle.toLowerCase());

            if (articleExists) {
                messageArticle.textContent = libelle + ' existe déjà dans la base de données.';
                messageArticle.style.color = 'green';
            } else {
                messageArticle.textContent = 'La valeur ' + libelle + " n'existe pas dans la base de données.";
                messageArticle.style.color = 'red';
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    } else {
        messageDiv.textContent = '';
        // messageDiv.style.color = 'black';
    }
});

// FIN PARTIE LIBELLE EXISTE OU PAS DANS LA BASE DE DONNEES

//recuperer photo apres clique 
const inputValid = document.querySelector("#image");
inputValid.addEventListener("change", onChangeImage);
let photo = ""; // Ajoutez cette ligne pour initialiser la variable photo en dehors de la fonction onChangeImage
let cheminImage = ""; // Ajoutez cette ligne pour initialiser la variable
function onChangeImage() {
    // console.log(inputValid.files[0]);
    cheminImage = inputValid.files[0]['name'];
    let f = new FileReader();
    f.readAsDataURL(inputValid.files[0]);
    f.onloadend = function (event) {
        const path = event.target.result;
        // console.log(path);   
        photo = path; // Affectez la valeur de l'image à la variable photo
        document.querySelector("#photo").setAttribute("src", path);
    };
}
//-------------------------- *************  PARTIE CATEGORIE  ********************* ------------------------


const response = await fetch(`${WEB_URL}/categorieVente`);
const data = await response.json();
// console.log(data);
data.forEach(element => {
    const Selectcategorie = document.getElementById("categorie");
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.libelle;
    Selectcategorie.appendChild(option);

});


const categorie = document.getElementById("categorie");
const modalTailleButton = document.getElementById("modalTaille"); // Utilisation de modalTailleButton
categorie.addEventListener("change", function () {
    if (categorie.value !== "") {
        modalTailleButton.removeAttribute("disabled"); // Activer le bouton "+ de l'unité"
    } else {
        modalTailleButton.setAttribute("disabled", "disabled"); // Désactiver le bouton "+ de l'unité"
    }
});

categorie.addEventListener('change', async function () {
    const idCategorie = categorie.options[categorie.selectedIndex].value;
    await Api.postData("http://localhost:8000/api/categorieID", {
        categorieID: idCategorie,
    });
    // console.log(data);
});
const SelectTaille = document.getElementById("taille");
categorie.addEventListener('change', async () => {
    const response1 = await fetch(`${WEB_URL}/CategorieTaille`);
    const data1 = await response1.json();

    console.log(data1);
    // Ajouter les nouvelles options basées sur la catégorie sélectionnée
    data1.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.taille_libelle;
        SelectTaille.appendChild(option);
    });
});

const tailleModal = document.getElementById("tailleModal");
tailleModal.addEventListener("show.bs.modal", function () {
    if (categorie.value === "") {
        modalTailleButton.setAttribute("disabled", "disabled"); // Désactiver le bouton "+ de l'unité" (utilisation de modalTailleButton)
    } else {
        categorieSelection.value = categorie.options[categorie.selectedIndex].textContent;
    }
});
saveCategoryButton.addEventListener("click", async function () {
    const newCategory = newCategoryInput.value;
    if (newCategory) {
        try {
            const data = await Api.postData("http://localhost:8000/api/categorie/addAV", {
                libelle: newCategory,

            });

            if (data.success) {
                const selectCategorie = document.getElementById("categorie");
                const optionCategorie = document.createElement("option");
                optionCategorie.value = data.dataCategorie.idCategorie;
                optionCategorie.textContent = newCategory;
                selectCategorie.appendChild(optionCategorie);
                selectCategorie.value = data.dataCategorie.idCategorie;

                newCategoryInput.value = "";

            } else {
                console.error("Erreur lors de l'ajout de la catégorie :", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie :", error);
        }
    }
});

//-------------------------- ************* FIN PARTIE CATEGORIE  ********************* ------------------------
const modalTaille = document.querySelector("#tailleModal");
const categorieSelectionInput = document.getElementById("categorieSelection");
const savetailleButton = document.getElementById("savetailleButton");
const tailleTableBody = document.getElementById("tailleTableBody");


modalTaille.addEventListener("show.bs.modal", async function () {

    const idCategorie = categorie.options[categorie.selectedIndex].value;
    const libelleCategorie = categorie.options[categorie.selectedIndex].textContent;
    categorieSelectionInput.value = libelleCategorie;
    const response = await fetch(`${WEB_URL}/CategorieTaille`);
    const data = await response.json();
    // console.log(data);
});

const TailleDataArray = []; // Tableau pour stocker les données de libelle, de conversion et de catégorie

const addUnitButton = document.getElementById("addUnit"); // Obtenez la référence au bouton "Ajouter"

addUnitButton.addEventListener("click", function () {
    const libelle = newtailleInput.value;
    const categorieSelection = categorieSelectionInput.value;

    // Vérifier si les champs sont vides
    if (libelle.trim() === "") {
        alert("Veuillez remplir tous les champs.");
        return; // Ne rien faire si les champs sont vides
    }

    const idCategorie = categorie.options[categorie.selectedIndex].value;


    const existingUnit = TailleDataArray.find(unit => unit.libelle === libelle);
    if (existingUnit) {
        alert("Cette unité a déjà été ajoutée.");
        return; // Ne pas ajouter si l'unité existe déjà
    }

    // Ajouter les données au tableau
    TailleDataArray.push({ libelle, idCategorie });

    // Mettre à jour le body du tableau
    updateTable();

    // Effacer les champs de saisie
    newtailleInput.value = "";
});

function updateTable() {
    // Effacer les lignes existantes
    tailleTableBody.innerHTML = "";

    // Reconstruire la table avec les données actuelles
    TailleDataArray.forEach((unit, index) => {
        const { libelle } = unit;
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${libelle}</th>
            <td>
                <button class="btn btn-danger trash-button">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;

        const trashButton = row.querySelector('.trash-button');
        trashButton.addEventListener('click', (event) => {
            event.stopPropagation(); //Empêcher la propagation des événements au modal
            deleteUnit(index);
        });

        tailleTableBody.appendChild(row);
    });
}

function deleteUnit(index) {
    // Supprimez l'élément correspondant de TailleDataArray
    TailleDataArray.splice(index, 1);

    // Mettre à jour le tableau
    updateTable();
}

savetailleButton.addEventListener("click", async function () {
    try {
        // Envoyer TailleDataArray au serveur
        const response = await Api.postData("http://localhost:8000/api/taille/add", TailleDataArray);
        // console.log(response.data);
        console.log(response);
        const data = response;
        // console.log(data.data[0].libelle);

        if (data.success) {
            // Effacez le tableau et la table après une soumission réussie
            TailleDataArray.length = 0;
            tailleTableBody.innerHTML = "";

            // Mettre à jour l'élément select avec les unités nouvellement ajoutées
            const SelectTaille = document.getElementById("taille");
            let optionsHTML = "";

            data.data.forEach(element => {
                optionsHTML += `<option value="${element.idCategorie}">${element.libelle}</option>`;
            });

            // Remplacer le contenu actuel de l'élément select avec les nouvelles options
            SelectTaille.innerHTML += optionsHTML;

            console.log("tailles ajoutées avec succès !");
        } else {
            console.error("Erreur lors de l'ajout des tailles :", data.message);
        }


    } catch (error) {
        console.error("Erreur lors de l'ajout des tailles :", error);
    }
});


// ------------------------****************PARTIE TABLEAU**************------------------------------------


// document.addEventListener("DOMContentLoaded", function() {
const articleInput = document.querySelector(".article");
const quantiteInput = document.querySelector(".quantite");
const margeInput = document.querySelector("#marge"); // Ajout de l'élément pour la marge
const messageDiv = document.getElementById("messageDiv");
const addRowButton = document.getElementById("addRowButton");

articleInput.addEventListener("input", async function () {
    await checkArticle(this.value, messageDiv, quantiteInput, addRowButton);
});

let totalGlobal = 0;
let tableauQuantiteArticle = [];
quantiteInput.addEventListener("blur", function () {
    const value = this.value;
    const prix = parseFloat(quantiteInput.getAttribute("data-prix"));
    if (value !== "" && !isNaN(value)) {
        addRowButton.disabled = false;
        messageDiv.textContent = "";
        const total = value * prix;
        console.log(total);
        messageDiv.textContent = "";

        // Mettez à jour le total global
        totalGlobal += total;

        tableauQuantiteArticle.push({
            article: articleInput.value,
            quantite: quantiteInput.value
        });

        // Mettez à jour l'input coutproduction
        updateCoutProductionInput();
    } else {
        addRowButton.disabled = true;
        messageDiv.textContent = "La quantité doit être un nombre.";
    }
});

margeInput.addEventListener("input", function () {
    updatePrixVenteInput(); // Appeler la fonction pour mettre à jour le Prix de Vente
});

function updateCoutProductionInput() {
    const coutProductionInput = document.getElementById("coutproduction");
    coutProductionInput.value = totalGlobal.toFixed(2);
    updatePrixVenteInput(); // Appeler la fonction pour mettre à jour le Prix de Vente lorsque le Cout de Production change
}
function updatePrixVenteInput() {
    const coutProduction = parseFloat(document.getElementById("coutproduction").value);
    const marge = parseFloat(margeInput.value);

    if (!isNaN(coutProduction) && !isNaN(marge)) {
        const prixVenteInput = document.getElementById("PrixVente");
        const prixVente = coutProduction + marge;
        prixVenteInput.value = prixVente.toFixed(2);
    }
}

addRowButton.addEventListener("click", function () {
    addNewColumn();
    addRowButton.disabled = true;
});

// });

async function checkArticle(libelle, messageDiv, quantiteInput, addRowButton) {
    try {
        const response = await fetch(`http://localhost:8000/api/article`);
        const data = await response.json();

        const article = data.find(article => article.libelle.toLowerCase() === libelle.toLowerCase());

        if (article) {
            messageDiv.textContent = '';
            messageDiv.style.color = 'green';
            quantiteInput.removeAttribute("disabled");
            quantiteInput.setAttribute("data-prix", article.prix);

            const quantiteValue = parseFloat(quantiteInput.value);
            if (!isNaN(quantiteValue)) {
                const total = quantiteValue * article.prix;
                messageDiv.textContent = "";
                // messageDiv.textContent = `Total: ${total.toFixed(2)}`;
            } else {
                messageDiv.textContent = '';
            }
        } else {
            messageDiv.textContent = `La valeur ${libelle} n'existe pas dans la base de données.`;
            messageDiv.style.color = 'red';
            quantiteInput.setAttribute("disabled", "true");
        }

        addRowButton.disabled = !quantiteInput.value;
    } catch (error) {
        console.error("Erreur lors de la requête fetch :", error);
        messageDiv.textContent = "Erreur lors de la requête fetch.";
        messageDiv.style.color = 'red';
        quantiteInput.setAttribute("disabled", "true");
        addRowButton.disabled = true;
    }
}


function addNewColumn() {
    const tableBody = document.querySelector("#articleTable tbody");
    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");

    newCell.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control article" placeholder="Article">
            <input type="text" class="form-control quantite" placeholder="Quantite" disabled>
        </div>  
        <div class="messageDiv"></div>
    `;

    newRow.appendChild(newCell);
    tableBody.appendChild(newRow);

    const articleInput = newRow.querySelector(".article");
    const quantiteInput = newRow.querySelector(".quantite");
    const messageDiv = newRow.querySelector(".messageDiv");
    const addRowButton = document.getElementById("addRowButton");

    articleInput.addEventListener("input", async function () {
        await checkArticle(this.value, messageDiv, quantiteInput, addRowButton);
    });

    quantiteInput.addEventListener("blur", function () {
        const value = this.value;
        const prix = parseFloat(quantiteInput.getAttribute("data-prix"));
        if (value !== "" && !isNaN(value)) {
            addRowButton.disabled = false;
            messageDiv.textContent = "";
            const total = value * prix;
            console.log(total);
            messageDiv.textContent = "";
            // messageDiv.textContent = `Total: ${total.toFixed(2)}`;
            totalGlobal += total;

            // Mettez à jour les tableaux quantiteArticle et articleConfection
            tableauQuantiteArticle.push({
                article: articleInput.value,
                quantite: quantiteInput.value
            });

            // Mettez à jour l'input coutproduction
            updateCoutProductionInput();
        } else {
            addRowButton.disabled = true;
            messageDiv.textContent = "La quantité doit être un nombre.";
        }
    });
}
// ------------------------****************FIN PARTIE TABLEAU**************------------------------------------

//----------------********************PARTIE REFERENCE**************------------------------------
let REFERENCES = "";
const categorieInput = document.getElementById("categorie");
const referencesInput = document.getElementById("references"); // Changer le type d'élément en "input"

// ...

function updateReferences() {
    const libelleValue = libelleInput.value.substring(0, 3).toUpperCase();
    const categorieValue = categorieInput.options[categorieInput.selectedIndex].text.substring(0, 3).toUpperCase();

    const reference = `${libelleValue}-${categorieValue}-000`;
    referencesInput.value = reference; // Utilisez .value pour définir la valeur du champ de saisie

    REFERENCES = reference;
}

libelleInput.addEventListener("input", updateReferences);
categorieInput.addEventListener("change", updateReferences);

//----------------******************** FIN PARTIE REFERENCE**************------------------------------

const validateButton = document.getElementById("validateButton");
validateButton.addEventListener("click", async () => {
    try {
        console.log('yessssss');
        const libelleArticle = libelleInput.value;
        const categorieArticle = categorie.value;
        const selecttailleArticle = taille.value;
        const marge = margeInput.value;
        const prixVenteInput = document.getElementById("PrixVente");
        const prixVente = prixVenteInput.value;

        const articleData = {
            libelle: libelleArticle,
            idcategorie: categorieArticle,
            idtaille: selecttailleArticle,
            references: REFERENCES,
            photo: photo,
            marge: marge,
            prixvente: prixVente,
            ArticleQuantite:tableauQuantiteArticle,
            cheminImage: cheminImage,
        };

        const response = await Api.postData("http://localhost:8000/api/articleVente/add", articleData);

        tbodyarticleVente.innerHTML += `
                <tr class="">
                <td>${articleData['libelle']}</td>
                <td>${articleData['references']}</td>
                    <td>
                        <button class="btn btn-primary">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;

        libelleInput.value = "";
        validateButton.setAttribute("disabled", "disabled");
        if (response.success) {
            console.log("Article ajouté avec succès :", response.message);


        } else {
            console.error("Erreur lors de l'ajout de l'article :", response.message);
        }
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'ajout de l'article :", erreur);
    }
});