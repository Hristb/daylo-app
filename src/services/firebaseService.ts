import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { DailyEntry } from '../types';

// Obtener el email del usuario (identificador único)
const getUserEmail = (): string => {
  return localStorage.getItem('daylo-user-email') || 'anonymous';
};

// Verificar si un usuario existe por email
export const getUserByEmail = async (email: string): Promise<{ name: string; email: string } | null> => {
  try {
    const userDoc = doc(db, 'users', email);
    const userSnap = await getDoc(userDoc);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        name: data.name,
        email: data.email,
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error verificando usuario:', error);
    return null;
  }
};

// Crear o actualizar usuario
export const createOrUpdateUser = async (name: string, email: string): Promise<void> => {
  try {
    const userDoc = doc(db, 'users', email);
    await setDoc(userDoc, {
      name,
      email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }, { merge: true });
    console.log('✅ Usuario guardado en Firebase:', email);
  } catch (error) {
    console.error('❌ Error guardando usuario:', error);
    throw error;
  }
};

// Guardar entrada diaria
export const saveDailyEntry = async (entry: Partial<DailyEntry>): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const entryId = `${userEmail}_${today}`;
    
    const entryData = {
      ...entry,
      userEmail,
      date: entry.date || new Date().toISOString(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(doc(db, 'dailyEntries', entryId), entryData, { merge: true });
    console.log('✅ Entrada guardada en Firebase:', entryId);
  } catch (error) {
    console.error('❌ Error guardando en Firebase:', error);
    throw error;
  }
};

// Obtener entrada de hoy
export const getTodayEntry = async (): Promise<DailyEntry | null> => {
  try {
    const userEmail = getUserEmail();
    const today = new Date().toISOString().split('T')[0];
    const entryId = `${userEmail}_${today}`;
    
    const docRef = doc(db, 'dailyEntries', entryId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as DailyEntry;
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo entrada de hoy:', error);
    return null;
  }
};

// Obtener todas las entradas del usuario
export const getAllUserEntries = async (): Promise<DailyEntry[]> => {
  try {
    const userEmail = getUserEmail();
    const entriesRef = collection(db, 'dailyEntries');
    const q = query(
      entriesRef,
      where('userEmail', '==', userEmail),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const entries: DailyEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      entries.push(doc.data() as DailyEntry);
    });
    
    console.log(`✅ ${entries.length} entradas cargadas desde Firebase`);
    return entries;
  } catch (error) {
    console.error('❌ Error obteniendo entradas:', error);
    return [];
  }
};

// Obtener entradas de los últimos N días
export const getRecentEntries = async (days: number = 7): Promise<DailyEntry[]> => {
  try {
    const userEmail = getUserEmail();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const entriesRef = collection(db, 'dailyEntries');
    const q = query(
      entriesRef,
      where('userEmail', '==', userEmail),
      where('date', '>=', startDate.toISOString()),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const entries: DailyEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      entries.push(doc.data() as DailyEntry);
    });
    
    return entries;
  } catch (error) {
    console.error('❌ Error obteniendo entradas recientes:', error);
    return [];
  }
};
