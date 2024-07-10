import React from 'react';
import { Select, SelectProps, useStyleConfig } from '@chakra-ui/react';

const countries = [
    "Afghanistan", "Albanie", "Algérie", "Andorre", "Angola", "Antigua-et-Barbuda", "Argentine", "Arménie",
    "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Bélarus",
    "Belgique", "Belize", "Bénin", "Bhoutan", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil",
    "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodge", "Cameroun", "Canada",
    "République centrafricaine", "Tchad", "Chili", "Chine", "Colombie", "Comores", "Congo (Congo-Brazzaville)",
    "Costa Rica", "Croatie", "Cuba", "Chypre", "Tchéquie (République tchèque)", "Danemark", "Djibouti", "Dominique",
    "République dominicaine", "Équateur", "Égypte", "El Salvador", "Guinée équatoriale", "Érythrée", "Estonie",
    "Eswatini (anciennement Swaziland)", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie",
    "Allemagne", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée-Bissau", "Guyana", "Haïti",
    "Honduras", "Hongrie", "Islande", "Inde", "Indonésie", "Iran", "Irak", "Irlande", "Israël", "Italie",
    "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kiribati", "Koweït", "Kirghizistan", "Laos",
    "Lettonie", "Liban", "Lesotho", "Libéria", "Libye", "Liechtenstein", "Lituanie", "Luxembourg",
    "Madagascar", "Malawi", "Malaisie", "Maldives", "Mali", "Malte", "Îles Marshall", "Mauritanie",
    "Maurice", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Maroc",
    "Mozambique", "Myanmar (anciennement Birmanie)", "Namibie", "Nauru", "Népal", "Pays-Bas", "Nouvelle-Zélande",
    "Nicaragua", "Niger", "Nigéria", "Corée du Nord", "Macédoine du Nord", "Norvège", "Oman", "Pakistan",
    "Palaos", "État de Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pérou", "Philippines", "Pologne",
    "Portugal", "Qatar", "Roumanie", "Russie", "Rwanda", "Saint-Kitts-et-Nevis", "Sainte-Lucie",
    "Saint-Vincent-et-les-Grenadines", "Samoa", "Saint-Marin", "Sao Tomé-et-Principe", "Arabie saoudite",
    "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Îles Salomon",
    "Somalie", "Afrique du Sud", "Corée du Sud", "Soudan du Sud", "Espagne", "Sri Lanka", "Soudan", "Suriname",
    "Suède", "Suisse", "Syrie", "Taïwan", "Tadjikistan", "Tanzanie", "Thaïlande", "Timor-Leste",
    "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turquie", "Turkménistan", "Tuvalu", "Ouganda",
    "Ukraine", "Émirats arabes unis", "Royaume-Uni", "États-Unis d'Amérique", "Uruguay",
    "Ouzbékistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Yémen", "Zambie", "Zimbabwe"
];

const CountriesDropdown: React.FC<SelectProps> = (props) => {
    const styles = useStyleConfig("CustomInput");
    const filledStyles = props.value ? {
        borderColor: 'yellow.500',
        color: 'yellow.500',
        boxShadow: '0 0 0 1px yellow.500',
    } : {};

    return (
        <Select
            sx={{
                ...styles,
                ...filledStyles,
            }}
            {...props}
        >
            <option value="">Veuillez sélectionner</option>
            {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
            ))}
        </Select>
    );
};

export default CountriesDropdown;
