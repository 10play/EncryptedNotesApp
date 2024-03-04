import * as Keychain from 'react-native-keychain';

const createPassphrase = () => {
  // This could be done better, but for now we'll just use a random string
  return Math.random().toString(36);
};

export const getPassphrase = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (!credentials) {
    const passphrase = createPassphrase();
    await Keychain.setGenericPassword('passphrase', passphrase);
    return passphrase;
  }
  return credentials.password;
};
