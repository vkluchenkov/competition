import { ListItemText, Button, List, ListItem, Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WorkshopsForm } from "./WorkshopsForm";
import { styles } from "./styles";
import { ContestForm } from "./ContestForm";
import { Registration } from "./types";
import { OrderFestival } from "../../pages/Order/types";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { FormFields } from './types';
import { useMutation } from "react-query";
import { register } from "../../api";
import { debounce } from 'lodash'

interface DwwEventsProps {
  ageGroup?: string | undefined;
  festivalId: number;
  registration: Registration | null;
  orderFestival: OrderFestival | null;
}

export const DwwEvents: React.FC<DwwEventsProps> = ({ ageGroup, festivalId, registration, orderFestival }) => {
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [wsOpen, setWsOpen] = useState(false);
  const handleWsOpen = () => setWsOpen(true);
  const handleWsClose = () => setWsOpen(false);

  const [contestOpen, setContestOpen] = useState(false);
  const handleContestOpen = () => setContestOpen(true);
  const handleContestClose = () => setContestOpen(false);

  const { watch, handleSubmit, formState, setValue } = useFormContext<FormFields>();
  const SubmitMutation = useMutation<any, any, any, any>(register);

  const [confirmationActive, setConfirmationActive] = useState(false);


  const [isActiveOrder, setIsActiveOrder] = useState(false);

  const selectedWs = watch("workshops").filter((ws) => ws.selected)
  const selectedContest = watch("contest").filter((cat) => cat.selected);
  const isSoloPass = watch("isSoloPass");
  const isFullPass = watch("isFullPass")

  useEffect(() => {
    if (orderFestival) setIsActiveOrder(true)
  }, [orderFestival])

  useEffect(() => {
    if (SubmitMutation.data) setIsActiveOrder(SubmitMutation.data.isActiveOrder)
  }, [SubmitMutation.data])

  useEffect(() => {
    if (
      formState.touchedFields.workshops ||
      formState.touchedFields.isFullPass ||
      formState.touchedFields.contest ||
      formState.touchedFields.isSoloPass
    ) {
      console.log("submit")
      debouncedSubmit()
    }
  }, [selectedWs.length, selectedContest.length, formState, isFullPass, isSoloPass])

  const onSubmit = useCallback(async () => {
    handleSubmit(async () => {
      const contest = selectedContest ? selectedContest.map((category) => category.id) : []
      const workshops = selectedWs ? selectedWs.map((ws) => ws.id) : []

      const submitPayload = {
        workshops,
        contest,
        isFullPass,
        isSoloPass,
        festivalId
      }
      await SubmitMutation.mutateAsync(submitPayload);
    })();
  }, [selectedContest, selectedWs, isSoloPass, isFullPass])

  const debouncedSubmit = useCallback(debounce(() => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    onSubmit()
      .then(() => {
        setConfirmationActive(true)
        delay(1500)
          .then(() => setConfirmationActive(false))
      }
      )
  }, 1000), [onSubmit]);

  const orderButton = () => {
    if (isActiveOrder) {
      return (
        <Button
          sx={{
            mt: 3,
            mb: 2,
          }}
          variant="contained"
          size="large"
          disableElevation
          onClick={() => navigate('/my-order')}
        >
          View my order
        </Button>
      )
    }
  }

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        <List>

          <ListItem divider>
            <ListItemText
              primary={t('Dww.workshops')}
              secondary={t('Dww.eventsList.wsSecondary')}
            />
            <Button variant="outlined" onClick={handleWsOpen} sx={styles.listButton}>
              {t('Dww.eventsList.checkIn')}
            </Button>
          </ListItem>

          <ListItem divider>
            <ListItemText
              primary={t('Dww.competition')}
              secondary={t('Dww.eventsList.competitionSecondary')}
            />
            <Button onClick={handleContestOpen} variant="outlined" sx={styles.listButton}>
              {t('Dww.eventsList.checkIn')}
            </Button>
          </ListItem>

          <ListItem>
            <ListItemText
              primary={t('Dww.worldShow')}
              secondary={t('Dww.eventsList.showSecondary')}
            />
            <Button variant="outlined" sx={styles.listButton}>
              {t('Dww.eventsList.checkIn')}
            </Button>
          </ListItem>
        </List>

        <WorkshopsForm
          open={wsOpen}
          onClose={handleWsClose}
          ageGroup={ageGroup}
          registration={registration}
          orderFestival={orderFestival}
          confirmationActive={confirmationActive}
        />

        <ContestForm
          open={contestOpen}
          onClose={handleContestClose}
          ageGroup={ageGroup}
          registration={registration}
          confirmationActive={confirmationActive}
        />
      </Box>
      {orderButton()}
    </>
  )
}