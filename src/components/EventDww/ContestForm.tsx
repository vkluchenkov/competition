/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormFields } from './types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Box,
  Typography,
  FormGroup,
} from "@mui/material";
import { styles } from "./styles"
import { useTranslation } from "react-i18next";
import { InputCheckbox } from "../../ui-kit/input";

interface ContestFormProps {
  open: boolean;
  onClose: () => void;
  ageGroup: string | undefined;
  festivalId: number;
  isFullPass: boolean;
};

export const ContestForm: React.FC<ContestFormProps> = ({ open, onClose, ageGroup, festivalId, isFullPass }) => {

  // Hooks
  const { t } = useTranslation();
  const { control, watch, handleSubmit, setValue } = useFormContext<FormFields>();

  const { fields } = useFieldArray({
    control,
    name: "contest",
  });

  const watchContest = watch("contest");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchContest[index],
    };
  });

  console.log(fields)

  const [soloPass, setSoloPass] = useState(false)

  // States
  const selected = watch("contest").filter((cats) => cats.selected);

  // Handlers
  const handleSoloPass = (event: React.ChangeEvent<HTMLInputElement>) => setSoloPass(event.target.checked)

  const handleChange = (catId: number, event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const catIndex = watchContest.findIndex((cat: any) => cat.id === catId);
    setValue(`contest.${catIndex}.selected`, checked);
  }

  const onSubmit = () => { }

  // Calculations
  const soloPassPrice = () => {
    if (isFullPass) {
      return 80
    }
    return 100
  }

  const total = useMemo(() => {
    if (soloPass) {
      return soloPassPrice()
    } else
      if (!selected) {
        return 0
      }
    return selected.reduce(((prev, current) => prev + current.price), 0)
  }, [selected])

  // Categories mapping
  const categories = controlledFields.map((cat) => {
    const price = soloPass ? null : cat.price;

    return (
      <FormControlLabel
        key={"category" + cat.id}
        sx={styles.checkboxItem}
        control={
          <InputCheckbox
            onChange={handleChange.bind(null, cat.id)}
            checked={cat.selected}
          />
        }
        label={
          <>
            <Typography variant="body1">
              {cat.title}: {price ? `€${price} (free with Solo Pass)` : "free with Solo Pass"}
            </Typography>
          </>
        } />
    )
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Competition sign up for {ageGroup}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Solo pass gives you the right to dance unlimited times in all solo categories, except live tabla solo. With Solo Pass you save if dance more than 2 times.
        </DialogContentText>
        <Box component="form" sx={{ mt: 2 }}>
          <Typography variant="h6" css={styles.title}>
            Solo Pass selection
          </Typography>
          {/* Выбор Solo pass */}
          <FormControl component="fieldset">

            <FormControlLabel
              sx={styles.checkboxItem}
              control={
                <InputCheckbox
                  onChange={handleSoloPass}
                  checked={soloPass}
                />
              }
              label={
                <Typography variant="body1">
                  I want to take Solo Pass €{soloPassPrice()}
                </Typography>
              } />
          </FormControl>

          <Box>
            <Typography variant="h6" css={styles.title}>
              Solo competition categories
            </Typography>
            <FormControl component="fieldset" variant="standard" sx={{ width: "100%" }}>
              <FormGroup >
                {categories}
              </FormGroup>
            </FormControl>
          </Box>

        </Box>
      </DialogContent>

      <DialogActions sx={styles.bottomBar}>
        <Typography variant="body1" sx={styles.total}>Total: €{total}</Typography>
        <Button onClick={onClose}>{t('Dww.cancelBtn')}</Button>
        <Button
          disabled={!total}
          onClick={onSubmit}
          variant="outlined">
          {t('Dww.submitBtn')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}