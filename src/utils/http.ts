import axios from 'axios';
import { Platform } from 'react-native';
import Auth from '@aws-amplify/auth';
import { BASEURL_IOS, BASEURL_ANDROID } from '../../config';

async function authHeader(): Promise<{ Authorization: string }> {
  try {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken().getJwtToken();

    return { Authorization: `Bearer ${idToken}` };
  } catch {
    return { Authorization: '' };
  }
}

async function apiRequestHeader(
  needToken: boolean,
): Promise<{ 'Content-Type': string; Authorization?: string }> {
  let headers = {
    'Content-Type': 'application/json',
  };

  if (needToken) {
    headers = {
      ...headers,
      ...(await authHeader()),
    };
  }

  return headers;
}

const Http = axios.create({
  baseURL: Platform.OS === 'ios' ? BASEURL_IOS : BASEURL_ANDROID,
  headers: { 'Content-Type': 'application/json' },
});

export async function query<T = any>(
  query: string,
  variables?: unknown,
  needsToken?: boolean,
): Promise<T> {
  const res = await Http.post<T>(
    'graphql',
    {
      query,
      variables,
    },
    { headers: await apiRequestHeader(needsToken || false) },
  );
  return res.data;
}
