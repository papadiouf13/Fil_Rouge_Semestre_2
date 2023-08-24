import { Api } from "./../core/api.js";
import { WEB_URL } from "./../core/bootstrap.js";

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

    tbodyarticleconfection.innerHTML = "";
    for (let cat of data2) {
        tbodyarticleconfection.innerHTML += `
            <tr class="">
                <th scope="row">${cat.id}</th>
                <td>${cat.libelle}</td>
                <th scope="row">${cat.prix}</th>
                <td>${cat.quantite}</td>
                <th scope="row">${cat.idcategorie}</th>
                <td>${cat.idunite}</td>
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
    }




})
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
//PARTIE REFERENCES
document.addEventListener("DOMContentLoaded", function () {
    const libelleInput = document.getElementById("libelle");
    const categorieInput = document.getElementById("categorie");
    const referencesParagraph = document.getElementById("references");

    function updateReferences() {
        const libelleValue = libelleInput.value.substring(0, 3).toUpperCase();
        const categorieValue = categorieInput.options[categorieInput.selectedIndex].text.substring(0, 3).toUpperCase();

        const reference = `References : ${libelleValue}-${categorieValue}-000`;
        referencesParagraph.textContent = reference;
    }

    libelleInput.addEventListener("input", updateReferences);
    categorieInput.addEventListener("change", updateReferences);
});
//FIN PARTIE REFERENCES 

//recuperer photo apres clique 
const inputvalid = document.querySelector("#image")
inputvalid.addEventListener("change", onChangeImage)
function onChangeImage() {
    let f = new FileReader();
    f.readAsDataURL(inputvalid.files[0]);
    f.onloadend = function (event) {
        const path = event.target.result;
        document.querySelector('#photo').setAttribute("src", path)
    }
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

categorie.addEventListener('change', async () => {
    const response1 = await fetch(`${WEB_URL}/uniteCategorie`);
    const data1 = await response1.json();

    // Effacer les options existantes du sélecteur d'unités
    const SelectUnite = document.getElementById("unite");
    SelectUnite.innerHTML = "";

    // Ajouter les nouvelles options basées sur la catégorie sélectionnée
    data1.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.libelle;
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
                const option = document.createElement("option");
                option.value = newCategory;
                option.textContent = newCategory;
                selectCategorie.appendChild(option);
                newCategoryInput.value = "";
                selectCategorie.value = newCategory;
                modalUniteButton.removeAttribute("disabled");
            } else {
                console.error("Erreur lors de l'ajout de la catégorie :", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie :", error);
        }
    }
});

// FIN AJOUT CATEGORIE AVEC APRES AJOUT LA VALEUR AJOUTER SOIT DANS LE SELECTED 


// AJOUT UNITE 
const modalUnite = document.querySelector("#uniteModal");
const categorieSelectionInput = document.getElementById("categorieSelection");
const newUniteInput = document.getElementById("newUniteInput");
const newConversionInput = document.getElementById("newConversionInput");
const saveUniteButton = document.getElementById("saveUniteButton");
const unitTableBody = document.getElementById("unitTableBody");


modalUnite.addEventListener("show.bs.modal",async function () {
    const idCategorie = categorie.options[categorie.selectedIndex].value;
    const libelleCategorie = categorie.options[categorie.selectedIndex].textContent;
    categorieSelectionInput.value = libelleCategorie;
    const response = await fetch(`${WEB_URL}/uniteCategorie`);
    const data = await response.json();
    console.log(data);
    selectedUnitInput.value = data[0].libelle;
});

const unitDataArray = []; // Tableau pour stocker les données de libelle, de conversion et de catégorie

addUnit.addEventListener("click", function () {
    const libelle = newUniteInput.value;
    const conversion = newConversionInput.value;
    const categorieSelection = categorieSelectionInput.value;
    const idCategorie = categorie.options[categorie.selectedIndex].value;

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
        // Send unitDataArray to the server
        const data = await Api.postData("http://localhost:8000/api/unite/add", unitDataArray);

        console.log(data);

        if (data.success) {
            // Clear the array and table after successful submission
            unitDataArray.length = 0;
            unitTableBody.innerHTML = "";

            // Update the select element with newly added units
            const selectUnite = document.getElementById("unite");
            for (const unit of data) {
                const option = document.createElement("option");
                option.value = unit.libelle;
                option.textContent = unit.libelle;
                selectUnite.appendChild(option);
            }

            console.log("Unités ajoutées avec succès !");
        } else {
            console.error("Erreur lors de l'ajout des unités :", data.message);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout des unités :", error);
    }
});


//FIN AJOUT UNITE  

validateButton.addEventListener("click", async () => {
    const libelleArticle = libelle.value;
    const prixArticle = prix.value;
    const quantiteArticle = quantite.value;
    const libelleCategorie = categorie.options[categorie.selectedIndex].textContent;
    // const photoArticle = photo.value;
    const categorieArticle = categorie.value;
    const selectUniteArticle = unite.value;
    const selectedFournisseursArray = Array.from(selectedFournisseursIds).map(id => ({ id }));
    console.log(selectedFournisseursArray);

    await Api.postData("http://localhost:8000/api/article/add", {
        libelle: libelleArticle,
        prix: prixArticle,
        quantite: quantiteArticle,
        idcategorie: categorieArticle,
        idunite: selectUniteArticle,
        idfournisseur: selectedFournisseursArray
    }).then(function (data) {
        // Faites quelque chose avec la réponse de la requête
    });
});

//-------------------*********************PARTIE AJOUT FOURNISSEUR *****************

// saveFournisseurButton.addEventListener("click", async function () {
//     const nom = nomFournisseur.value;
//     const prenom = prenomFournisseur.value;
//     const adresse = adresseFournisseur.value;
//     const telephone = telephoneFournisseur.value;
//     await Api.postData("http://localhost:8000/api/fournisseur/add",
//         {
//             nom: nom,
//             prenom: prenom,
//             adresse: adresse,
//             telephone: telephone,

//         }).then(function (data) { })
// });

saveFournisseurButton.addEventListener("click", async function () {
    const nomFournisseur = document.getElementById("nomFournisseur");
    const prenomFournisseur = document.getElementById("prenomFournisseur");
    const adresseFournisseur = document.getElementById("adresseFournisseur");
    const telephoneFournisseur = document.getElementById("telephoneFournisseur");

    const nom = nomFournisseur.value;
    const prenom = prenomFournisseur.value;
    const adresse = adresseFournisseur.value;
    const telephone = telephoneFournisseur.value;

    await Api.postData("http://localhost:8000/api/fournisseur/add", {
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        telephone: telephone,
    }).then(function (data) {
        if (data.success) {
            const fournisseurInput = document.getElementById("fournisseurInput");
            fournisseurInput.value = ""; // Effacez le champ de saisie du fournisseur
            selectedFournisseurs.clear(); // Effacez la liste des fournisseurs sélectionnés

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
});
//-----------------------------****************FIN PARTIE AJOUT FOURNISSEUR*****************-------------------------------

//---------------------------PARTIE RECHERCHE FOURNISSEUR DANS LE INPUT------------------------------------------
const fournisseurInput = document.getElementById("fournisseurInput");
const autocompleteContainer = document.getElementById("autocompleteContainer");
let selectedFournisseurs = new Set(); // Stocke les fournisseurs sélectionnés
let fournisseurs = []; // Stocke la liste complète des fournisseurs


async function fetchFournisseurs() {
    try {
        const response = await fetch("http://localhost:8000/api/fournisseur");
        const data = await response.json();
        fournisseurs = data; // Met à jour la liste des fournisseurs
    } catch (error) {
        console.error("Erreur lors de la récupération des fournisseurs :", error);
    }
}

fetchFournisseurs(); // Appelle la fonction pour récupérer les fournisseurs au chargement


// const selectedFournisseurs = new Set();
const selectedFournisseursIds = new Set();

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
            checkbox.addEventListener("change", function () {
                if (this.checked) {
                    selectedFournisseurs.add(fournisseur);
                    selectedFournisseursIds.add(fournisseur.id);
                } else {
                    selectedFournisseurs.delete(fournisseur);
                    selectedFournisseursIds.delete(fournisseur.id);
                }

                const selectedFournisseursArray = Array.from(selectedFournisseursIds).map(id => ({ id }));
                console.log(selectedFournisseursArray);
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

// Pour obtenir le tableau d'objets contenant les IDs des fournisseurs sélectionnés



fournisseurInput.addEventListener("blur", function () {
    // Sauvegarde des valeurs sélectionnées dans une structure appropriée
    console.log("Fournisseurs sélectionnés :", Array.from(selectedFournisseurs));
});

fournisseurInput.addEventListener("input", function () {
    const inputValue = this.value.toLowerCase();
    const filteredFournisseurs = fournisseurs.filter(fournisseur => fournisseur.nom.toLowerCase().includes(inputValue));

    renderAutocompleteOptions(filteredFournisseurs);
});

fournisseurInput.addEventListener("keyup", function () {
    const inputValue = this.value.toLowerCase();
    if (inputValue === "") {
        const filteredSelectedFournisseurs = Array.from(selectedFournisseurs).filter(fournisseur =>
            fournisseur.nom.toLowerCase().includes(inputValue)
        );

        renderAutocompleteOptions(filteredSelectedFournisseurs);
    }
});
//-----------------PARTIE RECHERCHE FOURNISSEUR DANS LE INPUT-----------------------------------------

