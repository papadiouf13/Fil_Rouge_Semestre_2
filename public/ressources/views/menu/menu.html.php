<div class="sidebar close">
        <div class="logo-details">
            <i class='bx bxl-c-plus-plus'></i>
            <span class="logo_name">FIL ROUGE</span>
        </div>
        <ul class="nav-links">
            <li>
                <a href="#">
                    <i class='bx bx-grid-alt'></i>
                    <span class="link_name">Tableau</span>
                </a>
            </li>
            <li>
                <div class="iocn-link">
                    <a href="#">
                        <i class='bx bx-collection'></i>
                        <span class="link_name">Categorie</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li><a href="<?= WEB_ROUTE . "?controller=categorieController&view=categorie" ?>">Ajouter
                            Categorie</a></li>
                    <li><a href="<?= WEB_ROUTE . "?controller=categorieController&view=categorie_list" ?>">Liste
                            Categorie</a></li>
                </ul>
            </li>
            <li>
                <div class="iocn-link">
                    <a href="#">
                        <i class='bx bx-book-alt'></i>
                        <span class="link_name">Fournisseur</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li><a href="<?= WEB_ROUTE . "?controller=fournisseur&view=fournisseur" ?>">Ajouter Fournisseur</a>
                    </li>
                    <li><a href="<?= WEB_ROUTE . "?controller=fournisseur&view=fournisseur_list" ?>">Liste
                            Fournisseur</a></li>
                </ul>
            </li>
            <li>
                <div class="iocn-link">
                    <a href="#">
                        <i class='bx bx-book-alt'></i>
                        <span class="link_name">Approvisionnement</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li><a href="<?= WEB_ROUTE . "?controller=approvisionnement&view=approvisionnement" ?>">Ajouter
                            Approvisionnement</a></li>
                    <li><a href="<?= WEB_ROUTE . "?controller=approvisionnement&view=approvisionnement_list" ?>">Liste
                            Approvisionnement</a></li>
                </ul>
            </li>
            <li>
                <div class="iocn-link">
                    <a href="#">
                        <i class='bx bx-book-alt'></i>
                        <span class="link_name">Article Confection</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li><a href="<?= WEB_ROUTE . "?controller=articleConfectionController&view=add_article" ?>">Ajouter
                            Art Confection</a></li>
                    <li><a href="<?= WEB_ROUTE . "?controller=articleConfectionController&view=article_list" ?>">Liste
                            Art Confection</a></li>
                </ul>
            </li>
            <li>
                <div class="iocn-link">
                    <a href="#">
                        <i class='bx bx-collection'></i>
                        <span class="link_name">Cat. Vente</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li><a href="<?= WEB_ROUTE . "?controller=catventeController&view=categorievente" ?>">Ajouter
                            Categorie Vente</a></li>
                    <li><a href="<?= WEB_ROUTE . "?controller=catventeController&view=categorievente_list" ?>">Liste
                            Categorie Vente</a></li>
                </ul>

            </li>

            <li>
                <div class="iocn-link">
                    <a href="#">
                        <i class='bx bx-collection'></i>
                        <span class="link_name">Article Vente</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li><a href="<?= WEB_ROUTE . "?controller=articleVenteController&view=add_article" ?>">Ajouter
                            Article Vente</a></li>
                    <li><a href="<?= WEB_ROUTE . "?controller=articleVenteController&view=article_list" ?>">Liste
                            Article Vente</a></li>
                </ul>

            </li>
            <li>
                <a href="#">
                    <i class='bx bx-cog'></i>
                    <span class="link_name">Setting</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="#">Setting</a></li>
                </ul>
            </li>
            <li>
                <div class="profile-details">
                    <div class="profile-content">
                        <img src="images/profile.jpg.png" alt="profileImg">
                    </div>
                    <div class="name-job">
                        <div class="profile_name">Mamadou Diouf</div>
                        <div class="job">Developpeur Web</div>
                    </div>
                    <i class='bx bx-log-out'>Deconnexion</i>
                </div>
            </li>
        </ul>
    </div>
    <div class="home-section">
        <div class="home-content">
            <i class='bx bx-menu'></i>

        </div>
    </div>