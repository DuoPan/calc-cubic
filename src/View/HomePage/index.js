import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';
import Challenge from './Challenge';
import {products} from 'Logic/redux/state/products_load';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
    marginRight: '10%',
  },
  body: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  button: {
    maxWidth: 120,
    alignSelf: 'center',
    marginTop: 50,
  },
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
  result: {
    textAlign: 'center',
    marginTop: 50,
  }
}));

export const CATEGORY = 'Air Conditioners';
const FIRST_URL = '/api/products/1';
export const WEIGHT_FACTOR = 250;

function HomePage({
  loadProducts,
  products
}) {
  const classes = useStyles();
  const [urls, setUrls] = useState([FIRST_URL]);
  const [objects, setObjects] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  const [total, setTotal] = useState(0);

  const addAirConditioners = useCallback(
    (items) => {
      if (items.length === 0) {
        return;
      }
      items.forEach((item) => {
        if (item.category === CATEGORY) {
          setObjects(objects => [...objects, item]);
        }
      });
    },
    [
      setObjects,
    ]
  );

  useEffect(
    () => {
      if (products.next) {
        // add urls
        setUrls(urls => [...urls, products.next]);
        loadProducts({pageUrl: products.next});

        // add air conditioners
        addAirConditioners(products.objects);
      }
    },
    [
      loadProducts,
      products,
      setUrls,
      addAirConditioners,
    ]
  );

  useEffect(
    () => {
      // finish search, now calculate
      if (products.next === null) {
        let sum = 0;
        for (let i = 0; i < objects.length; ++ i) {
          sum += computeSingleWeight(objects[i]);
        }
        setTotal(sum);
      }
    },
    [
      products.next,
      setTotal,
      objects,
    ]
  );

  function computeSingleWeight(items) {
    return items.size.width / 100 * items.size.height / 100 * items.size.length / 100 * WEIGHT_FACTOR * 1000
  }

  function resetAll() {
    setUrls([FIRST_URL]);
    setObjects([]);
  }

  function solve() {
    resetAll();
    loadProducts({pageUrl: FIRST_URL});
    setHasRun(true);
  }

  function renderFetchingHistory(histories) {
    if (histories.length === 0 || !hasRun) { // can never be 0 here
      return (<div/>);
    }
    return (
      <div className={classes.side}>
        <Typography variant={'h6'} className={classes.subTitle}>Fetching History</Typography>
        {histories.map((item, index) => {
          return (<Typography key={`f_${index}`} className={classes.detail}>{index + 1}. Fetching from {item}</Typography>)
        })}
      </div>
    );
  }

  function renderObjectItems(items) {
    if (items.length === 0) {
      return (<div/>);
    }
    return (
      <div className={classes.side}>
        <Typography variant={'h6'} className={classes.subTitle}>Air Conditioners</Typography>
        {(items.length > 0) &&
        items.map((item, index) => {
          return (
            <div key={`o_${index}`} className={classes.detail}>
              <Typography>{index + 1}. {item.title}</Typography>
              <Typography>{JSON.stringify(item.size)}</Typography>
            </div>
          )})}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Challenge/>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<PlayArrowIcon />}
        onClick={solve}
      >
        Run
      </Button>
      <div className={classes.body}>
        {renderFetchingHistory(urls)}
        {renderObjectItems(objects)}
      </div>
      {total > 0 && (<Typography className={classes.result} variant={'h5'}>{total}</Typography>)}
    </div>
  );
}

HomePage.propTypes = {
};

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = {
  loadProducts: products.load,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
