import { useState } from 'react';

import { ValidateButton } from '../buttons/ValidateButton';
import { CustomCheckbox } from '../Checkbox';

export const Form = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form submitted');
  };

  return (
    <form className="text-base text-black px-6 pt-8" onSubmit={handleSubmit}>
      <p>Bonjour,</p>
      <p>
        Quel(s) type(s) de contenus souhaiteriez-vous recevoir ? (Publications scientifiques, mécanismes d’action, etc.)
      </p>

      <textarea className="w-full h-[140px] mt-2 p-2 text-sm" placeholder="Tapez ici..." />

      <p>Quelles sont vos coordonnées ?</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="sr-only">
            Prénom
          </label>
          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Prénom"
          />

          <label htmlFor="lastName" className="sr-only">
            Nom
          </label>
          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Nom"
          />

          <label htmlFor="job" className="sr-only">
            Profession
          </label>
          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            id="job"
            name="job"
            placeholder="Profession"
          />
        </div>

        <div>
          <label htmlFor="rpps" className="sr-only">
            RPPS
          </label>
          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" id="rpps" name="rpps" placeholder="RPPS" />

          <label htmlFor="address" className="sr-only">
            Adresse
          </label>
          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            id="address"
            name="address"
            placeholder="Adresse"
          />
          <label htmlFor="phone" className="sr-only">
            Téléphone
          </label>
          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            id="phone"
            name="phone"
            placeholder="Nº tel"
          />
        </div>
        <CustomCheckbox
          id="customCheckbox"
          label="J’accepte de recevoir des communications AMGEN"
          checked={isChecked}
          onChange={handleCheckboxChange}
          shape="round"
        />
      </div>

      <div className="flex justify-center mt-10">
        <ValidateButton type="submit" isDisabled={!isChecked} textColor="text-accent-blue" fontSize="text-4xl" />
      </div>
    </form>
  );
};
