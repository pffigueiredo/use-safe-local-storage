import './App.css';
import { defineLocalStorage } from './use-safe-local-storage';
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

export const { useSafeLocalStorageSelector, setLocalStorage } =
  defineLocalStorage({
    schema: aSchema,
    initialValue: {
      name: '1',
      dog: { name: '2', age: 3, cat: { name: 'Riscas' } },
    },
    localStorageKey: 'a',
  });

export default function App() {
  console.log('App rendered');

  return (
    <>
      <div>
        <button
          onClick={() =>
            setLocalStorage((old) => ({
              ...old,
              dog: {
                ...old.dog,
                age: old.dog.age + 1,
              },
            }))
          }
        >
          Increase dog age
        </button>
        <button
          onClick={() =>
            setLocalStorage((old) => ({
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
          Change cat name
        </button>
        <A />
        <B />
      </div>
    </>
  );
}

function A() {
  const dogAge = useSafeLocalStorageSelector(
    (localStorage) => localStorage.dog.age
  );

  return <div>Dog age is {dogAge}</div>;
}

function B() {
  const catName = useSafeLocalStorageSelector(
    (localStorage) => localStorage.dog.cat.name
  );

  return (
    <>
      <div>Cat name is {catName}</div>
    </>
  );
}
