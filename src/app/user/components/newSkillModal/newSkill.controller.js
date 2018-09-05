export default class NewSkillModalController {
    constructor(SkillService, LevelService) {
        this.skills = [];
        this.levels = [];
        this.newSkill = {};

        this.SkillService = SkillService;

        this.levels = LevelService.getLevels();
    }

    $onInit() {
        this.newSkill.EmployeeId = this.resolve.userId;
        this.currentSkills = angular.copy(this.resolve.skills);

        this.SkillService.getSkills().then((skills) => {
            this.skills = skills;

            this.currentSkills.forEach((skill) => {
                for (let i = 0, j = 0; i < this.currentSkills.length; i++) {
                    if (this.skills[i].Id === skill.Id) {
                        this.skills.splice(i - j, 1);
                        j++;
                        break;
                    }
                }
            });
        });
    }

    addSkill() {
        this.SkillService.addSkill(this.newSkill).then((newSkill) => {
            this.close({ $value: newSkill });
        });
    }
}