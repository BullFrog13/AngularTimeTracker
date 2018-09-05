export default class UnsavedChangesController {
    proceed() {
        this.close({ $value: true });
    }

    cancel() {
        this.close({ $value: false });
    }
}