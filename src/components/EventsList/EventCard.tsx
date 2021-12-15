import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { styles } from "./styles"
import clsx from "clsx";

interface EventCardProps {
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  img: string;
  past?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ id, title, type, startDate, endDate, location, description, img, past }) => {

  return (

    <Card sx={styles.card}>
      <CardMedia
        component="img"
        height="230"
        image={img}
        alt={title}
        sx={styles.past}
        className={clsx({ past })}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <strong>Type:</strong> {type}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <strong>Dates:</strong> {DateTime.fromISO(startDate).toFormat("dd.LL.y")}-{DateTime.fromISO(endDate).toFormat("dd.LL.y")}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <strong>Location:</strong> {location}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to="/festivals/danceweekend"
          size="small"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}