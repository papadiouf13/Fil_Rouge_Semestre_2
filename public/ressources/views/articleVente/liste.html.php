<div class="container mt-5">
    <div class="card mt-5">
        <div class="card-body bg-white">
            <h4 class="card-title">Liste des Articles</h4>
            <table class="table table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Libelle</th>
                <th scope="col">Prix Achat</th>
                <th scope="col">Quantite Stock</th>
                <th scope="col">Categorie</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($datas as  $data): ?>
            <tr>
                <th scope="row"><?= $data->getId();?></th>
                <td><?= $data->getLibelle();?></td>
                <td><?= $data->getPrix();?></td>
                <td><?= $data->getQteStock();?></td>
                <td><?= $data->categorie()->getLibelle();?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
        </div>
    </div>
</div>