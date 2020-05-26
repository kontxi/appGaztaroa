import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';

import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import {favoritos} from './favoritos';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            excursiones,
            comentarios,
            cabeceras,
            actividades,
            favoritos
        }),
        applyMiddleware(thunk, logger)
    );

    return store;


}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, excursiones, comentarios, cabeceras, actividades)

export default () => {
  let store1 = createStore(persistedReducer)
  let persistor = persistStore(store1)
  return { store1, persistor }
}
