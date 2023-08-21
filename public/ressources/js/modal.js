document.addEventListener("DOMContentLoaded", function() {
    const deleteLinks = document.querySelectorAll(".delete-item");
    const modalQuantityInput = document.querySelector("#exampleModal input[type='text']");
    const augmenterBtn = document.getElementById("augmenterBtn");
    const diminuerBtn = document.getElementById("diminuerBtn");
    const ouiBtn = document.getElementById("ouiBtn");
    const inputEnregistrer = document.querySelector("#Tioukh");
    const btn_Total = document.querySelector("#btn_Total");
        
    if (btn_Total.value == 0) {
        inputEnregistrer.style.display = "none";
    } else {
        inputEnregistrer.style.display = "block"; 
    }


    // console.log(btn_Total.value);
    // let elementKey = null; // Variable pour stocker la clé de l'élément en cours de modification

    deleteLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const quantity = this.getAttribute("data-quantity");
            elementKey = this.getAttribute("data-key"); // Récupérer la clé de l'élément
            modalQuantityInput.value = quantity;
        });
    });

    augmenterBtn.addEventListener("click", function() {
        const quantiteActuelle = parseInt(modalQuantityInput.value);
        modalQuantityInput.value = quantiteActuelle + 1;
    });

    diminuerBtn.addEventListener("click", function() {
        const quantiteActuelle = parseInt(modalQuantityInput.value);
        if (quantiteActuelle > 0) {
            modalQuantityInput.value = quantiteActuelle - 1;
        }
    });

    ouiBtn.addEventListener("click", function() {
        const nouvelleQuantite = parseInt(modalQuantityInput.value);

        // Mettre à jour la quantité dans le tableau
        const trElement = document.querySelectorAll("tbody tr")[elementKey]; // Trouver la ligne correspondant à la clé
        const tdQuantite = trElement.querySelector("td:nth-child(3)"); // Sélectionner la cellule de quantité
        console.log(tdQuantite);
        const tdPrix = trElement.querySelector("td:nth-child(4)"); // Sélectionner la cellule de prix
        const tdTotal = trElement.querySelector("td:nth-child(5)"); // Sélectionner la cellule de total

        if (!isNaN(nouvelleQuantite)) {
            if (nouvelleQuantite === 0) {
                document.querySelector("tbody").removeChild(trElement);
            //    alert('Tioukh'); 
            }
            tdQuantite.textContent = nouvelleQuantite; // Mettre à jour la quantité dans le tableau

            // Mettre à jour le champ total pour cet article
            const prix = parseFloat(tdPrix.textContent);
            const total = nouvelleQuantite * prix;
            tdTotal.textContent = total.toFixed(); // Afficher le total avec 2 décimales

            // Recalculer le montant total général
            const allTotalElements = document.querySelectorAll("tbody tr td:nth-child(5)");
            let montantTotal = 0;
            allTotalElements.forEach((totalElement) => {
                montantTotal += parseFloat(totalElement.textContent);
            });

            // Mettre à jour le champ de montant total général
            const montantTotalInput = document.querySelector("input[name='montantTotal']");
            montantTotalInput.value = montantTotal.toFixed(); // Afficher le montant total général avec 2 décimales

            // Sauvegarder la quantité modifiée dans le stockage local
            localStorage.setItem(`quantity_${elementKey}`, nouvelleQuantite);
        }

        // Fermer la fenêtre modale
        const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modal.hide();
    });

    // Récupérer les quantités modifiées depuis le stockage local et mettre à jour le tableau
    const savedQuantities = Object.keys(localStorage).filter(key => key.startsWith("quantity_"));
    savedQuantities.forEach(key => {
        const index = key.split("_")[1];
        const quantity = localStorage.getItem(key);

        const trElement = document.querySelectorAll("tbody tr")[index];
        // console.log(trElement);
        const tdQuantite = trElement.querySelector("td:nth-child(3)");
        tdQuantite.textContent = quantity;

        // Mettre à jour le champ total pour cet article
        const tdPrix = trElement.querySelector("td:nth-child(4)"); // Sélectionner la cellule de prix
        const tdTotal = trElement.querySelector("td:nth-child(5)"); // Sélectionner la cellule de total
        const prix = parseFloat(tdPrix.textContent);
        const total = quantity * prix;
        tdTotal.textContent = total.toFixed(); // Afficher le total avec 2 décimales

        // Recalculer le montant total général
        const allTotalElements = document.querySelectorAll("tbody tr td:nth-child(5)");
        let montantTotal = 0;
        allTotalElements.forEach((totalElement) => {
            montantTotal += parseFloat(totalElement.textContent);
        });

        // Mettre à jour le champ de montant total général
        const montantTotalInput = document.querySelector("#Tioukh");
        const enregistrerInput = document.querySelector("input[name='ENREGISTRER']");
        console.log(montantTotalInput);
        montantTotalInput.value = montantTotal.toFixed(); 
    });
});