import {put, takeEvery} from 'redux-saga/effects';
import createState from './state';
import callLoadProducts from '../../service/api/method/products_load';
import {transformApiData} from '../transform';
import {
  getApiResponse,
  handleError,
  showLoading,
  hideLoading
} from '../actions';
import TDataStatus from '../data_status';
import {TArray, declareObject, TString} from 'Lib/Core/prop_types';

export const TProducts = declareObject({
  status: TDataStatus.isRequired,
  next: TString,
  objects: TArray,
  errors: TArray,
});

export const productsLoading = 'products.1';

export default createState(
  'products',
  {
    next: null,
    objects: [],
  },
  ({addSaga, reduce, reduceError, reduceReset}) => {
    addSaga(function* () {
      yield takeEvery('LOAD_PRODUCTS', function* (action) {
        try {
          yield put(showLoading(productsLoading));
          const apiData = yield callLoadProducts(action.query.pageUrl);
          yield put(getApiResponse('LOAD_PRODUCTS_R', apiData));
          yield put(hideLoading(productsLoading));
        } catch (e) {
          yield put(handleError('LOAD_PRODUCTS_F', e));
          yield put(hideLoading(productsLoading));
        }
      });
    });

    reduce('LOAD_PRODUCTS_R', function (state, action) {
      let data = Object.assign({}, state);
      const apiData = transformApiData(action);
      data.next = apiData.data.next;
      data.objects = apiData.data.objects;
      return data;
    });

    reduceError('LOAD_PRODUCTS_F');
    reduceReset('LOAD_PRODUCTS_RESET');
  }
);

export const products = {
  load: (query) => ({type: 'LOAD_PRODUCTS', query}),
  reset: () => ({type: 'LOAD_PRODUCTS_RESET'})
};
