import { z } from 'zod';
// import { Paths } from 'type-fest';
import { useSyncExternalStore } from 'react';

interface DefineLocalStorageProps<TSchema extends z.ZodTypeAny> {
  schema: TSchema;
  initialValue: z.infer<TSchema>;
  localStorageKey: string;
}

const UPDATE_LOCAL_STORAGE_EVENT = 'storage';

export function defineLocalStorage<TSchema extends z.ZodTypeAny>({
  schema,
  localStorageKey,
  initialValue,
}: DefineLocalStorageProps<TSchema>) {
  // init local storage with initial value
  _getLocalStorage(schema, initialValue, localStorageKey);

  const result = {
    // getItem: (key: Paths<z.infer<TSchema>> & string) => _getItem(key),
    // setItem: <K extends Paths<z.infer<TSchema>> & string>(
    //   key: K,
    //   value: NestedValueOf<z.infer<TSchema>, K>
    // ) => _setItem(key, value),
    getLocalStorage: () =>
      _getLocalStorage<z.infer<TSchema>>(schema, initialValue, localStorageKey),
    setLocalStorage: (
      updateFn: (oldLocalStorage: z.infer<TSchema>) => z.infer<TSchema>
    ) =>
      _setLocalStorage(
        result.getLocalStorage,
        schema,
        localStorageKey,
        updateFn
      ),
    useSafeLocalStorageSelector: <S>(selector: (val: z.infer<TSchema>) => S) =>
      _useSafeLocalStorageSelector(
        schema,
        initialValue,
        localStorageKey,
        selector
      ),
  };

  return result;
}

// function _getItem<T>(key: Paths<T> & string) {
//   return localStorage.getItem(key);
// }

// function _setItem<T, K extends Paths<T> & string>(
//   key: K,
//   value: NestedValueOf<T, K>
// ) {
//   return localStorage.setItem(key, value as string);
// }

function _getLocalStorage<T>(
  schema: z.ZodTypeAny,
  initialValue: T,
  localStorageKey: string
): T {
  try {
    const localStorageItem = localStorage.getItem(localStorageKey);
    if (localStorageItem) {
      const localStorageJson = JSON.parse(localStorageItem);
      const parsedLocalStorage = schema.parse(localStorageJson);
      return parsedLocalStorage;
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(initialValue));
      return initialValue;
    }
  } catch (e) {
    localStorage.setItem(localStorageKey, JSON.stringify(initialValue));
    return initialValue;
  }
}

function _setLocalStorage<T>(
  getLocalStorage: () => T,
  schema: z.ZodTypeAny,
  localStorageKey: string,
  updateFn: (oldLocalStorage: T) => T
) {
  const olLocalStorage = getLocalStorage();
  const newLocalStorage = updateFn(olLocalStorage);

  // get's read of unknown properties
  const cleanLocalStorage = schema.parse(newLocalStorage);

  // change local storage
  localStorage.setItem(localStorageKey, JSON.stringify(cleanLocalStorage));

  // this event is responsible for making components re-render on local storage changes
  const event = new Event(UPDATE_LOCAL_STORAGE_EVENT);
  window.dispatchEvent(event);
}

// function _useSafeLocalStorageSelector<T, S>(
//   schema: z.ZodTypeAny,
//   initialValue: T,
//   localStorageKey: string,
//   selector: (value: T) => S
// ) {
//   const currentVal = selector(
//     _getLocalStorage(schema, initialValue, localStorageKey)
//   );
//   const previousLocalStorageRef = React.useRef(currentVal);
//   const [selectedValue, setSelectedValue] = React.useState(currentVal);

//   React.useEffect(() => {
//     const handleStorageChange = () => {
//       const newVal = selector(
//         _getLocalStorage(schema, initialValue, localStorageKey)
//       );

//       if (previousLocalStorageRef.current !== newVal) {
//         setSelectedValue(newVal);
//       }
//       previousLocalStorageRef.current = newVal;
//     };

//     window.addEventListener(UPDATE_LOCAL_STORAGE_EVENT, handleStorageChange);
//     return () => {
//       window.removeEventListener(
//         UPDATE_LOCAL_STORAGE_EVENT,
//         handleStorageChange
//       );
//     };
//   }, [initialValue, localStorageKey, schema, selector]);

//   return selectedValue;
// }

const subscribe = (callback: () => void) => {
  window.addEventListener(UPDATE_LOCAL_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener(UPDATE_LOCAL_STORAGE_EVENT, callback);
  };
};

function _useSafeLocalStorageSelector<T, S>(
  schema: z.ZodTypeAny,
  initialValue: T,
  localStorageKey: string,
  selector: (value: T) => S
) {
  const snapshot = () =>
    selector(_getLocalStorage(schema, initialValue, localStorageKey));
  const selectedValue = useSyncExternalStore(subscribe, snapshot);

  return selectedValue;
}
