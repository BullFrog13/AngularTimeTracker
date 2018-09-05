import angular from 'angular';

// SERVICES
import MockLevelService from './services/mockLevel.service';
import MockLocationService from './services/mockLocation.service';
import MockProjectPositionService from './services/mockProjectPosition.service';
import MockTicketStatusService from './services/mockTicketStatus.service';
import MockTicketTypeService from './services/mockTicketType.service';

export default angular
    .module('app.mocks', [])
    .service('LevelService', MockLevelService)
    .service('LocationService', MockLocationService)
    .service('ProjectPositionService', MockProjectPositionService)
    .service('TicketStatusService', MockTicketStatusService)
    .service('TicketTypeService', MockTicketTypeService);