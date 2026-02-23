import { ResponseCategorie } from "./response-categorie";

export interface ResponseProduit {
    id: number;
    libelle: string;
    prixVente: number;
    prixAchat: number;
    quantite: number;
    codeBar: string;
    categorie: ResponseCategorie;
}
