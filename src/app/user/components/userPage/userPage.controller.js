export default class UserPageController {
    constructor($uibModal, EmployeeService, ProjectService, SkillService, LevelService) {
        this.user;

        this.$uibModal = $uibModal;
        this.EmployeeService = EmployeeService;
        this.ProjectService = ProjectService;
        this.SkillService = SkillService;
        this.LevelService = LevelService;

        this.projects = [];
        this.skills = [];
    }

    $onInit() {
        this.SkillService.getEmployeeSkills(this.user.Id).then((skills) => {
            this.skills = skills;
        });

        this._getEmployeeProjectsAndTickets();
    }

    openEditSkillModal(skill) {
        const modal = this.$uibModal.open({
            component: 'editSkill',
            backdrop: 'static',
            resolve: {
                skill: () => {
                    return skill;
                },
                userId: () => {
                    return this.user.Id;
                }
            }
        });

        modal.result.then((updatedSkill) => {
            if (updatedSkill) {
                this._editSkillInTable(updatedSkill);
            }
        }, () => {});
    }

    openNewSkillModal() {
        const modal = this.$uibModal.open({
            component: 'newSkill',
            backdrop: 'static',
            resolve: {
                userId: () => {
                    return this.user.Id;
                },
                skills: () => {
                    return this.skills;
                }
            }
        });

        modal.result.then((newSkill) => {
            if (newSkill) {
                this._addSkillToTable(newSkill);
            }
        });
    }

    openEditUserModal() {
        const modal = this.$uibModal.open({
            component: 'editUser',
            backdrop: 'static',
            resolve: {
                user: () => {
                    return angular.copy(this.user);
                }
            }
        });

        modal.result.then((updatedEmployee) => {
            this.user = updatedEmployee;
        });
    }

    removeSkill(skillId) {
        this.SkillService.deleteSkill(skillId, this.user.Id).then((result) => {
            this._removeSkillFromTable(result);
        });
    }

    openAssignToProjectModal() {
        const modal = this.$uibModal.open({
            component: 'assignProject',
            backdrop: 'static',
            resolve: {
                user: function() {
                    return angular.copy(this.user);
                }
            }
        });

        modal.result.then((addedProjectId) => {
            this._addAssignedProjectToTable(addedProjectId);
        });
    }

    _editSkillInTable(updatedSkill) {
        const levelName = this.LevelService.getLevel(updatedSkill.LevelId);

        for (let i = 0; i < this.skills.length; i++) {
            if (this.skills[i].Id === updatedSkill.Id) {
                this.skills[i].LevelName = levelName;
                this.skills[i].LevelId = updatedSkill.LevelId;
            }
        }
    }

    _addSkillToTable(newSkill) {
        this.skills.push(newSkill);
    }

    _removeSkillFromTable(skillId) {
        for (let i = 0; i < this.skills.length; i++) {
            if (this.skills[i].Id === skillId) {
                this.skills.splice(i, 1);
            }
        }
    }

    _addAssignedProjectToTable(projectId) {
        this.ProjectService.getProject(projectId).then((project) => {
            this.projects.push(project);
        });
    }

    _getEmployeeProjectsAndTickets() {
        this.EmployeeService.getEmployeeProjects(this.user.Id).then((projects) => {
            projects.forEach((project) => {
                this.ProjectService.getProjectTickets(project.Id).then((tickets) => {
                    const userAssignedTickets = [];
                    tickets.forEach((ticket) => {
                        if (ticket.ResponsibleId === this.user.Id) {
                            userAssignedTickets.push(ticket);
                        }
                    });

                    project.Tickets = userAssignedTickets;
                });
            });

            this.projects = projects;
        });
    }
}