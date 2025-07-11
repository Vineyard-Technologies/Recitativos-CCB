import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECITATIVOS_STORAGE_KEY = '@recitativos';

export interface Recitativo {
  title: string;
  verses: string[];
  level?: number;
}

interface RecitativosContextType {
  recitativos: Recitativo[];
  addRecitativo: (recitativo: Recitativo) => void;
  moveRecitativoUp: (index: number) => void;
  moveRecitativoDown: (index: number) => void;
  deleteRecitativo: (index: number) => void;
  updateRecitativoLevel: (title: string, level: number) => void;
}

const RecitativosContext = createContext<RecitativosContextType | undefined>(undefined);

export const RecitativosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recitativos, setRecitativos] = useState<Recitativo[]>([]);

  useEffect(() => {
    const loadRecitativos = async () => {
      try {
        const storedRecitativos = await AsyncStorage.getItem(RECITATIVOS_STORAGE_KEY);
        if (storedRecitativos) {
          setRecitativos(JSON.parse(storedRecitativos));
        }
      } catch (e) {
        console.error("Failed to load recitativos.", e);
      }
    };

    loadRecitativos();
  }, []);

  const saveRecitativos = async (newRecitativos: Recitativo[]) => {
    try {
      await AsyncStorage.setItem(RECITATIVOS_STORAGE_KEY, JSON.stringify(newRecitativos));
      setRecitativos(newRecitativos);
    } catch (e) {
      console.error("Failed to save recitativos.", e);
    }
  };

  const addRecitativo = (recitativo: Recitativo) => {
    saveRecitativos([...recitativos, recitativo]);
  };

  const moveRecitativoUp = (index: number) => {
    if (index === 0) return;
    const newRecitativos = [...recitativos];
    const temp = newRecitativos[index];
    newRecitativos[index] = newRecitativos[index - 1];
    newRecitativos[index - 1] = temp;
    saveRecitativos(newRecitativos);
  };

  const moveRecitativoDown = (index: number) => {
    if (index === recitativos.length - 1) return;
    const newRecitativos = [...recitativos];
    const temp = newRecitativos[index];
    newRecitativos[index] = newRecitativos[index + 1];
    newRecitativos[index + 1] = temp;
    saveRecitativos(newRecitativos);
  };

  const deleteRecitativo = (index: number) => {
    const newRecitativos = recitativos.filter((_, i) => i !== index);
    saveRecitativos(newRecitativos);
  };

  const updateRecitativoLevel = (title: string, level: number) => {
    const newRecitativos = recitativos.map(r =>
      r.title === title ? { ...r, level } : r
    );
    saveRecitativos(newRecitativos);
  };

  return (
    <RecitativosContext.Provider value={{ recitativos, addRecitativo, moveRecitativoUp, moveRecitativoDown, deleteRecitativo, updateRecitativoLevel }}>
      {children}
    </RecitativosContext.Provider>
  );
};

export const useRecitativos = () => {
  const context = useContext(RecitativosContext);
  if (!context) throw new Error('useRecitativos must be used within a RecitativosProvider');
  return context;
};
