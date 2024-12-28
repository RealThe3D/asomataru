import { assertEquals } from 'jsr:@std/assert';
import { celsiusToFahrenheit, fahrenheitToCelsius } from '@/constants/index.ts';

Deno.test('Celsius to Fahrenheit', () => {
	assertEquals(celsiusToFahrenheit(100), 212);
});

Deno.test('Fahrenheit to Celsius', () => {
	assertEquals(fahrenheitToCelsius(212), 100);
});
