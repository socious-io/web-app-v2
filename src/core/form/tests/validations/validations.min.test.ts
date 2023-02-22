import { min } from '../../useForm/validations';

describe('validations - min', () => {
    test('min - should return false when value < minValue', () => {
        expect(min(3).validateWith('2')).toBe(false);
        expect(min(3).validateWith(2)).toBe(false);
    });

    test('min - should return true when value >= minValue', () => {
        expect(min(3).validateWith('3')).toBe(true);
        expect(min(3).validateWith(3)).toBe(true);
    });

    test('min - should return true when value > minValue', () => {
        expect(min(3).validateWith('4')).toBe(true);
        expect(min(3).validateWith(4)).toBe(true);
    });

    test('min - should return false when value or Number(value) is not of type number', () => {
        expect(min(3).validateWith('wrong value')).toBe(false);
    });
});
