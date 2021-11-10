import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  video: {
    width: '100%',
    border: 0,
    padding: 0,
    verticalAlign: 'baseline',
  },

  video_media: {
    cursor: 'pointer',
    position: 'relative',
    margin: '0 0 10px',
    padding: 0,
    verticalAlign: 'baseline',
  },

  video_img: {
    width: '100%',
    borderRadius: '5px',
  },
  video_time: {
    padding: '5px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '5px',
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    fontSize: '14px',
    lineHeight: 1,
  },
  video_actions: {
    position: 'absolute',
    top: '3px',
    right: '3px',
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
    transition: 'opacity .5s',
    "&.hovered": {
      opacity: 1,
    },
  },
  video_action: {
    backgroundColor: 'black',
    color: 'white',
    width: '30px',
    height: '30px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '5px',
    transition: 'background-color .3s',
    "&:hover" : {
      backgroundColor: '#404241',
    }
  },
  video_description: {
    display: 'flex',
  },
  video_avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: '50%',
    border: '1px solid blue',
    width: '30px',
    height: '30px',
    marginRight: '15px',
  },
  video_title: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1,
    margin: '0 0 10px',
  },
  video_channel: {
    color: 'grey',
    margin: '0 0 3px',
    lineHeight: 1,
  },
  video_meta: {
    color: 'grey',
    margin: 0,
    lineHeight: 1,
  },
})