import { notImplementedError } from '../customErrors';

export default function datasourceApi(datasource) {
  const api = {
    signInUser
  };

  return { ...api, ...datasource };
}

export async function signInUser(email, password) {
  throw notImplementedError();
}
