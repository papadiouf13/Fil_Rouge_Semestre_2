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
                <div class="tableau col-10">
                    <table class="table">
                        <thead>
                            <tr class="d-flex justify-content-evenly">
                                <th>Article Confection</th>
                                <th>
                                    <button type="button" class="btn btn-primary">+</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Input 1">
                                        <input type="text" class="form-control" placeholder="Input 2">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Input 3">
                                        <input type="text" class="form-control" placeholder="Input 4">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col">
                    <div class="mb-4 col-10 d-flex">
                        <select class="form-select me-2" name="categorie" id="categorie">
                            <option value="" selected>Choisir une catégorie</option>
                        </select>
                        <button type="button" class="btn btn-outline-dark btn-circle" data-bs-toggle="modal" data-bs-target="#categorieModal">+</button>
                        <div class="error-message"></div>
                    </div>
                </div>
                <div class="col mt-4">
                    <label for="">Cout : </label>
                    <input type="text">
                </div>
                <div class="col mt-4">
                    <label for="">Marge : </label>
                    <input type="text">
                </div>
                <div class="col mt-4">
                    <label for="">Prix Vente : </label>
                    <input type="text" disabled>
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
                    <tbody id="tableauArticleConfection">
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
    </form>
</div>

<script type="module" src="<?= asset("js/articleVente/script.js") ?>"></script>