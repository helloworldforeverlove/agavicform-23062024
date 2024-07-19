import React, { useState } from 'react';

interface FormData {
  civility: string;
  lastName: string;
  firstName: string;
  phone: string;
  profession: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  isPoliticallyExposed: string;
  isUSPerson: string;
}

const InvestorProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    civility: 'Monsieur',
    lastName: '',
    firstName: '',
    phone: '',
    profession: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    isPoliticallyExposed: 'Non',
    isUSPerson: 'Non',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Civilité:
          <input
            type="radio"
            name="civility"
            value="Madame"
            checked={formData.civility === 'Madame'}
            onChange={handleChange}
          /> Madame
          <input
            type="radio"
            name="civility"
            value="Monsieur"
            checked={formData.civility === 'Monsieur'}
            onChange={handleChange}
          /> Monsieur
        </label>
      </div>
      <div>
        <label>Nom:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Prénom:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Téléphone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Profession:
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Votre adresse:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Code Postal:
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Ville:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Pays:
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner</option>
            <option value="France">France</option>
            <option value="Belgium">Belgique</option>
            <option value="Switzerland">Suisse</option>
            <option value="Luxembourg">Luxembourg</option>
            {/* Add other options as needed */}
          </select>
        </label>
      </div>
      <div>
        <label>Vous ou un membre de votre famille est une Personne Politiquement exposée?
          <input
            type="radio"
            name="isPoliticallyExposed"
            value="Non"
            checked={formData.isPoliticallyExposed === 'Non'}
            onChange={handleChange}
          /> Non
          <input
            type="radio"
            name="isPoliticallyExposed"
            value="Oui"
            checked={formData.isPoliticallyExposed === 'Oui'}
            onChange={handleChange}
          /> Oui
        </label>
      </div>
      <div>
        <label>Avez-vous la nationalité américaine, êtes vous détenteur de la carte verte ou êtes vous une US person au sens de la résidence fiscale?
          <input
            type="radio"
            name="isUSPerson"
            value="Non"
            checked={formData.isUSPerson === 'Non'}
            onChange={handleChange}
          /> Non
          <input
            type="radio"
            name="isUSPerson"
            value="Oui"
            checked={formData.isUSPerson === 'Oui'}
            onChange={handleChange}
          /> Oui
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InvestorProfileForm;
