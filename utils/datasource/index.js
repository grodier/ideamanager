import datasourceApi from './datasourceApi';
import firebaseDatasource from '../../firebase';

export function customDatasource(datasource) {
  return datasourceApi(datasource);
}

export default customDatasource(firebaseDatasource);
