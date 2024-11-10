import { assertEquals } from 'jsr:@std/assert';
import { celsiusToFahrenheit } from '@/constants/index.ts';
import { fahrenheitToCelsius } from '@/constants/math/temp_conversion.ts';

Deno.test('Celsius to Fahrenheit', () => {
	assertEquals(celsiusToFahrenheit(100), 212);
});

Deno.test('Fahrenheit to Celsius', () => {
	assertEquals(fahrenheitToCelsius(212), 100);
});
