// Import first
import { Aside } from './components/aside';
import { AsideProvider } from './context/aside-context';

// Then export
export { Aside } from './components/aside';
export { AsideProvider } from './context/aside-context';
export { useAside } from './hooks/use-aside';

// Types
export type { 
  AsideType, 
  AsidePosition, 
  AsideConfig, 
  AsideContextValue,
  AsideProps 
} from './types/aside';

export const AsideComponent = Object.assign(Aside, {
  Provider: AsideProvider,
});

export default AsideComponent;