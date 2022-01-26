"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const okTrip = {
    type: 'ski',
    name: 'Ski0 okTrip',
    location: {
        city: 'Courmayeur',
        country: 'Italy',
    },
    duration: 7,
    price: 799,
    maxGroupSize: 4,
    tecnicalDifficulty: 'intermediate',
    physicalDifficulty: 'hard',
    startDates: ['3/8/22', '3/12/22'],
    description: 'Seven days of hard skiing in Monte Bianco range',
};
const tripWithoutName = Object.assign(Object.assign({}, okTrip), { name: null });
const tripNameIsNumber = Object.assign(Object.assign({}, okTrip), { name: 123 });
const tripWithoutLocation = Object.assign(Object.assign({}, okTrip), { location: null, name: 'ski1' });
const tripWithOutDuration = Object.assign(Object.assign({}, okTrip), { duration: null, name: 'ski2' });
const tripDurationIsString = Object.assign(Object.assign({}, okTrip), { duration: 'halloo', name: 'ski3' });
const okTripWithOnlyRequiredFields = {
    type: 'mtb',
    name: 'Ski4 defaults gets created',
    location: {
        city: 'Courmayeur',
        country: 'Italy',
    },
    duration: 7,
    price: 799,
    maxGroupSize: 4,
};
const okTripWithExtraFields = Object.assign(Object.assign({}, okTrip), { name: 'ski5 extra fields not included, [haloo, ski, ciao]', haloo: 'lyngen', ski: null, ciao: [] });
exports.default = {
    okTrip,
    okTripWithOnlyRequiredFields,
    okTripWithExtraFields,
    tripNameIsNumber,
    tripWithoutName,
    tripWithoutLocation,
    tripWithOutDuration,
    tripDurationIsString,
};
