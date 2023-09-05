<div class="container">
    <form class="container mt-5" method="post" action="<?= WEB_URL ?>">
        <div class="row d-flex">
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
                <div class="col">
                    <div class="mb-4 col-10 d-flex">
                        <select class="form-select me-2" name="taille" id="taille">
                            <option value="" selected>Choisir une taille</option>
                        </select>
                        <button type="button" class="btn btn-outline-dark btn-circle" data-bs-toggle="modal" data-bs-target="#tailleModal" id="modalTaille" disabled>+</button>
                        <div class="error-message"></div>
                    </div>
                </div>
                <div class="col-10 d-flex">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Cout de Production" name="coutproduction" id="coutproduction" disabled>
                        <div class="error-message"></div>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Marge" name="marge" id="marge">
                        <div class="error-message"></div>
                    </div>
                </div>

                <div class="tableau col-10 mt-3">
                    <table class="table" id="articleTable">
                        <thead>
                            <tr class="">
                                <th>Article Confection</th>
                                <th>
                                    <button type="button" class="btn btn-secondary" id="addRowButton" disabled>+</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="text" class="form-control article" placeholder="Article">
                                        <input type="text" class="form-control quantite" placeholder="Quantite" disabled>
                                    </div>
                                    <div id="messageDiv"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div class="col-10 d-flex">
                    <div class="mb-3 d-flex flex-column">
                        <input type="file" name="photo" style="display:none;" id="image">
                        <label for="image" class="form-label">
                            <img id="photo" src="./../../../ressources/images/images_choice.jpg" alt="" style="width: 100px;height:120px;">
                        </label>
                    </div>
                    <div class="col p-3 d-flex flex-column">
                        <input type="text" class="form-control m-2" placeholder="Prix de Vente" name="PrixVente" id="PrixVente" disabled>
                        <input type="text" class="form-control m-2" placeholder="References" name="references" id="references" disabled>
                    </div>

                </div>
                <button type="button" class="btn btn-outline-dark " id="validateButton">Enregistrer</button>
            </div>
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="saveCategoryButton" data-bs-dismiss="modal">Enregistrer</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

     <!-- Modal pour la taille -->
     <div class="modal fade" id="tailleModal" tabindex="-1" aria-labelledby="tailleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tailleModalLabel">Ajouter Une taille</h5>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Categorie Selectionnée" id="categorieSelection" disabled>
                    
                    <div class="col d-flex justify-content-around mt-3">
                        <input type="text" class="form-control" placeholder="Nom de la taille" id="newtailleInput" name="libelle">
                        <button type="button" class="btn btn-outline-dark btn-circle" id="addUnit">+</button>
                    </div>
                    <!-- Le tableau pour afficher les unités ajoutées -->
                    <div class="mt-4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Taille</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="tailleTableBody"></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="savetailleButton" data-bs-dismiss="modal">Enregistrer</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                </div>
            </div>
        </div>
    </div>

    <div class="col-6">
        <table class="table mt-3">
            <thead class="bg-dark text-white">
                <tr>
                    <th scope="col">Libellé</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">References</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="tableauArticleVente">
                <tr>
                    <td>Produit 2</td>
                    <td>Catégorie B</td>
                    <td>5</td>
                    <td>Unité</td>
                    <td>
                        <button class="btn btn-primary">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</div>

<script type="module" src="<?= asset("js/articleVente/script.js") ?>"></script>