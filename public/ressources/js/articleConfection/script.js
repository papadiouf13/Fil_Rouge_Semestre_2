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

    const response1 = await fetch(`${WEB_URL}/unite`);
    const data1 = await response1.json();
    // console.log(data);
    data1.forEach(element => {
        const SelectUnite = document.getElementById("unite");
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.libelle;
        SelectUnite.appendChild(option);

    });


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
categorie.addEventListener("change", function () {
    const id = categorie.options[categorie.selectedIndex].value
    const libelle = categorie.options[categorie.selectedIndex].textContent
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.name = libelle;
    checkbox.checked = true;

    var label = document.createElement('label')
    label.htmlFor = 'car';
    label.appendChild(document.createTextNode(libelle));

    var br = document.createElement('br');

    var container = document.getElementById('selectedCategories');
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(br);
    checkbox.addEventListener("click", function () {
        checkbox.style.display = "none"
        label.style.display = "none"
    })

})


//AJOUTER CATEGORIE

const newCategoryInput = document.getElementById("newCategoryInput");
const saveCategoryButton = document.getElementById("saveCategoryButton");

saveCategoryButton.addEventListener("click", function () {
    const newCategory = newCategoryInput.value;
    if (newCategory) {
        fetch("http://localhost:8000/api/categorie/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ libelle: newCategory })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    const option = document.createElement("option");
                    option.value = newCategory;
                    option.textContent = newCategory;
                    selectElement.appendChild(option);
                    newCategoryInput.value = "";
                } else {
                    console.error("Erreur lors de l'ajout de la catégorie :", data.message);
                }
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de la catégorie :", error);
            });
    }
});

// FIN AJOUT CATEGORIE

const newUniteInput = document.getElementById("newUniteInput");
const newConversionInput = document.getElementById("newConversionInput");
const saveUniteButton = document.getElementById("saveUniteButton");

modalUnite.addEventListener("click", function () {
    const idCategorie = categorie.options[categorie.selectedIndex].value;
    const libelleCategorie = categorie.options[categorie.selectedIndex].textContent;
    selectedCategoryValue.textContent = libelleCategorie;
})
saveUniteButton.addEventListener("click", function () {
    // alert("New Conversion");
    const newUnite = newUniteInput.value;
    const newConversion = newConversionInput.value;
    const idCategorie = categorie.options[categorie.selectedIndex].value;
    const libelleCategorie = categorie.options[categorie.selectedIndex].textContent;
    console.log(libelleCategorie);

    // const selectedCategory = selectedCategoryValueElement.value;


    if (newUnite && newConversion && idCategorie) {
        // console.log("newUnite :", newUnite);
        // console.log("newConversion :", newConversion);
        // console.log("selectedCategory :", selectedCategory);
        fetch("http://localhost:8000/api/unite/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                libelle: newUnite,
                conversion: newConversion,
                categorie: idCategorie // Utilisation de l'ID de catégorie récupéré
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    const option = document.createElement("option");
                    option.value = newUnite;
                    option.textContent = newUnite;
                    newUniteInput.value = "";
                    newConversionInput.value = "";
                    console.log("Unité ajoutée avec succès !");
                } else {
                    console.error("Erreur lors de l'ajout de l'unité :", data.message);
                }
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'unité :", error);
            });
    }
});

validateButton.addEventListener("click", async () => {
    const libelleArticle = libelle.value
    const prixArticle = prix.value
    const quantiteArticle = quantite.value
    const libelleCategorie = categorie.options[categorie.selectedIndex].textContent
    // const photoArticle = photo.value
    const categorieArticle = categorie.value
    const selectUniteArticle = unite.value
    await Api.postData("http://localhost:8000/api/article/add",
        {
            libelle: libelleArticle,
            prix: prixArticle,
            quantite: quantiteArticle,
            idcategorie: categorieArticle,
            idunite: selectUniteArticle

        }).then(function (data) { })
})

//-------------------*********************PARTIE AJOUT FOURNISSEUR *****************----------------------

saveFournisseurButton.addEventListener("click", async function () {
    const nom = nomFournisseur.value;
    const prenom = prenomFournisseur.value;
    const adresse = adresseFournisseur.value;
    const telephone = telephoneFournisseur.value;
    await Api.postData("http://localhost:8000/api/fournisseur/add",
    {
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        telephone: telephone,

    }).then(function (data) { })
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
            label.textContent = fournisseur.prenom + " " + fournisseur.nom; // Utilise le prénom et le nom

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function () {
                if (this.checked) {
                    selectedFournisseurs.add(fournisseur); // Ajoute l'objet fournisseur
                } else {
                    selectedFournisseurs.delete(fournisseur);
                }
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