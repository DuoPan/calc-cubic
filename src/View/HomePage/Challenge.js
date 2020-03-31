import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {WEIGHT_FACTOR, CATEGORY} from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'center',
    marginTop: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  left: {
    minWidth: 150,
    flexGrow: 1,
  },
  highLight: {
    color: theme.design.highLight,
  }
}));

function Challenge() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant={'h5'} className={classes.title}>Challenge Description</Typography>
      <Typography variant={'body1'}>Using the provided (paginated) API, find the average cubic weight for all products in the <span style={{fontWeight: 'bold'}}>"{CATEGORY}"</span> category.</Typography>
      <div className={classes.row}>
        <Typography variant={'body1'} className={classes.left}>Conversion factor</Typography>
        <Typography variant={'body1'} className={classes.highLight}>{WEIGHT_FACTOR}</Typography>
      </div>
      <div className={classes.row}>
        <Typography variant={'body1'} className={classes.left}>API Endpoint</Typography>
        <Typography variant={'body1'} className={classes.highLight}>http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1</Typography>
      </div>
    </div>
  );
}

Challenge.propTypes = {
};

export default Challenge;
