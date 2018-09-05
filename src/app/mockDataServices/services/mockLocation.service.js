import json from '../../../assets/mockData/locations';

export default class MockLocationService {
    getLocations() {
        return json.Locations;
    }

    getLocation(id) {
        for (let i = 0; i < json.Locations.length; i++) {
            if (json.Locations[i].Id === id) {
                return json.Locations[i];
            }
        }
    }
}