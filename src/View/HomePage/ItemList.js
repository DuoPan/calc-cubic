import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {TArray} from 'Lib/Core/prop_types';

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
  items,
}) {
  const classes = useStyles();

  if (items.length === 0) {
    return (<div/>);
  }
  return (
    <div className={classes.side}>
      <Typography variant={'h6'} className={classes.subTitle}>Air Conditioners</Typography>
      {(items.length > 0) &&
      items.map((item, index) => {
        // add some ' ', looks better and the string can be wrap in small width device
        let sizeStr = JSON.stringify(item.size);
        sizeStr = sizeStr
          .replace(/,/g,'cm, ')
          .replace(/:/g,': ')
          .replace(/"/g,'')
          .replace('{','')
          .replace('}','cm');
        return (
          <div key={`o_${index}`} className={classes.detail}>
            <Typography>{index + 1}. {item.title}</Typography>
            <Typography>{sizeStr}</Typography>
          </div>
        )})}
    </div>
  );
}

FetchingHistory.propTypes = {
  items: TArray.isRequired,
};

export default FetchingHistory;
