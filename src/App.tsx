import { FormProvider } from './components/Form/Provider/FormProvider';
import { FormView } from './Views/Form/FormView';
const App = () => {
  return (
    <>
     <FormProvider>
        <FormView/>
     </FormProvider>
    </>
  )
}

export default App
