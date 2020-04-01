import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
import Challenge from './Challenge';
import {products, TProducts} from 'Logic/redux/state/products_load';
import FetchingHistory from './FetchingHistory';
import ItemList from './ItemList';
import {TFunction} from 'Lib/Core/prop_types';

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
    marginBottom: 10,
  },
  result: {
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 20,
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
  const [average, setAverage] = useState(0);

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
        setAverage(objects.length > 0 ? sum / objects.length : 0);
      }
    },
    [
      products.next,
      setAverage,
      objects,
    ]
  );

  function computeSingleWeight(items) {
    return items.size.width * items.size.height * items.size.length * WEIGHT_FACTOR / 1000;
  }

  function resetAll() {
    setUrls([FIRST_URL]);
    setObjects([]);
    setAverage(0);
    setHasRun(false);
  }

  function solve() {
    // resetAll();
    loadProducts({pageUrl: FIRST_URL});
    setHasRun(true);
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
        disabled={hasRun}
      >
        Run
      </Button>
      <div className={classes.body}>
        <FetchingHistory isDisplay={hasRun} urls={urls}/>
        <ItemList items={objects}/>
      </div>
      {average > 0 && (<Typography className={classes.result} variant={'h5'}>Average Weight: {average.toFixed(0)}g</Typography>)}
      {average > 0 && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<RotateLeftIcon />}
          onClick={resetAll}
        >
          Reset
        </Button>
      )}
    </div>
  );
}

HomePage.propTypes = {
  loadProducts: TFunction.isRequired,
  products: TProducts.isRequired,
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
