import './App.css';
import { defineLocalStorage } from '../dist/main';
import { z } from 'zod';

const aSchema = z.object({
  name: z.string(),
  dog: z.object({
    name: z.string(),
    age: z.number(),
    cat: z.object({
      name: z.string(),
    }),
  }),
});

export const {
  useSafeLocalStorageSelector: useSafeLocalStorageSelectorA,
  setLocalStorage: setLocalStorageA,
} = defineLocalStorage({
  schema: aSchema,
  initialValue: {
    name: '1',
    dog: { name: '2', age: 3, cat: { name: 'Riscas' } },
  },
  localStorageKey: 'a',
});

export const {
  useSafeLocalStorageSelector: useSafeLocalStorageSelectorB,
  setLocalStorage: setLocalStorageB,
} = defineLocalStorage({
  schema: aSchema,
  initialValue: {
    name: '1',
    dog: { name: '2', age: 3, cat: { name: 'Riscas' } },
  },
  localStorageKey: 'b',
});

export default function App() {
  console.log('App rendered');

  return (
    <>
      <div>
        <button
          onClick={() =>
            setLocalStorageA((old) => ({
              ...old,
              dog: {
                ...old.dog,
                age: old.dog.age + 1,
              },
            }))
          }
        >
          Increase Adog age
        </button>
        <button
          onClick={() =>
            setLocalStorageA((old) => ({
              ...old,
              dog: {
                ...old.dog,
                cat: {
                  ...old.dog.cat,
                  name: 'Fluffy',
                },
              },
            }))
          }
        >
          Change Acat name
        </button>
        <ADogAge />
        <ACatName />
        <hr />
        <button
          onClick={() =>
            setLocalStorageB((old) => ({
              ...old,
              dog: {
                ...old.dog,
                age: old.dog.age + 1,
              },
            }))
          }
        >
          Increase Bdog age
        </button>
        <button
          onClick={() =>
            setLocalStorageB((old) => ({
              ...old,
              dog: {
                ...old.dog,
                cat: {
                  ...old.dog.cat,
                  name: 'Fluffy',
                },
              },
            }))
          }
        >
          Change Bcat name
        </button>
        <BDogAge />
        <BCatName />
      </div>
    </>
  );
}

function ADogAge() {
  console.log('ADogAge rendered');
  const dogAge = useSafeLocalStorageSelectorA(
    (localStorage) => localStorage.dog.age
  );

  return <div>ADog age is {dogAge}</div>;
}

function ACatName() {
  console.log('ACatName rendered');
  const catName = useSafeLocalStorageSelectorA(
    (localStorage) => localStorage.dog.cat.name
  );

  return (
    <>
      <div>ACat name is {catName}</div>
    </>
  );
}

function BDogAge() {
  console.log('BDogAge rendered');
  const dogAge = useSafeLocalStorageSelectorB(
    (localStorage) => localStorage.dog.age
  );

  return <div>BDog age is {dogAge}</div>;
}

function BCatName() {
  console.log('BCatName rendered');
  const catName = useSafeLocalStorageSelectorB(
    (localStorage) => localStorage.dog.cat.name
  );

  return (
    <>
      <div>BCat name is {catName}</div>
    </>
  );
}
