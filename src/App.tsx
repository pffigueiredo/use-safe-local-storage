import './App.css';
import { defineLocalStorage } from '../dist/main';
import { z } from 'zod';
import { useRef } from 'react';

const aSchema = z.object({
  name: z.string(),
  dog: z.object({
    name: z.string(),
    age: z.number(),
  }),
  cat: z.object({
    name: z.string(),
    age: z.number(),
  }),
});

export const {
  useSafeLocalStorageSelector: useSafeLocalStorageSelectorA,
  setLocalStorage: setLocalStorageA,
} = defineLocalStorage({
  schema: aSchema,
  initialValue: {
    name: '1',
    dog: { name: '2', age: 3 },
    cat: { name: 'Riscas', age: 10 },
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
    dog: { name: '2', age: 3 },
    cat: { name: 'Riscas', age: 10 },
  },
  localStorageKey: 'b',
});

export default function App() {
  console.log('App rendered');

  return (
    <>
      <div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <FullLocalStorageA />

          <div>
            <ADogAge />
            <ACatAge />
          </div>
        </div>
        <hr />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <FullLocalStorageB />

          <div>
            <BDogAge />
            <BCatAge />
          </div>
        </div>
      </div>
    </>
  );
}

function ADogAge() {
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  const dogAge = useSafeLocalStorageSelectorA(
    (localStorage) => localStorage.dog.age
  );

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
        Increase "a"Dog age
      </button>
      {rendersRef.current} Renders | <div>"a"Dog age is {dogAge}</div>
    </div>
  );
}

function BDogAge() {
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  const dogAge = useSafeLocalStorageSelectorB(
    (localStorage) => localStorage.dog.age
  );

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
        Increase "b"Dog age
      </button>
      {rendersRef.current} Renders | <div>"b"Dog age is {dogAge}</div>
    </div>
  );
}

function ACatAge() {
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  const catAge = useSafeLocalStorageSelectorA(
    (localStorage) => localStorage.cat.age
  );

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        onClick={() =>
          setLocalStorageA((old) => ({
            ...old,
            cat: {
              ...old.cat,
              age: old.cat.age + 1,
            },
          }))
        }
      >
        Increase "a"Dog age
      </button>
      {rendersRef.current} Renders | <div>"a"Cat age is {catAge}</div>
    </div>
  );
}

function BCatAge() {
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  const catAge = useSafeLocalStorageSelectorB(
    (localStorage) => localStorage.cat.age
  );

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        onClick={() =>
          setLocalStorageB((old) => ({
            ...old,
            cat: {
              ...old.cat,
              age: old.cat.age + 1,
            },
          }))
        }
      >
        Increase "b"Cat age
      </button>
      {rendersRef.current} Renders | <div>"b"Cat age is {catAge}</div>
    </div>
  );
}

function FullLocalStorageA() {
  console.log('FullLocalStorageA rendered');
  const localStorageA = useSafeLocalStorageSelectorA(
    (localStorage) => localStorage
  );

  return (
    <div>
      <span>LocalStorage Key - "a"</span>
      <pre>{JSON.stringify(localStorageA, null, 4)}</pre>
    </div>
  );
}

function FullLocalStorageB() {
  console.log('FullLocalStorageB rendered');
  const localStorageB = useSafeLocalStorageSelectorB(
    (localStorage) => localStorage
  );

  return (
    <div>
      <span>LocalStorage Key - "b"</span>
      <pre>{JSON.stringify(localStorageB, null, 4)}</pre>
    </div>
  );
}
