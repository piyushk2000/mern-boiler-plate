import React from "react";
import "./swipeButton.css";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";


function SwipeButton(){
  return (
    <div className="swipeButton">
      <IconButton>
        <ReplayIcon fontSize='large' className="replay_button"/>
      </IconButton>
      <IconButton>
        <CloseIcon fontSize='large' className="close_button"/>
      </IconButton>
      <IconButton>
        <StarRateIcon fontSize='large' className="star_button"/>
      </IconButton>
      <IconButton>
        <FavoriteIcon fontSize='large' className="favourite_button"/>
      </IconButton>
    </div>
  )
}

export default SwipeButton;