import { max } from '../../useForm/validations';

describe('validations - max', () => {
    test('max - should return false when value > maxValue', () => {
        expect(max(3).validateWith('4')).toBe(false);
        expect(max(3).validateWith(4)).toBe(false);
    });

    test('max - should return true when value >= maxValue', () => {
        expect(max(3).validateWith('3')).toBe(true);
        expect(max(3).validateWith(3)).toBe(true);
    });

    test('max - should return true when value < maxValue', () => {
        expect(max(3).validateWith('2')).toBe(true);
        expect(max(3).validateWith(2)).toBe(true);
    });

    test('max - should return false when value or Number(value) is not of type number', () => {
        expect(max(3).validateWith('wrong value')).toBe(false);
    });
});
