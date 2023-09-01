import { Api } from "./../core/api.js";
import { WEB_URL } from "./../core/bootstrap.js";
const tbodyarticleconfection = document.getElementById("tableauArticleConfection");

window.addEventListener("load", async function () {
    // alert('ok');
    // const Selectcategorie = document.querySelector('#categorie')
    // await Api.getData("http://localhost:8000/api/categorie").then(function (data) {
    // console.log(data);
    //     data.forEach(element => {
    //         const option = document.createElement('option');
    //         option.value = element.id;
    //         option.textContent = element.libelle;
    //         Selectcategorie.appendChild(option);
    //     });
    // });

    const response = await fetch(`${WEB_URL}/categorie`);
    const data = await response.json();
    // console.log(data);
    data.forEach(element => {
        const Selectcategorie = document.getElementById("categorie");
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.libelle;
        Selectcategorie.appendChild(option);

    });

    // const response1 = await fetch(`${WEB_URL}/unite`);
    // const data1 = await response1.json();
    // // console.log(data);
    // data1.forEach(element => {
    //     const SelectUnite = document.getElementById("unite");
    //     const option = document.createElement("option");
    //     option.value = element.id;
    //     option.textContent = element.libelle;
    //     SelectUnite.appendChild(option);

    // });


    const response2 = await fetch(`${WEB_URL}/article`);
    const data2 = await response2.json();
    // console.log(data);
    const tbodyarticleconfection = document.getElementById("tableauArticleConfection"); // Assurez-vous d'avoir un élément avec l'ID "tbodycategorie"

    // const tbodyarticleconfection = document.getElementById("tableauArticleConfection");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageSpan = document.getElementById("currentPage");

// Exemple de tableau de données (remplacez ceci par vos données réelles)
// const data2 = [
//     { libelle: "Produit 1", prix: 10, quantite: 20, idcategorie: "Catégorie A" },
//     { libelle: "Produit 2", prix: 15, quantite: 5, idcategorie: "Catégorie B" },
//     // ... Ajoutez d'autres éléments ici
// ];

const itemsPerPage = 3; // Nombre d'éléments par page
let currentPage = 1;    // Page actuelle

// Fonction pour générer le contenu du tableau en fonction de la pagination
function generateTable() {
    tbodyarticleconfection.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < Math.min(endIndex, data2.length); i++) {
        const cat = data2[i];
        
        const row = `
            <tr>
                <td>${cat['libelle']}</td>
                <td>${cat['prix']}</td>
                <td>${cat['quantite']}</td>
                <td>${cat['reference']}</td>
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

        tbodyarticleconfection.innerHTML += row;
    }

    // updatePageIndicator();
}

// Mettre à jour l'indicateur de page
// function updatePageIndicator() {
//     currentPageSpan.textContent = `Page ${currentPage}`;
// }

// Gérer le clic sur le bouton "Précédent"
prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        generateTable();
    }
});

// Gérer le clic sur le bouton "Suivant"
nextPageButton.addEventListener("click", () => {
    const startIndex = currentPage * itemsPerPage;
    if (startIndex < data2.length) {
        currentPage++;
        generateTable();
    }
});

// Appeler la fonction pour générer le contenu initial du tableau
generateTable();

   




})
// PARTIE LIBELLE EXISTE OU PAS DANS LA BASE DE DONNEES

const libelleInput = document.getElementById('libelle');
const messageDiv = document.getElementById('message');

libelleInput.addEventListener('input', async function () {
    const libelle = libelleInput.value.trim();

    if (libelle.length >= 3) {
        try {
            const response = await fetch(`http://localhost:8000/api/article`);
            const data = await response.json();

            const articleExists = data.some(article => article.libelle.toLowerCase() === libelle.toLowerCase());

            if (articleExists) {
                messageDiv.textContent = libelle + ' existe déjà dans la base de données.';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = 'La valeur ' + libelle + " n'existe pas dans la base de données.";
                messageDiv.style.color = 'red';
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


//PARTIE REFERENCES
let REFERENCES = '';
document.addEventListener("DOMContentLoaded", function () {
    const libelleInput = document.getElementById("libelle");
    const categorieInput = document.getElementById("categorie");
    const referencesParagraph = document.getElementById("references");

    function updateReferences() {
        const libelleValue = libelleInput.value.substring(0, 3).toUpperCase();
        const categorieValue = categorieInput.options[categorieInput.selectedIndex].text.substring(0, 3).toUpperCase();

        const reference = `References : ${libelleValue}-${categorieValue}-000`;
        referencesParagraph.textContent = reference;
        REFERENCES = referencesParagraph.textContent;
        // console.log(reference);
    }

    libelleInput.addEventListener("input", updateReferences);
    categorieInput.addEventListener("change", updateReferences);
});
//FIN PARTIE REFERENCES 

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



//Selectionne Categorie
const categorie = document.getElementById("categorie");
const modalUniteButton = document.getElementById("modalUnite");
categorie.addEventListener("change", function () {
    if (categorie.value !== "") {
        modalUniteButton.removeAttribute("disabled"); // Activer le bouton "+ de l'unité"
    } else {
        modalUniteButton.setAttribute("disabled", "disabled"); // Désactiver le bouton "+ de l'unité"
    }
});
categorie.addEventListener('change', async function () {
    const idCategorie = categorie.options[categorie.selectedIndex].value;
    const data = await Api.postData("http://localhost:8000/api/categorieID", {
        categorieID: idCategorie,

    });

})

let conversion = ""

categorie.addEventListener('change', async () => {
    const response1 = await fetch(`${WEB_URL}/uniteCategorie`);
    const response2 = await fetch(`${WEB_URL}/unitepardefautCategorie`);
    const data1 = await response1.json();
    const data2 = await response2.json();
    conversion = data2[0].conversion;
    console.log(conversion);
    // Effacer les options existantes du sélecteur d'unités
    const SelectUnite = document.getElementById("unite");
    SelectUnite.addEventListener("change",async () => {
        const data = await Api.postData("http://localhost:8000/api/conversion", {
        id: SelectUnite.value,
        
    });

    conversion = data['conversion']['conversion'];
    console.log(conversion);
    })
    SelectUnite.innerHTML = "";

    // Ajouter les nouvelles options basées sur la catégorie sélectionnée
    data1.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.libelle;
        option.conversion = element.conversion;
        console.log(option.conversion);
        SelectUnite.appendChild(option);
    });
});

const uniteModal = document.getElementById("uniteModal");
uniteModal.addEventListener("show.bs.modal", function () {
    if (categorie.value === "") {
        modalUniteButton.setAttribute("disabled", "disabled"); // Désactiver le bouton "+ de l'unité"
    }
});
// AJOUT CATEGORIE
const newCategoryInput = document.getElementById("newCategoryInput");
const saveCategoryButton = document.getElementById("saveCategoryButton");

saveCategoryButton.addEventListener("click", async function () {
    const newCategory = newCategoryInput.value;
    if (newCategory) {
        try {
            const data = await Api.postData("http://localhost:8000/api/categorie/add", {
                libelle: newCategory,
                unite: unitedefaut.value,
                conversion: conversiondefaut.value,
            });

            if (data.success) {
                const selectCategorie = document.getElementById("categorie");
                const selectUnite = document.getElementById("unite");
                const optionCategorie = document.createElement("option");
                optionCategorie.value = data.dataCategorie.idCategorie;
                optionCategorie.textContent = newCategory;
                selectCategorie.appendChild(optionCategorie);
                selectCategorie.value = data.dataCategorie.idCategorie;

                const optionUnite = document.createElement("option");
                optionUnite.value = data.dataCategorie.idUnite;
                optionUnite.textContent = data.dataCategorie.libelleUnite;
                selectUnite.appendChild(optionUnite);
                selectUnite.value = data.dataCategorie.idUnite;

                newCategoryInput.value = "";
                unitedefaut.value = "";
                conversiondefaut.value = "";
                modalUniteButton.removeAttribute("disabled");
            } else {
                console.error("Erreur lors de l'ajout de la catégorie :", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie :", error);
        }
    }
});

const modalUnite = document.querySelector("#uniteModal");
const categorieSelectionInput = document.getElementById("categorieSelection");
const UniteSelectionInput = document.getElementById("selectedUnitInput");
const newUniteInput = document.getElementById("newUniteInput");
const newConversionInput = document.getElementById("newConversionInput");
const saveUniteButton = document.getElementById("saveUniteButton");
const unitTableBody = document.getElementById("unitTableBody");


modalUnite.addEventListener("show.bs.modal",async function () {
   
    const idCategorie = categorie.options[categorie.selectedIndex].value;
    const libelleCategorie = categorie.options[categorie.selectedIndex].textContent;
    const libelleUnite = unite.options[unite.selectedIndex].textContent;
    UniteSelectionInput.value = libelleUnite;
    categorieSelectionInput.value = libelleCategorie;
    const response = await fetch(`${WEB_URL}/uniteCategorie`);
    const data = await response.json();
    console.log(data);
    // selectedUnitInput.value = data.dataCategorie.libelleUnite;
});

const unitDataArray = []; // Tableau pour stocker les données de libelle, de conversion et de catégorie

const addUnitButton = document.getElementById("addUnit"); // Obtenez la référence au bouton "Ajouter"

addUnitButton.addEventListener("click", function () {
    const libelle = newUniteInput.value;
    const conversion = newConversionInput.value;
    const categorieSelection = categorieSelectionInput.value;

    // Vérifier si les champs sont vides
    if (libelle.trim() === "" || conversion.trim() === "") {
        alert("Veuillez remplir tous les champs.");
        return; // Ne rien faire si les champs sont vides
    }

    const idCategorie = categorie.options[categorie.selectedIndex].value;

    // Vérifier si l'unité a déjà été ajoutée
    const existingUnit = unitDataArray.find(unit => unit.libelle === libelle && unit.conversion === conversion);
    if (existingUnit) {
        alert("Cette unité a déjà été ajoutée.");
        return; // Ne pas ajouter si l'unité existe déjà
    }

    // Ajouter les données au tableau
    unitDataArray.push({ libelle, conversion, idCategorie });

    // Mettre à jour le body du tableau
    updateTable();

    // Effacer les champs de saisie
    newUniteInput.value = "";
    newConversionInput.value = "";
});

function updateTable() {
    // Effacer les lignes existantes
    unitTableBody.innerHTML = "";

    // Reconstruire la table avec les données actuelles
    unitDataArray.forEach((unit, index) => {
        const { libelle, conversion } = unit;
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${libelle}</th>
            <td>${conversion}</td>
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

        unitTableBody.appendChild(row);
    });
}

function deleteUnit(index) {
    // Supprimez l'élément correspondant de unitDataArray
    unitDataArray.splice(index, 1);

    // Mettre à jour le tableau
    updateTable();
}

saveUniteButton.addEventListener("click", async function () {
    try {
        // Envoyer unitDataArray au serveur
        const response = await Api.postData("http://localhost:8000/api/unite/add", unitDataArray);
        // console.log(response.data);
        const data = response;
        console.log(data.data[0].libelle);

        if (data.success) {
            // Effacez le tableau et la table après une soumission réussie
            unitDataArray.length = 0;
            unitTableBody.innerHTML = "";
        
            // Mettre à jour l'élément select avec les unités nouvellement ajoutées
            const selectUnite = document.getElementById("unite");
            let optionsHTML = "";
        
            data.data.forEach(element => {
                optionsHTML += `<option value="${element.idCategorie}">${element.libelle}</option>`;
            });
        
            // Remplacer le contenu actuel de l'élément select avec les nouvelles options
            selectUnite.innerHTML += optionsHTML;
        
            console.log("Unités ajoutées avec succès !");
        } else {
            console.error("Erreur lors de l'ajout des unités :", data.message);
        }
        
        
    } catch (error) {
        console.error("Erreur lors de l'ajout des unités :", error);
    }
});


//FIN AJOUT UNITE  


//-------------------*********************PARTIE AJOUT FOURNISSEUR *****************

// Sélectionnez le bouton "Enregistrer"
const saveFournisseurButton = document.getElementById("saveFournisseurButton");

// Sélectionnez les champs de saisie
const nomFournisseur = document.getElementById("nomFournisseur");
const prenomFournisseur = document.getElementById("prenomFournisseur");
const adresseFournisseur = document.getElementById("adresseFournisseur");
const telephoneFournisseur = document.getElementById("telephoneFournisseur");

// Fonction pour vérifier si tous les champs sont remplis
function checkFields() {
    const nomValid = nomFournisseur.value.trim() !== "";
    const prenomValid = prenomFournisseur.value.trim() !== "";
    const adresseValid = adresseFournisseur.value.trim() !== "";
    const telephoneValid = /^[0-9]+$/.test(telephoneFournisseur.value.trim());

    return nomValid && prenomValid && adresseValid && telephoneValid;
}

// Mettez à jour l'état du bouton Enregistrer lors de la saisie dans les champs
[nomFournisseur, prenomFournisseur, adresseFournisseur, telephoneFournisseur].forEach(inputField => {
    inputField.addEventListener("input", function () {
        saveFournisseurButton.disabled = !checkFields(); // Désactivez le bouton si tous les champs ne sont pas remplis
    });
});

// Lorsque le bouton est cliqué
saveFournisseurButton.addEventListener("click", async function () {
    // Récupérez les valeurs des champs
    const nom = nomFournisseur.value;
    const prenom = prenomFournisseur.value;
    const adresse = adresseFournisseur.value;
    const telephone = telephoneFournisseur.value;

    // Vérifiez une dernière fois si tous les champs sont remplis
    if (checkFields()) {
        // Effectuez votre requête POST avec les données
        await Api.postData("http://localhost:8000/api/fournisseur/add", {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            telephone: telephone,
        }).then(function (data) {
            if (data.success) {
                const fournisseurInput = document.getElementById("fournisseurInput");
                fournisseurInput.value = ""; // Effacez le champ de saisie du fournisseur

                // Mettez à jour la liste des fournisseurs disponibles
                fetchFournisseurs().then(() => {
                    // Réaffichez les options de fournisseur disponibles
                    fournisseurInput.dispatchEvent(new Event("input"));
                });
            } else {
                console.error("Erreur lors de l'ajout du fournisseur :", data.message);
            }
        }).catch(error => {
            console.error("Erreur lors de l'ajout du fournisseur :", error);
        });
    } else {
        console.log("Veuillez remplir tous les champs avant d'enregistrer.");
    }
});

//-----------------------------****************FIN PARTIE AJOUT FOURNISSEUR*****************-------------------------------

//---------------------------PARTIE RECHERCHE FOURNISSEUR DANS LE INPUT------------------------------------------
const fournisseurInput = document.getElementById("fournisseurInput");
const autocompleteContainer = document.getElementById("autocompleteContainer");
const fournisseurSelectionne = document.getElementById("fournisseurSelectionne");
let selectedFournisseurs = new Set();
let fournisseurs = [];

async function fetchFournisseurs() {
    try {
        const response = await fetch("http://localhost:8000/api/fournisseur");
        const data = await response.json();
        fournisseurs = data;
    } catch (error) {
        console.error("Erreur lors de la récupération des fournisseurs :", error);
    }
}

fetchFournisseurs();

function renderAutocompleteOptions(options) {
    autocompleteContainer.innerHTML = "";

    if (options.length === 0 && fournisseurInput.value !== "") {
        const message = document.createElement("div");
        message.className = "autocomplete-message";
        message.textContent = "Fournisseur non trouvé";
        autocompleteContainer.appendChild(message);
    } else {
        options.forEach(fournisseur => {
            const option = document.createElement("div");
            option.className = "autocomplete-option";

            const label = document.createElement("label");
            label.textContent = fournisseur.prenom + " " + fournisseur.nom;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("data-id", fournisseur.id);
            checkbox.addEventListener("change", function () {
                if (this.checked) {
                    selectedFournisseurs.add(fournisseur);
                } else {
                    selectedFournisseurs.delete(fournisseur);
                }
                updateFournisseurSelectionne();
            });

            if (selectedFournisseurs.has(fournisseur)) {
                checkbox.checked = true;
            }

            label.appendChild(checkbox);
            option.appendChild(label);
            autocompleteContainer.appendChild(option);
        });
    }
}

function updateFournisseurSelectionne() {
    fournisseurSelectionne.innerHTML = "";

    fournisseurSelectionne.style.display = "flex";
    fournisseurSelectionne.style.flexWrap = "wrap";

    Array.from(selectedFournisseurs).map(fournisseur => {
        const selectedOption = document.createElement("div");
        selectedOption.className = "selected-fournisseur";

        const fournisseurName = document.createElement("span");
        fournisseurName.textContent = fournisseur.prenom + " " + fournisseur.nom;
        fournisseurName.style.padding = "10px";

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "X";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "50%";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.cursor = "pointer";

        deleteButton.addEventListener("click", function () {
            selectedFournisseurs.delete(fournisseur);
            const correspondingCheckbox = document.querySelector(`input[type="checkbox"][data-id="${fournisseur.id}"]`);
            if (correspondingCheckbox) {
                correspondingCheckbox.checked = false;
            }
            updateFournisseurSelectionne();
        });

        selectedOption.appendChild(fournisseurName);
        selectedOption.appendChild(deleteButton);
        fournisseurSelectionne.appendChild(selectedOption);
    });
}

fournisseurInput.addEventListener("blur", function () {
    console.log("Fournisseurs sélectionnés :", Array.from(selectedFournisseurs));
    checkArticleAndCategory();
});

fournisseurInput.addEventListener("input", function () {
    const inputValue = this.value.toLowerCase();
    const filteredFournisseurs = fournisseurs.filter(fournisseur =>
        fournisseur.nom.toLowerCase().includes(inputValue)
    );

    renderAutocompleteOptions(filteredFournisseurs);
    checkArticleAndCategory();
});

fournisseurInput.addEventListener("keyup", function () {
    const inputValue = this.value.toLowerCase();  
    if (inputValue === "") {
        autocompleteContainer.innerHTML = "";
        updateFournisseurSelectionne();
        checkArticleAndCategory();
    } else {
        const filteredFournisseurs = fournisseurs.filter(fournisseur =>
            fournisseur.nom.toLowerCase().includes(inputValue)
        );

        renderAutocompleteOptions(filteredFournisseurs);
        checkArticleAndCategory();
    }
});
//-----------------PARTIE RECHERCHE FOURNISSEUR DANS LE INPUT-----------------------------------------


// --------------*************PARTIE DE VALIDATION DU BOUTON VALIDER************------------------------------

const validateButton = document.getElementById("validateButton");

async function checkArticleAndCategory() {
    try {
        const libelleArticle = libelleInput.value;
        const categorieArticle = categorie.value;
        const prixArticle = parseFloat(prix.value);
        const quantiteArticle = parseFloat(quantite.value);

        const response = await fetch("http://localhost:8000/api/article");
        const data = await response.json();
        
        const articleExists = data.some(article => article.libelle.toLowerCase() === libelleArticle.toLowerCase());
        const isCategorieSelected = categorieArticle !== "";
        const isPriceValid = prixArticle > 0;
        const isQuantityValid = quantiteArticle > 0;

        const selectedFournisseursArray = Array.from(selectedFournisseurs);
        const isAtLeastOneFournisseurSelected = selectedFournisseursArray.length > 0;

        if (articleExists || !isCategorieSelected || !isPriceValid || !isQuantityValid || !isAtLeastOneFournisseurSelected) {
            validateButton.setAttribute("disabled", "disabled");
        } else {
            validateButton.removeAttribute("disabled");
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

categorie.addEventListener("change", checkArticleAndCategory);
libelleInput.addEventListener("input", checkArticleAndCategory);
prix.addEventListener("input", checkArticleAndCategory);
quantite.addEventListener("input", checkArticleAndCategory);

// --------------*************FIN PARTIE DE VALIDATION DU BOUTON VALIDER*****************---------------------------

// --------------*************PARTIE ENREGISTREMENT D'ARTICLE DE CONFECTION *****************---------------------------
categorie.addEventListener("change", checkArticleAndCategory);
libelleInput.addEventListener("input", checkArticleAndCategory);
prix.addEventListener("input", checkArticleAndCategory);
quantite.addEventListener("input", checkArticleAndCategory);
validateButton.addEventListener("click", async () => {
    try {
        console.log('yessssss');
        const libelleArticle = libelleInput.value;
        const prixArticle = prix.value;
        const quantiteArticle = quantite.value;
        const categorieArticle = categorie.value;
        const selectUniteArticle = unite.value;
        const selectedFournisseursArray = Array.from(selectedFournisseurs).map(fournisseur => fournisseur.id);

        const articleData = {
            libelle: libelleArticle,
            prix: prixArticle,
            quantite: quantiteArticle,
            idcategorie: categorieArticle,
            idunite: selectUniteArticle,
            idfournisseur: selectedFournisseursArray,
            references: REFERENCES,
            photo: photo, 
            conversion: conversion, 
            cheminImage: cheminImage
        };

        const response = await Api.postData("http://localhost:8000/api/article/add", articleData);
         
            tbodyarticleconfection.innerHTML += `
                <tr class="">
                <td>${articleData['libelle']}</td>
                <th scope="row">${articleData['prix']}</th>
                <td>${articleData['quantite']}</td>
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
            prix.value = "";
            quantite.value = "";
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
// --------------*************FIN PARTIE ENREGISTREMENT D'ARTICLE DE CONFECTION *****************---------------------------



