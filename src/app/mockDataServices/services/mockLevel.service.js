import json from '../../../assets/mockData/levels';

export default class MockLevelService {

    getLevels() {
        return json.Levels;
    }

    getLevel(id) {
        for (let i = 0; i < json.Levels.length; i++) {
            if (json.Levels[i].Id === id) {
                return json.Levels[i].Name;
            }
        }
    }
}