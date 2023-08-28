<div class="container">
<form class="container mt-5" method="post" action="<?= WEB_URL ?>" enctype="    ">
    <div class="col d-flex">
        <div class="col-6">
            <div class="mb-4 col-10">
                <input type="text" class="form-control" placeholder="Libelle" name="libelle" id="libelle">
                <div id="message"></div>
                <div class="error-message"></div>
            </div>
            <div class="mb-4 col-10 d-flex">
                <select class="form-select me-2" name="categorie" id="categorie">
                    <option value="" selected>Choisir une catégorie</option>
                </select>
                <button type="button" class="btn btn-outline-dark btn-circle" data-bs-toggle="modal" data-bs-target="#categorieModal">+</button>
                <div class="error-message"></div>
            </div>
            <div id="selectedCategories" class="mt-2">
                <!-- Les catégories sélectionnées seront affichées ici -->
            </div>
            <div class="mb-4 col-10 d-flex">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Quantité" name="quantite" id="quantite">
                    <div class="error-message"></div>
                </div>
                <div class="mb-2 col">
                    <div class="d-flex">
                        <select class="form-select me-2" name="unite" id="unite">
                            <option value="" disabled selected>Choisir une unité</option>
                        </select>
                        <button type="button" class="btn btn-outline-dark btn-circle" data-bs-toggle="modal" data-bs-target="#uniteModal" id="modalUnite" disabled>+</button>
                        <div class="error-message"></div>
                    </div>
                    <!-- Les unités sélectionnées seront affichées ici -->
                    <div id="selectedUnites" class="mt-2"></div>
                </div>
            </div>
            <div class="mb-3 col-10">
                <input type="text" class="form-control" placeholder="Prix" name="prix" id="prix">
                <div class="error-message"></div>
            </div>
        </div>
        <div class="col-6">
            <div class="mb-3 col-10 d-flex">
                <input type="text" class="form-control me-2" id="fournisseurInput" placeholder="Saisissez un fournisseur">
                <button type="button" class="btn btn-outline-dark btn-circle" data-bs-toggle="modal" data-bs-target="#fournisseurModal" id="modalFournisseur">+</button>
                <div class="error-message"></div>
            </div>
            <div class="col d-flex justify-content-evenly">
                <div id="autocompleteContainer"></div>
                <div id="fournisseurSelectionne"></div>
            </div>
            <div class="col d-flex">
                <div class="mb-3 d-flex flex-column">
                    <input type="file" name="photo" style="display:none;" id="image" >
                    <label for="image" class="form-label">
                        <img id="photo" src="./../../../ressources/images/images_choice.jpg" alt=""  style="width: 180px;height:180px;">
                    </label>
                </div>
                <div class="col p-5">
                    <p id="references">References : </p>
                </div>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-outline-dark mt-3" id="validateButton" disabled>Valider</button>
</form>

    <!-- Modal pour la catégorie -->
    <div class="modal fade" id="categorieModal" tabindex="-1" aria-labelledby="categorieModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <form action="">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="categorieModalLabel">Ajouter Une Categorie</h5>
                    </div>
                    <div class="modal-body">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Nom de la catégorie" id="newCategoryInput" name="libelle">
                        </div>
                        <div class="col mt-4 d-flex justify-content-between">
                            <input type="text" class="form-control" placeholder="Unite par defaut" name="unitedefaut" id="unitedefaut">
                            <input type="text" class="form-control" placeholder="1" name="conversiondefaut" id="conversiondefaut" disabled>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="saveCategoryButton" data-bs-dismiss="modal">Enregistrer</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal pour la Unite -->
    <div class="modal fade" id="uniteModal" tabindex="-1" aria-labelledby="uniteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="uniteModalLabel">Ajouter Une Unite</h5>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="" id="categorieSelection" disabled>
                    <input type="text" class="form-control mt-2" placeholder="1 mètre" disabled id="selectedUnitInput">
                    <div class="col d-flex justify-content-around mt-3">
                        <input type="text" class="form-control" placeholder="Nom de l'unité" id="newUniteInput" name="libelle">
                        <label for="">=</label>
                        <input type="text" placeholder="valeur en conversion" id="newConversionInput" name="conversion">
                        <button type="button" class="btn btn-outline-dark btn-circle" id="addUnit">+</button>
                    </div>
                    <!-- Le tableau pour afficher les unités ajoutées -->
                    <div class="mt-4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Unité</th>
                                    <th>Valeur de conversion</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="unitTableBody"></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="saveUniteButton" data-bs-dismiss="modal">Enregistrer</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                </div>
            </div>
        </div>
    </div>



    <!-- Modal pour le fournisseur -->
    <div class="modal fade" id="fournisseurModal" tabindex="-1" aria-labelledby="fournisseurModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="fournisseurModalLabel">Nouveau Fournisseur</h5>
                </div>
                <div class="modal-body">
                    <!-- Contenu du formulaire pour le nouveau fournisseur -->
                    <form>
                        <div class="mb-3">
                            <label for="nom" class="form-label">Nom</label>
                            <input type="text" class="form-control" id="nomFournisseur" name="nom">
                        </div>
                        <div class="mb-3">
                            <label for="prenom" class="form-label">Prénom</label>
                            <input type="text" class="form-control" id="prenomFournisseur" name="prenom">
                        </div>
                        <div class="mb-3">
                            <label for="adresse" class="form-label">Adresse</label>
                            <input type="text" class="form-control" id="adresseFournisseur" name="adresse">
                        </div>
                        <div class="mb-3">
                            <label for="telephone" class="form-label">Numéro de téléphone</label>
                            <input type="tel" class="form-control" id="telephoneFournisseur" name="telephone">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ANNULER</button>
                    <button type="button" class="btn btn-primary" id="saveFournisseurButton" data-bs-dismiss="modal" disabled>AJOUTER</button>
                </div>
            </div>
        </div>
    </div>



    <table class="table mt-3">
        <thead class="bg-dark text-white">
            <tr>
                <th scope="col">Libellé</th>
                <th scope="col">Catégorie</th>
                <th scope="col">Quantité</th>
                <th scope="col">Prix</th>
                <th scope="col">Fournisseur</th>
                <th scope="col">Unité</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody id="tableauArticleConfection">

            <!-- <tr>
                <td>Produit 2</td>
                <td>Catégorie B</td>
                <td>5</td>
                <td>$15</td>
                <td>Fournisseur Y</td>
                <td>Unité</td>
                <td>
                    <button class="btn btn-primary">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr> -->
        </tbody>
    </table>

</div>

<script type="module" src="<?= asset("js/articleConfection/script.js") ?>"></script>