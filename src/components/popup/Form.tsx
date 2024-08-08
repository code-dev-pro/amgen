import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidateButton } from '../buttons/ValidateButton';
import { STORAGE_KEYS } from '../../utils/variables';

const schema = z.object({
  contentPreference: z.string().min(1, { message: 'Ce champ est requis' }),
  firstName: z.string().min(1, { message: 'Ce champ est requis' }),
  lastName: z.string().min(1, { message: 'Ce champ est requis' }),
  postalCode: z.string().min(1, { message: 'Ce champ est requis' }),
  job: z.string().min(1, { message: 'Ce champ est requis' }),
  email: z.string().min(1, { message: 'Ce champ est requis' }),
  rpps: z.string().min(1, { message: 'Ce champ est requis' }),
  address: z.string().min(1, { message: 'Ce champ est requis' }),
  city: z.string().min(1, { message: 'Ce champ est requis' }),
  phone: z.string().min(1, { message: 'Ce champ est requis' }),
});

type FormData = z.infer<typeof schema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const storedData = localStorage.getItem(STORAGE_KEYS.FORM_DATA);
    const formDataList = storedData ? JSON.parse(storedData) : [];
    formDataList.push(data);
    localStorage.setItem('formDataList', JSON.stringify(formDataList));
    reset();
  };

  return (
    <form className="text-base text-black px-6 pt-4" onSubmit={handleSubmit(onSubmit)}>
      <p className="font-bold">Formulaire de demande d'information médicale :</p>
      <p>Quelle est votre demande d'information médicale ?</p>

      <textarea
        className="w-full h-[100px] mt-2 p-2 text-sm"
        placeholder="Tapez ici..."
        {...register('contentPreference')}
      />
      {errors.contentPreference && <span className="text-xs text-accent-red">{errors.contentPreference.message}</span>}

      <p>Quelles sont vos coordonnées ?</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            placeholder="Prénom"
            {...register('firstName')}
          />
          {errors.firstName && <span className="text-xs text-accent-red">{errors.firstName.message}</span>}

          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="Nom" {...register('lastName')} />
          {errors.lastName && <span className="text-xs text-accent-red">{errors.lastName.message}</span>}

          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            placeholder="Code postal"
            {...register('postalCode')}
          />
          {errors.postalCode && <span className="text-xs text-accent-red">{errors.postalCode.message}</span>}

          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            placeholder="Profession"
            {...register('job')}
          />
          {errors.job && <span className="text-xs text-accent-red">{errors.job.message}</span>}

          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="Email" {...register('email')} />
          {errors.email && <span className="text-xs text-accent-red">{errors.email.message}</span>}
        </div>

        <div>
          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="RPPS" {...register('rpps')} />
          {errors.rpps && <span className="text-xs text-accent-red">{errors.rpps.message}</span>}

          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            placeholder="Adresse professionnelle"
            {...register('address')}
          />
          {errors.address && <span className="text-xs text-accent-red">{errors.address.message}</span>}

          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="Ville" {...register('city')} />
          {errors.city && <span className="text-xs text-accent-red">{errors.city.message}</span>}

          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="Nº tel" {...register('phone')} />
          {errors.phone && <span className="text-xs text-accent-red">{errors.phone.message}</span>}
        </div>
      </div>

      <p className="text-[0.5rem] leading-3 my-4">
        Les données vous concernant telles que vos nom, coordonnées sont conservées par notre département « information
        médicale » afin de pouvoir répondre et suivre les demandes et d'accomplir les activités professionnelles et
        scientifiques d'Amgen ainsi que les obligations légales d'Amgen. Ces informations pourront être transférées dans
        le but d'être analysées et conservées au sein du Groupe Amgen, dont la maison mère est installée aux Etats-Unis,
        ainsi qu'à des sociétés travaillant pour son compte, notamment en Inde et aux Philippines. Les transferts de
        données au sein des entités du groupe Amgen sont réalisés en conformité avec les législations applicables ainsi
        que nos règles contraignantes d'entreprise (BCR). Pour en savoir plus sur nos BCR, merci de consulter
        <a href="http://www.amgen.com/bcr/" target="_blank">
          http://www.amgen.com/bcr/
        </a>
        . Pour demander à accéder, rectifier ou supprimer vos données personnelles ou la portabilité de vos données,
        veuillez contacter votre délégué à al protection des données à l'adresse privacy@amgen.com. Vous pouvez
        également soumettre une plainte auprès de la CNIL. Vous pouvez consulter notre page dédiée à la protection des
        données:{' '}
        <a href="https://www.amgen.fr/politique-de-protection-des-donnees/" target="_blank">
          https://www.amgen.fr/politique-de-protection-des-donnees/
        </a>
      </p>

      <div className="flex justify-center">
        <ValidateButton
          type="submit"
          text="Valider"
          textColor="text-accent-blue"
          fontSize="text-4xl"
          isAnimated
          isValid={Object.keys(errors).length === 0}
        />
      </div>
    </form>
  );
};
