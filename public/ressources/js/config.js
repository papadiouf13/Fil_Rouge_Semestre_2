

const inputElement = document.getElementById('monInput');
const resultatElement = document.getElementById('resultat');
const infoArticle = document.getElementById('infoArticle');
const quantiteCatvente = document.getElementById('quantiteCatvente');
let valide;
let categorieVente;
let Quantité;
let addArticleTab = [];
let prixTotal;
let prixVenteArticle;
let ArticleVenteExist;
//-------------------------------- PARTIE VERIFICATION ET AJOUTE ARTICLE DE VENTE ---------------------------------------------
function showInput() {
    const articleSaisi = inputElement.value;

    if (articleSaisi.trim() === '') {
        // If input is empty or only contains whitespace, clear message and infoArticle
        resultatElement.textContent = '';
        infoArticle.innerHTML = '';
        return;
    }
    valide = articleSaisi;
    // Send request to backend
    fetch('http://localhost:8000/api/ArtVenteAPI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ article: articleSaisi }) // Send the article in the request body
    })
        .then(response => response.json())
        .then(data => {

            // Process the response from the backend
            // console.log(data);
            if (data.exists === true) {
                ArticleVenteExist = data.exists;
                resultatElement.textContent = `${articleSaisi} existe déjà dans la base de données.`;
                resultatElement.style.color = 'green';
                infoArticle.innerHTML = ''; // Clear the additional form
            } else {
                resultatElement.textContent = `${articleSaisi} n'existe pas dans la base de données.`;
                resultatElement.style.color = 'red';
                showAddForm(articleSaisi);
                const buton = document.querySelector('.buton');
                console.log(buton);
                buton.addEventListener('click', () => {
                    showArticleForm(`${articleSaisi}`);
                    const categorieSelect = document.querySelector('#categorieSelect');
                    fetch('http://localhost:8000/api/SelectCategorie')
                        .then(response => response.json())
                        .then(categories => {
                            // console.log(categories);

                            // Parcourir les catégories et ajouter des options au select
                            categories.forEach(category => {
                                const option = document.createElement('option');
                                option.value = category.id;  // Assurez-vous que category a une propriété id correspondante
                                option.textContent = category.libelle;  // Assurez-vous que category a une propriété libelle correspondante
                                categorieSelect.appendChild(option);
                            });
                        })
                    categorieSelect.addEventListener('change', function () {
                        const selectedOption = categorieSelect.options[categorieSelect.selectedIndex];
                        const selectedValue = selectedOption.value;
                        const selectedText = selectedOption.textContent;
                        categorieVente = { 'id': selectedValue, 'libelle': selectedText };


                    })
                        .catch(error => {
                            console.error('Une erreur s\'est produite :', error);
                        });
                })
            }


        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showAddForm(articleSaisi) {
    infoArticle.innerHTML = `
        <div class="col">
            <h6>Voulez-vous l'ajouter?</h6>
            <div class="col">
                <button class="btn btn-success m-2 buton">OUI</button>
                <button class="btn btn-danger m-2" onclick="clearInput()">NON</button>
            </div>
        </div>
    `;
}

function showArticleForm(articleSaisi) {
    infoArticle.innerHTML = `
        <div class="col d-flex">
            <div class="form-group m-2">
                <label for="prix">Categorie:</label>
                <select class="form-select" id="categorieSelect">
                <option value disabled selected>Choisir une Categorie</option>
              </select>
            </div>
            <div class="form-group m-2">
                <label for="quantite">Quantité:</label>
                <input type="text" class="form-control" id="quantiteCatvente" placeholder="Quantité">
            </div>
            <div class="form-group m-2">
                <label for="image">Image:</label>
                <input type="file" class="form-control" id="image">
            </div>
        </div>
    `;
    Quantité = quantiteCatvente;
}

function addArticle(articleSaisi) {
    // Récupérer les valeurs d'entrée et les envoyer au backend
    const prixElement = document.getElementById('prix');
    const quantiteElement = document.getElementById('quantiteCatvente');
    const imageElement = document.getElementById('image');
    const prix = prixElement.value;
    const quantite = quantiteElement.value;
    const image = imageElement.value;


    // Envoyer une demande pour ajouter l'article
    // ...

    clearInput();
}

function clearInput() {
    inputElement.value = '';
    resultatElement.textContent = '';
    infoArticle.innerHTML = '';
}

//----------------------------------FIN PARTIE VERIFICATION ET AJOUTE ARTICLE DE VENTE ---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const articleConfectionSelect = document.getElementById('articleConfectionSelect');
    const quantiteInput = document.getElementById('quantiteInput');
    const ajouterButton = document.getElementById('ajouterButton');
    const tableBody = document.getElementById('tableBody');
    let articleSaisi = '';
    // Au chargement de la page, désactiver le bouton OK
    ajouterButton.style.display = 'none';

    function fetchAndPopulateArticles() {
        fetch('http://localhost:8000/api/articleVenteAPI') // Remplacez par l'URL de votre backend
            .then(response => response.json())
            .then(articles => {
                console.log(articles);
                articles.forEach(article => {
                    const option = document.createElement('option');
                    option.value = article.libelle; // Remplacez par la propriété appropriée de l'article
                    option.textContent = article.libelle; // Remplacez par la propriété appropriée de l'article
                    option.dataset.prix = article.prix;
                    articleConfectionSelect.appendChild(option);
                });
            })

            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
            });
    }

    fetchAndPopulateArticles();

    quantiteInput.addEventListener('input', function () {
        if (quantiteInput.value.trim() !== '') {
            ajouterButton.style.display = 'block';
        } else {
            ajouterButton.style.display = 'none';
        }
    });

    ajouterButton.addEventListener('click', function () {
        const articleConfection = articleConfectionSelect.value;
        let quantite = parseInt(quantiteInput.value); // Convertir la quantité en nombre entier
        const prixArticle = parseFloat(articleConfectionSelect.options[articleConfectionSelect.selectedIndex].dataset.prix);

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${tableBody.children.length + 1}</th>
            <td>${articleConfection}</td>
            <td>${quantite}</td>
            <td>
                <button type="button" class="btn btn-outline-dark plus">+</button>
                <button type="button" class="btn btn-outline-dark minus">-</button>
            </td>
            <td>${(quantite * prixArticle).toFixed(2)}</td>
        `;

        const plusButton = newRow.querySelector('.plus');
        const minusButton = newRow.querySelector('.minus');

        plusButton.addEventListener('click', function () {
            quantite++;
            newRow.cells[2].textContent = quantite;
            newRow.cells[4].textContent = (quantite * prixArticle).toFixed(2);
            updateTotal();
        });

        // minusButton.addEventListener('click', function () {
        //     quantite--;
        //     if (quantite <= 0) {
        //         tableBody.removeChild(newRow);
        //         const newOption = document.createElement('option');
        //         newOption.value = articleConfection;
        //         newOption.textContent = articleConfection;
        //         articleConfectionSelect.appendChild(newOption);
        //     } else {
        //         newRow.cells[2].textContent = quantite;
        //         newRow.cells[4].textContent = (quantite * prixArticle);
        //         updateTotal();
        //     }
        // });
        minusButton.addEventListener('click', function () {
            quantite--;
            if (quantite <= 0) {
                tableBody.removeChild(newRow);
                const newOption = document.createElement('option');
                newOption.value = articleConfection;
                newOption.textContent = articleConfection;
                articleConfectionSelect.appendChild(newOption);
                updateTotal(); // Mettre à jour le total après avoir supprimé la ligne
            } else {
                newRow.cells[2].textContent = quantite;
                newRow.cells[4].textContent = (quantite * prixArticle).toFixed(2);
                updateTotal();
            }
        });

        tableBody.appendChild(newRow);

        const selectedOption = articleConfectionSelect.querySelector(`option[value="${articleConfection}"]`);
        if (selectedOption) {
            articleConfectionSelect.removeChild(selectedOption);
        }

        quantiteInput.value = '';
        ajouterButton.style.display = 'none';

        updateTotal();



        addArticleTab.push({
            article: articleConfection,
            quantite: quantite,
            prix: prixArticle,
        });
    });

    // function updateTotal() {
    //     let totalGeneral = 0;
    //     const rows = tableBody.querySelectorAll('tr');
    //     rows.forEach(row => {
    //         totalGeneral += parseFloat(row.cells[4].textContent);
    //     });

    //     const totalInput = document.getElementById('totalInput');
    //     totalInput.value = rows.length > 0 ? totalGeneral : ''; // Si le tableau est vide, laissez le champ vide
    // }

    function updateTotal() {
        let totalGeneral = 0;
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            totalGeneral += parseFloat(row.cells[4].textContent);
        });

        const totalInput = document.getElementById('totalInput');
        totalInput.value = rows.length > 0 ? totalGeneral.toFixed(2) : ''; // Mettre à jour le champ "Total"
        prixTotal = totalInput.value;
    }

    const margeInput = document.getElementById('margeInput');
    const prixVenteInput = document.getElementById('prixVenteInput');
    const validerButton = document.getElementById('valider'); // Sélectionnez le bouton Valider par son ID

    prixVenteInput.addEventListener('input', function () {
        if (prixVenteInput.value !== '') {
            validerButton.style.display = 'block'; // Affiche le bouton Valider si le champ Prix de Vente contient quelque chose
        } else {
            validerButton.style.display = 'none'; // Masque le bouton Valider si le champ Prix de Vente est vide
        }
    });

    margeInput.addEventListener('input', function () {
        const marge = parseFloat(margeInput.value);
        const totalInput = document.getElementById('totalInput');
        const total = parseFloat(totalInput.value);

        const prixVente = total + marge;
        prixVenteInput.value = isNaN(prixVente) ? '' : prixVente.toFixed(2); // Met à jour le champ de prix de vente avec la marge
        prixVenteArticle = prixVenteInput.value;
    });

    const formulaire = document.getElementById('myForm')
  

    const valider = document.getElementById('valider');
    valider.addEventListener('click', async (e) => {

        e.preventDefault();
        // console.log(ArticleVenteExist);
        if (valide = ArticleVenteExist) {
            // console.log('Salam');
            const requestData = {
                addArticleTab: addArticleTab,
                prixTotal: prixTotal,
                prixVenteArticle: prixVenteArticle
            };
            // console.log(requestData);

            try {
                const response = await fetch('http://localhost:8000/api/add_articleVenteAPI', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                if (response.ok) {
                    console.log('Données envoyées avec succès au backend.');
                    // Faire quelque chose en cas de succès
                } else {
                    console.error('Échec de l\'envoi des données au backend.');
                    // Faire quelque chose en cas d'échec
                }
            } catch (error) {
                console.error('Une erreur s\'est produite lors de l\'envoi des données au backend:', error);
                // Gérer l'erreur de manière appropriée
            }

            console.log(requestData);
        } else {
            console.log('fibaxoul');
        }


    })


});


