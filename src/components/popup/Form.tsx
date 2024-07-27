import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidateButton } from '../buttons/ValidateButton';
import { CustomCheckbox } from '../Checkbox';
import { STORAGE_KEYS } from '../../utils/variables';

const schema = z.object({
  contentPreference: z.string().min(1, { message: 'Ce champ est requis' }),
  firstName: z.string().min(1, { message: 'Ce champ est requis' }),
  lastName: z.string().min(1, { message: 'Ce champ est requis' }),
  job: z.string().min(1, { message: 'Ce champ est requis' }),
  rpps: z.string().min(1, { message: 'Ce champ est requis' }),
  address: z.string().min(1, { message: 'Ce champ est requis' }),
  phone: z.string().min(1, { message: 'Ce champ est requis' }),
  acceptTerms: z.boolean().refine((value) => value === true, { message: 'Vous devez accepter les conditions' }),
});

type FormData = z.infer<typeof schema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    const storedData = localStorage.getItem(STORAGE_KEYS.FORM_DATA);
    const formDataList = storedData ? JSON.parse(storedData) : [];
    formDataList.push(data);
    localStorage.setItem('formDataList', JSON.stringify(formDataList));
    reset();
  };

  return (
    <form className="text-base text-black px-6 pt-8" onSubmit={handleSubmit(onSubmit)}>
      <p>Bonjour,</p>
      <p>
        Quel(s) type(s) de contenus souhaiteriez-vous recevoir ? (Publications scientifiques, mécanismes d’action, etc.)
      </p>

      <textarea
        className="w-full h-[140px] mt-2 p-2 text-sm"
        placeholder="Tapez ici..."
        {...register('contentPreference')}
      />
      {errors.contentPreference && <span className="text-accent-red">{errors.contentPreference.message}</span>}

      <p>Quelles sont vos coordonnées ?</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            placeholder="Prénom"
            {...register('firstName')}
          />
          {errors.firstName && <span className="text-accent-red">{errors.firstName.message}</span>}

          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="Nom" {...register('lastName')} />
          {errors.lastName && <span className="text-accent-red">{errors.lastName.message}</span>}

          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            placeholder="Profession"
            {...register('job')}
          />
          {errors.job && <span className="text-accent-red">{errors.job.message}</span>}
        </div>

        <div>
          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="RPPS" {...register('rpps')} />
          {errors.rpps && <span className="text-accent-red">{errors.rpps.message}</span>}

          <input
            className="w-full h-[27px] mt-2 p-2 text-sm"
            type="text"
            placeholder="Adresse"
            {...register('address')}
          />
          {errors.address && <span className="text-accent-red">{errors.address.message}</span>}

          <input className="w-full h-[27px] mt-2 p-2 text-sm" type="text" placeholder="Nº tel" {...register('phone')} />
          {errors.phone && <span className="text-accent-red">{errors.phone.message}</span>}
        </div>

        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <CustomCheckbox
              id="accept-terms"
              label="J’accepte de recevoir des communications AMGEN"
              checked={field.value}
              onChange={(checked) => field.onChange(checked)}
              labelColor="black"
              shape="round"
            />
          )}
        />
        {errors.acceptTerms && <span className="text-accent-red">{errors.acceptTerms.message}</span>}
      </div>

      <div className="flex justify-center mt-10">
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
