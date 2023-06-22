import { fetcher } from './fetcher';
import { colors } from './style';

export const randomColor = () => {
  const length = colors.length;
  return colors[Math.floor(Math.random() * length)];
};

export async function getCountries() {
  const { data } = await fetcher({
    url: 'https://trial.mobiscroll.com/content/countries.json',
    method: 'GET',
    data: {},
    isApiServer: false,
  });
  const countries: any = [];
  for (let i = 0; i < data.length; ++i) {
    const country = data[i];
    countries.push({ label: country.text, value: country.text });
  }
  return countries;
}
