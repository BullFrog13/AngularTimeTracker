export default class EditSkillModalController {
    constructor(LevelService, SkillService) {
        this.SkillService = SkillService;

        this.selectedSkillLevel;
        this.levels = [];

        this.levels = LevelService.getLevels();
    }

    $onInit() {
        this.skill = angular.copy(this.resolve.skill);
        this.userId = this.resolve.userId;

        this.selectedSkillLevel = { Id: this.skill.LevelId, Name: this.skill.LevelName };
    }

    updateSkillLevel() {
        this.skill.LevelId = this.selectedSkillLevel.Id;
        this.skill.EmployeeId = this.userId;
        this.skill.skillId = this.skill.Id;

        this.SkillService.updateEmployeeSkill(this.skill).then((result) => {
            this.close({ $value: result });
        });
    }
}