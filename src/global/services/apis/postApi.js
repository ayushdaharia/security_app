import axios from 'axios';
import {Resolver} from '../resolver/resolver';
import AsyncStorage from '@react-native-async-storage/async-storage';

///////*************************** */...GET APIs.../**********************///////

export async function saveData(url, obj) {
  // const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
  const access_token =
    'eyJhbGciOiJIUzUxMiJ9.eyJicmFuY2hJZCI6bnVsbCwic3ViIjoidGVzdC5hZG1pbkB1bm8uY2FyZSIsImNsaW5pY0lkIjoiNDdmNGZjYTktOWMyOS00ZDIxLTljMTAtYzNkMzgxNWJiZjUwIiwicGhhcm1hY3lJZCI6ImE3NmY0NjMwLTdjMjItNGYyMi1iNDg4LTVmOGM5M2JkOTdmOSIsInJvbGUiOiJTVVBFUkFETUlOIiwicm9sZXMiOlsiU1VQRVJBRE1JTiJdLCJtb2JpbGUiOiIxMjM0NTY3ODExIiwiYnJhbmNoTmFtZSI6IlRlc3QgYnJhbmNoIiwidXNlcklEIjoiMjUyMTY0NTctY2RiNi00Yjc5LTljNTUtMGU4MjE5Zjg5OTE3IiwicGVybWlzc2lvbnMiOnsidGlja2V0cyI6dHJ1ZSwiZ3JhbnRBY2Nlc3MiOnRydWUsImNvbnRyb2xUb3dlciI6dHJ1ZSwib25ib2FyZENsaW5pYyI6dHJ1ZSwic2VydmljZUFuZFByaWNpbmciOnRydWUsInRva2VuIjp0cnVlLCJDUyI6dHJ1ZSwiY2FyZUNvb3JkaW5hdG9yIjp0cnVlLCJtYXJrZXRpbmciOnRydWUsImRvY3RvckthbSI6dHJ1ZSwiY291bnNlbGxvciI6dHJ1ZSwiTUlTIjp0cnVlLCJjYXNoaWVyIjp0cnVlLCJwaGFybWFjeSI6dHJ1ZX0sImxhYklkIjoiMGI3MGQ1ZmMtNDllMy00OWI2LTk1YzctMGE4Y2Y0ZTcyMzEzIiwibmFtZSI6IlRlc3QgTmFtZSIsImlkIjoxNzAsInBvcnRhbCI6IkFETUlOIiwiZXhwIjoxNzA4Njg4MjAyLCJpYXQiOjE3MDA5MTIyMDJ9.KRwmwhLoQIs3SBqBY51Gt95GTweKkX8hu8rxsCrO0L2KS15xLfpd8xseuFtZ9cVdYAmEfTYfHVqV5brfUZ-Mbw';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token}`,
  };
  return await Resolver(
    axios.post(url, obj, {headers}, {timeout: 5000}).then(res => res.data),
  );
}

export async function updateData(url, obj) {
  const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token}`,
  };
  return await Resolver(
    axios.patch(url, obj, {headers}, {timeout: 5000}).then(res => res.data),
  );
}
