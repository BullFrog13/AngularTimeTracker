import json from '../../../assets/mockData/projectPositions';

export default class MockProjectPositionService {

    getProjectPositions() {
        return json.ProjectPositions;
    }

    getProjectPosition(id) {
        for (let i = 0; i < json.ProjectPositions.length; i++) {
            if (json.ProjectPositions[i].Id === id) {
                return json.ProjectPositions[i];
            }
        }
    }
}