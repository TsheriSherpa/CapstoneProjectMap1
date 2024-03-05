import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import store from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
