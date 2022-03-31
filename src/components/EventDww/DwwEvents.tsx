import { ListItemText, Button, List, ListItem, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WorkshopsForm } from "./WorkshopsForm";
import { styles } from "./styles";
import { ContestForm } from "./ContestForm";
import { Registration } from "./types";
import { OrderFestival } from "../../pages/Order/types";
import { useNavigate } from "react-router-dom";

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

  const [isActiveOrder, setIsActiveOrder] = useState(false);
  const handleActiveOrder = (value: boolean) => setIsActiveOrder(!!value)

  useEffect(() => {
    if (orderFestival) setIsActiveOrder(true)
  }, [orderFestival])

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
          festivalId={festivalId}
          registration={registration}
          orderFestival={orderFestival}
          activeOrderHandler={handleActiveOrder}
        />

        <ContestForm
          open={contestOpen}
          onClose={handleContestClose}
          ageGroup={ageGroup}
          registration={registration}
          orderFestival={orderFestival}
          festivalId={festivalId}
        />
      </Box>
      {orderButton()}
    </>
  )
}