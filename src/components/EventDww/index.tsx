/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AgeGroup } from "./AgeGroup";
import { DwwEvents } from "./DwwEvents"
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import { workshopsList } from "./workshopsList";
import { FormFields } from './types';
import { ActiveUser, useUser } from "../../store/User";
import { User } from "../../models/user";
import avatar from "../../images/media.webp";

// Мок юзера
const userData: User = {
  firstName: "Ivan",
  lastName: "Ivanov",
  email: "user@example.com",
  id: "1",
  birthDate: "2015-12-12",
  avatar: avatar,
}

export const Dww: React.FC = () => {

  const [{ currentUser }, { setActiveUser }] = useUser();

  // Для тестирования ставим сразу активного юзера из мока
  if (!currentUser) {
    setActiveUser(userData)
  }

  const eventDate = "2022-08-18"

  const methods = useForm<FormFields>({
    defaultValues: {
      workshops: workshopsList.map((ws) => ({ ...ws, selected: false })),
    }
  });
  const { handleSubmit, control, reset, setError, formState: { errors }, watch } = methods;
  const { t } = useTranslation();

  const ageGroup = useMemo(() => AgeGroup(eventDate, currentUser?.birthDate), [currentUser?.birthDate])

  return (
    <FormProvider {...methods}>
      <DwwEvents
        ageGroup={ageGroup} />
    </FormProvider>
  );
};
