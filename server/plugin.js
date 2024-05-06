/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { first } from 'rxjs/operators';
import { createAlertingCluster, createAlertingADCluster } from './clusters';
import {
  AlertService,
  DestinationsService,
  OpensearchService,
  MonitorService,
  AnomalyDetectorService,
  FindingService,
  CrossClusterService,
} from './services';
import {
  alerts,
  destinations,
  opensearch,
  monitors,
  detectors,
  findings,
  crossCluster,
} from '../server/routes';

export class AlertingPlugin {
  constructor(initializerContext) {
    this.logger = initializerContext.logger.get();
    this.globalConfig$ = initializerContext.config.legacy.globalConfig$;
  }

  async setup(core, dependencies) {
    // Get the global configuration settings of the cluster
    const globalConfig = await this.globalConfig$.pipe(first()).toPromise();
    // let dataSource = AlertingSetupDeps.;

    const dataSourceEnabled = !!dependencies.dataSource;

    // Create clusters
    const alertingESClient = createAlertingCluster(
      core,
      globalConfig,
      dataSourceEnabled,
      dependencies.dataSource
    );
    const adESClient = createAlertingADCluster(
      core,
      globalConfig,
      dataSourceEnabled,
      dependencies.dataSource
    );

    // Initialize services
    const alertService = new AlertService(alertingESClient);
    const opensearchService = new OpensearchService(alertingESClient, dataSourceEnabled);
    const monitorService = new MonitorService(alertingESClient, dataSourceEnabled);
    const destinationsService = new DestinationsService(alertingESClient);
    const anomalyDetectorService = new AnomalyDetectorService(adESClient);
    const findingService = new FindingService(alertingESClient);
    const crossClusterService = new CrossClusterService(alertingESClient);
    const services = {
      alertService,
      destinationsService,
      opensearchService,
      monitorService,
      anomalyDetectorService,
      findingService,
      crossClusterService,
    };

    // Create router
    const router = core.http.createRouter();
    // Add server routes
    alerts(services, router);
    destinations(services, router);
    opensearch(services, router, dataSourceEnabled);
    monitors(services, router, dataSourceEnabled);
    detectors(services, router);
    findings(services, router);
    crossCluster(services, router);

    return {};
  }

  async start(core) {
    return {};
  }
}
