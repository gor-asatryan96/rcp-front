export function getIsDevelopment() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function addOpacity(rgbString: string, opacity: string) {
  return `${rgbString.split(')')[0]},${opacity})`;
}
