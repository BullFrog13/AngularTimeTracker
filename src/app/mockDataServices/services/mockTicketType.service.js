import json from '../../../assets/mockData/ticketTypes';

export default class MockTicketTypeService {

    getTicketTypes() {
        return json.TicketTypes;
    }
}