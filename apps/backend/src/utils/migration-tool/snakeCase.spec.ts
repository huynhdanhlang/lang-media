import { snakeCase } from "./snakeCase";

type Case = { input: string, expected: string }

const cases: Case[] = [
  {
    input: "camelCase",
    expected: "camel_case",
  },
  {
    input: "CamelCase123",
    expected: "camel_case_123",
  },
  {
    input: "__FOO-BAR__123.2CamelCase_",
    expected: "foo_bar_123_2_camel_case",
  },
];

it.each(cases)("snakeCase($input) should return $expected", ({ input, expected }) => {
  expect(snakeCase(input)).toEqual(expected);
});
