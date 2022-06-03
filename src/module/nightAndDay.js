const maxTemp = [
	14.95, 13.21, 10.99, 15, 19.68, 21.77, 21.73, 17.39, 14.34, 13.46, 13.86, 19.81, 23.3, 20.31,
	17.97, 16.17, 13.36, 12.44, 10.82, 13.88, 18.13, 20.01, 19.83, 15.15, 11.41, 10.45, 9.87, 15.59,
	19.59, 22.05, 21.17, 17.01, 13.83, 12.69, 12.22, 17.82, 21.97, 24.24, 22.97, 18.59,
];
const minTemp = [
			35, 35, 35, 0, 0, 0, 0, 0, 35, 35, 35, 0, 0, 0, 0, 0, 35, 35, 35, 0, 0, 0, 0, 0, 35, 35,
			35, 0, 0, 0, 0, 0, 35, 35, 35, 0, 0, 0, 0, 0,
];

function night(a, b, cAlt) {
    
    return a.map((val, index) => {
        if (val > b[index]) {
            if (val >= cAlt[index]) {
                return val;
            }
            else {
                return cAlt[index];
            }
        } else {
            if (b[index] >= cAlt[index]) {
                return b[index];
            }
            return cAlt[index];
		}
	});
}
function day(a, b, c) {
    
    return a.map((val, index) => {
		if (val < b[index]) {
            
            if (val <= c[index]) {
				return val;
			} else {
				return c[index];
			}
        } else {
            if (b[index] <= c[index]) {
				return b[index];
			}
			return c[index];
		}
	});
}
import lodash from 'lodash';

function max(a) {
    return lodash.max(a);
}

function min(a) {
    return lodash.min(a);
}

function replaceValueInArray(a) { 

}



export { night, day, max, min };

