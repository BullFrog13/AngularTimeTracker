import json from '../../../assets/mockData/ticketStatuses';

export default class MockTicketStatusService {
    getTicketStatuses() {
        return json.TicketStatuses;
    }
}