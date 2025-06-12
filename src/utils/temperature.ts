export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round((fahrenheit - 32) * 5 / 9);
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9 / 5) + 32);
};

export const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  if (unit === 'celsius') {
    const celsius = fahrenheitToCelsius(temp);
    return `${celsius}°C`;
  }
  return `${temp}°F`;
};

export const getTemperatureSymbol = (unit: 'celsius' | 'fahrenheit'): string => {
  return unit === 'celsius' ? '°C' : '°F';
};