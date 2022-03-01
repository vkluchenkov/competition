/** @jsxImportSource @emotion/react */
import React, { useCallback, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormFields, Registration } from './types';
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
import { OrderFestival } from "../../pages/Order/types";
import { useMutation } from "react-query";
import { setOrder } from "../../api";

interface ContestFormProps {
  open: boolean;
  onClose: () => void;
  ageGroup: string | undefined;
  registration: Registration | null;
  orderFestival: OrderFestival | null;
  festivalId: number;
};

export const ContestForm: React.FC<ContestFormProps> = ({ open, onClose, ageGroup, registration, orderFestival, festivalId }) => {

  // Hooks
  const { t } = useTranslation();
  const { control, watch, handleSubmit, setValue } = useFormContext<FormFields>();

  const SubmitMutation = useMutation<string, any, any, any>(setOrder);

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

  const [isSoloPass, setIsSoloPass] = useState(() => (registration?.isSoloPass || orderFestival?.isSoloPass))

  const [isFullPass, setIsFullPass] = useState(() => (registration?.isFullPass || orderFestival?.isFullPass))

  // States
  const selected = watch("contest").filter((cats) => cats.selected);

  // Handlers
  const handleSoloPass = (event: React.ChangeEvent<HTMLInputElement>) => setIsSoloPass(event.target.checked)

  const handleChange = (catId: number, event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const catIndex = watchContest.findIndex((cat: any) => cat.id === catId);
    setValue(`contest.${catIndex}.selected`, checked);
  }

  const onSubmit = handleSubmit(async () => {
    const contest = () => selected ? selected.map((category) => category.id) : []

    const submitPayload = {
      contest: contest(),
      isSoloPass,
      festivalId
    }

    await SubmitMutation.mutateAsync(submitPayload);
    onClose()
  })

  // Calculations
  const soloPassPrice = useCallback(() => {
    if (registration?.isSoloPass) {
      return 0
    }
    if (isFullPass) {
      return 80
    }
    return 100
  }, [registration, isFullPass])

  const total = useMemo(() => {
    if (isSoloPass) {
      return soloPassPrice()
    } else
      if (!selected) {
        return 0
      }
    return selected.reduce(((prev, current) => {
      if (isFullPass) {
        return prev + current.priceFullPass
      }
      return prev + current.price
    }), 0)
  }, [selected, isSoloPass, isFullPass, soloPassPrice])

  // Categories mapping
  const categories = controlledFields.map((cat) => {
    const price = () => {
      if (isSoloPass) {
        return null;
      }
      if (isFullPass) {
        return cat.priceFullPass
      }
      return cat.price
    };

    const titlePrice = () => {
      if (price()) {
        return ` €${price()}`
      }
    }

    const subtitle = () => {
      const myPrice = price();
      if (myPrice && isFullPass) {
        return (
          <Typography variant="body2">
            free with Solo Pass
          </Typography>
        )
      }
      if (myPrice) {
        return (
          <>
            <Typography variant="body2">
              €{cat.priceFullPass} with Full Pass
            </Typography>
            <Typography variant="body2">
              free with Solo Pass
            </Typography>
          </>
        )
      }
      return null
    };

    return (
      <FormControlLabel
        key={"category" + cat.id}
        sx={styles.checkboxItem}
        control={
          <InputCheckbox
            onChange={handleChange.bind(null, cat.id)}
            checked={cat.selected}
            disabled={cat.disabled}
          />
        }
        label={
          <>
            <Typography variant="body1"><strong>{cat.title}</strong>{titlePrice()}</Typography>
            {subtitle()}
          </>
        } />
    )
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Competition sign up for {ageGroup}</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Solo pass gives you the right to dance unlimited times in all solo categories, except live tabla solo. With Solo Pass you save if dance more than 2 times.
        </DialogContentText>
        <DialogContentText variant="body2">
          <strong>Tip:</strong> Get Full Pass to get access to all the workshops and enjoy discounts on competition as well!
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
                  checked={isSoloPass}
                  disabled={registration?.isSoloPass}
                />
              }
              label={
                <Typography variant="body1">
                  I want to take Solo Pass {soloPassPrice() > 0 ? `€${soloPassPrice()}` : ""}
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