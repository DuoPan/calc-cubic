import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {TArray, TBool} from 'Lib/Core/prop_types';

const useStyles = makeStyles((theme) => ({
  side: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    boxShadow: theme.design.boxShadow,
  },
  detail: {
    marginBottom: 8,
  },
  subTitle: {
    marginBottom: 10,
  },
}));

function FetchingHistory({
  urls,
  isDisplay,
}) {
  const classes = useStyles();

  if (urls.length === 0 || !isDisplay) {
    return (<div/>);
  }
  return (
    <div className={classes.side}>
      <Typography variant={'h6'} className={classes.subTitle}>Fetching History</Typography>
      {urls.map((item, index) => {
        return (<Typography key={`f_${index}`} className={classes.detail}>{index + 1}. Fetching from {item}</Typography>)
      })}
    </div>
  );
}

FetchingHistory.propTypes = {
  urls: TArray.isRequired,
  isDisplay: TBool.isRequired,
};

export default FetchingHistory;
