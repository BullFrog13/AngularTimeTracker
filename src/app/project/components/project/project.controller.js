export default class ProjectController {
    constructor($uibModal, TeamService, EmployeeService) {
        this.$uibModal = $uibModal;
        this.TeamService = TeamService;
        this.EmployeeService = EmployeeService;
        this.teamMembers = [];
    }

    $onInit() {
        this.TeamService.getTeam(this.project.Id).then((members) => {
            this.teamMembers = members;
        });
    }

    openAddMemberModal() {
        const modal = this.$uibModal.open({
            component: 'addMember',
            backdrop: 'static',
            resolve: {
                project: () => {
                    return this.project;
                },
                members: () => {
                    return this.teamMembers;
                }
            }
        });

        modal.result.then((newMemberId) => {
            if (newMemberId) {
                this._addMemberToTable(newMemberId);
            }
        });
    }

    openEditProjectModal() {
        const modal = this.$uibModal.open({
            component: 'editProject',
            backdrop: 'static',
            resolve: {
                project: () => {
                    return this.project;
                }
            }
        });

        modal.result.then((editedProject) => {
            if (editedProject) {
                this.project = editedProject;
            }
        }, () => {});
    }

    deleteMemberFromTeam(memberId) {
        this.TeamService.removeEmployeeFromTeam(memberId, this.project.Id).then(() => {
            this._removeMemberFromTable(memberId);
        })
    }

    _addMemberToTable(memberId) {
        this.EmployeeService.getEmployee(memberId).then((employee) => {
            this.teamMembers.push(employee);
        });
    }

    _removeMemberFromTable(memberId) {
        for (let i = 0; i < this.teamMembers.length; i++) {
            if (this.teamMembers[i].Id === memberId) {
                this.teamMembers.splice(i, 1);
                break;
            }
        }
    }
}