/*export default ($filter) => {
    return (timesheets, date1) => {
        let result = [];
        for (let i = 0; i < timesheets.length; i++) {
            let test = new Date(timesheets[i].Date);
            let test1 = test.getTime();
            let test2 = new Date(date1);
            let test3 = test2.getTime();

            let test4 = $filter('date')(test1, 'shortDate');
            let test5 = $filter('date')(test3, 'shortDate');

            if (test4 === test5) {
                result.push(timesheets[i]);
                break;
            }
        }

        return result;
    }
}*/