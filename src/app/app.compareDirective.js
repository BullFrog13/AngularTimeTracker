export default class CompareDirective {
    constructor() {
        this.require = 'ngModel';
        this.restrict = 'A';
        this.scope = {
            otherModelValue: '=compareTo'
        }
    }

    link(scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = (modelValue) => {
            let comparableValue = scope.otherModelValue.$viewValue;

            return modelValue === comparableValue;
        };

        scope.$watch('otherModelValue', () => {
            ngModel.$validate();
        });
    }
}