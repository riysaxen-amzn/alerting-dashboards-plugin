import { getDataSourceEnabled, getDataSource } from '../../services/services';
import _ from 'lodash';
import queryString from 'query-string';

export function createQueryObjectFromContext(landingDataSourceId) {
  const dataSourceEnabled = getDataSourceEnabled().enabled === true;

  // Only include query object if data source is enabled and landingDataSourceId is not undefined
  return dataSourceEnabled && landingDataSourceId !== undefined
    ? { dataSourceId: landingDataSourceId }
    : undefined;
}

export function createQueryObject() {
  const dataSourceEnabled = getDataSourceEnabled().enabled === true;
  const landingDataSourceId = getDataSource().dataSourceId;

  // Only include query object if data source is enabled and landingDataSourceId is not undefined
  return dataSourceEnabled && landingDataSourceId !== undefined
    ? { dataSourceId: landingDataSourceId }
    : undefined;
}

export function isDataSourceChanged(prevProps, currProps) {
  return (
    getDataSourceEnabled().enabled &&
    !_.isEqual(prevProps.landingDataSourceId, currProps.landingDataSourceId)
  );
}
