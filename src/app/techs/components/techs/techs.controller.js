export default class Ctrl {
    constructor(Tech) {
        this.Tech = Tech;
    }

    $onInit() {
        this.Tech.getList().then(list => this.list = list);
    }
}