<?php

use App\Core\Session;
    $errors=[];
    if (Session::isset("errors")){
    $errors=Session::get("errors");
    Session::unset("errors");
    }
?>

<div class="container mt-5">
    <!-- PARTIE FORMULAIRE     -->
    <form class="row g-3 needs-validation" novalidate method="post" action="<?=WEB_URL?>">
        <div class="col-md-4">
            <label for="" class="form-label">Libelle</label>
            <input type="text" class="form-control <?=isset($errors["libelle"])?'is-invalid':""?> " name="libelle" >
            <div class="invalid-feedback">
                <?=$errors["libelle"]??""?>
            </div>
        </div>
        <div class="col-md-4" style="margin-top: 47px;">
            <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
        <input type="hidden" class="form-control" name="path" value="store-categorie">
    </form>



    
    <!--FIN PARTIE FORMULAIRE     -->


    <div class="card mt-5">
        <div class="card-body bg-white">
            <h4 class="card-title">Liste des Categories</h4>
            <table class="table table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Libelle</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($datas as  $data): ?>
                    <tr>
                        <th scope="row"><?= $data->getId();?></th>
                        <td><?= $data->getLibelle();?></td>
                        <td>
                            <a name="" id="" class="btn btn-success" href="#" role="button">Edit</a>
                            <a name="" id="" class="btn btn-danger" href="<?=WEB_URL . "?path="?>" role="button">Delete</a>

                        </td>
                    </tr>

                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>