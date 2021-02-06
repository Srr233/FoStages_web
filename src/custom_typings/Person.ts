interface Person {
  login: string;
  pass: string;
  profile: {
    words: Array<string>;
  };
}

export { Person }
