import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore, FormData } from '../stores/formStore';

const schema = z.object({
  contentPreference: z.string().min(1, { message: 'Ce champ est requis' }),
  firstName: z.string().min(1, 'Ce champ est requis').max(50, 'Le prénom ne doit pas dépasser 50 caractères.'),
  lastName: z.string().min(1, 'Ce champ est requis').max(50, 'Le nom ne doit pas dépasser 50 caractères.'),
  postalCode: z.string().regex(/^[0-9]{5}$/, 'Le code postal doit être composé de 5 chiffres.'),
  job: z.string().min(1, 'Ce champ est requis').max(100, 'Le champ "Profession" ne doit pas dépasser 100 caractères.'),
  email: z.string().email('Veuillez saisir une adresse e-mail valide.'),
  rpps: z.string().regex(/^[0-9]{11}$/, 'Le RPPS doit être composé de 11 chiffres.'),
  address: z.string().min(1, 'Ce champ est requis').max(200, "L'adresse ne doit pas dépasser 200 caractères."),
  city: z.string().min(1, 'Ce champ est requis').max(100, 'La ville ne doit pas dépasser 100 caractères.'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Le numéro de téléphone doit être composé de 10 chiffres.'),
});

export const useFormLogic = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const addFormData = useFormStore((state) => state.addFormData);

  const onSubmit = (data: FormData) => {
    addFormData(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
