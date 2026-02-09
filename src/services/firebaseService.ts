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
  Timestamp,
  addDoc,
  writeBatch
} from 'firebase/firestore';
import { DailyEntry, ActivityLog, TimeLog, Activity, Task } from '../types';
import { sanitizeText, sanitizeName, sanitizeNote, isValidEmail } from '../utils/sanitizer';

// Obtener el email del usuario (identificador único)
const getUserEmail = (): string => {
  const email = localStorage.getItem('daylo-user-email') || 'anonymous';
  // Validar email antes de usarlo
  if (email !== 'anonymous' && !isValidEmail(email)) {
    console.error('⚠️ Email inválido detectado');
    return 'anonymous';
  }
  return email;
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
    // Validar y sanitizar inputs
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    
    const sanitizedName = sanitizeName(name);
    if (!sanitizedName || sanitizedName.length < 2) {
      throw new Error('Nombre debe tener al menos 2 caracteres');
    }
    
    const userDoc = doc(db, 'users', email);
    await setDoc(userDoc, {
      name: sanitizedName,
      email: email.toLowerCase(), // Normalizar email
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
    
    // Validación crítica: verificar que hay email
    if (!userEmail || userEmail === 'anonymous') {
      console.error('❌ No se puede guardar: Email de usuario no encontrado');
      console.log('🚨 Por favor ingresa con tu email primero');
      throw new Error('Email de usuario no encontrado');
    }
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const entryId = `${userEmail}_${today}`;
    
    const entryData = {
      ...entry,
      userEmail,
      date: entry.date || new Date().toISOString(),
      updatedAt: Timestamp.now(),
    };
    
    console.log('💾 INTENTANDO GUARDAR EN FIREBASE:');
    console.log('📍 Colección: dailyEntries');
    console.log('🆔 Document ID:', entryId);
    console.log('📧 User Email:', userEmail);
    console.log('📊 Datos:', {
      entryId,
      userEmail,
      activities: entry.activities?.length || 0,
      tasks: entry.tasks?.length || 0,
      emotionalCheckIn: entry.emotionalCheckIn ? '✅' : '❌',
      dayIntention: entry.dayIntention ? '✅' : '❌',
      diaryNote: entry.diaryNote ? '✅' : '❌'
    });

    await setDoc(doc(db, 'dailyEntries', entryId), entryData, { merge: true });
    console.log('✅ Entrada guardada exitosamente en Firebase:', entryId);
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
      const data = docSnap.data() as DailyEntry;
      // Validar que la fecha del documento sea realmente de hoy
      const docDate = new Date(data.date).toISOString().split('T')[0];
      if (docDate !== today) {
        console.warn('⚠️ Documento encontrado pero no es del día actual:', docDate, 'vs', today);
        return null;
      }
      return data;
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo entrada de hoy:', error);
    return null;
  }
};

// Obtener todas las entradas del usuario (simplificado para evitar índices)
export const getAllUserEntries = async (): Promise<DailyEntry[]> => {
  try {
    const userEmail = getUserEmail();
    const entriesRef = collection(db, 'dailyEntries');
    // Consulta simplificada - solo filtrar por usuario  
    const q = query(
      entriesRef,
      where('userEmail', '==', userEmail)
    );
    
    const querySnapshot = await getDocs(q);
    const entries: DailyEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      entries.push(doc.data() as DailyEntry);
    });
    
    // Ordenar en cliente en lugar de servidor
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    console.log(`✅ ${entries.length} entradas cargadas desde Firebase`);
    return entries;
  } catch (error) {
    console.error('❌ Error obteniendo entradas:', error);
    return [];
  }
};

// Obtener entradas de los últimos N días (simplificado)
export const getRecentEntries = async (days: number = 7): Promise<DailyEntry[]> => {
  try {
    const userEmail = getUserEmail();
    const entriesRef = collection(db, 'dailyEntries');
    // Solo filtrar por usuario - ordenar en cliente
    const q = query(
      entriesRef,
      where('userEmail', '==', userEmail)
    );
    
    const querySnapshot = await getDocs(q);
    const entries: DailyEntry[] = [];
    
    // Filtrar por fecha en cliente
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    querySnapshot.forEach((doc) => {
      const entry = doc.data() as DailyEntry;
      const entryDate = new Date(entry.date);
      if (entryDate >= cutoffDate) {
        entries.push(entry);
      }
    });
    
    // Ordenar por fecha descendente
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return entries;
  } catch (error) {
    console.error('❌ Error obteniendo entradas recientes:', error);
    return [];
  }
};

// Guardar log de actividad en Firebase
export const saveActivityLog = async (log: ActivityLog): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    
    // Filtrar campos undefined para Firebase
    const cleanLog: any = {
      id: log.id,
      activityIcon: log.activityIcon,
      activityLabel: log.activityLabel,
      duration: log.duration,
      timestamp: Timestamp.now(),
      date: log.date,
      userEmail,
    };
    
    // Solo agregar campos opcionales si están definidos
    if (log.facets && Object.keys(log.facets).length > 0) {
      cleanLog.facets = log.facets;
    }
    if (log.notes && log.notes.trim().length > 0) {
      cleanLog.notes = log.notes;
    }
    if (log.energyImpact) {
      cleanLog.energyImpact = log.energyImpact;
    }

    await addDoc(collection(db, 'activityHistory'), cleanLog);
    console.log('✅ Activity log guardado en Firebase');
  } catch (error) {
    console.error('❌ Error guardando activity log:', error);
    throw error;
  }
};

// Guardar log de tiempo en Firebase
export const saveTimeLog = async (log: TimeLog): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    const logData = {
      ...log,
      userEmail,
      timestamp: Timestamp.now(),
    };

    await addDoc(collection(db, 'timeHistory'), logData);
    console.log('✅ Time log guardado en Firebase');
  } catch (error) {
    console.error('❌ Error guardando time log:', error);
    throw error;
  }
};

// Obtener historial de actividades (simplificado)
export const getActivityHistory = async (days: number = 30): Promise<ActivityLog[]> => {
  try {
    const userEmail = getUserEmail();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];
    
    const historyRef = collection(db, 'activityHistory');
    // Solo filtrar por usuario - hacer filtrado de fecha en cliente
    const q = query(
      historyRef,
      where('userEmail', '==', userEmail)
    );
    
    const querySnapshot = await getDocs(q);
    const logs: ActivityLog[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id } as ActivityLog;
      // Filtrar por fecha en cliente
      if (data.date >= cutoffDateStr) {
        logs.push(data);
      }
    });
    
    // Ordenar en cliente
    logs.sort((a, b) => {
      // Primero por fecha, luego por timestamp
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date);
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    
    console.log(`✅ ${logs.length} activity logs cargados desde Firebase`);
    return logs;
  } catch (error) {
    console.error('❌ Error obteniendo historial de actividades:', error);
    return [];
  }
};

// Obtener historial de tiempo (simplificado)
export const getTimeHistory = async (days: number = 30): Promise<TimeLog[]> => {
  try {
    const userEmail = getUserEmail();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];
    
    const historyRef = collection(db, 'timeHistory');
    // Solo filtrar por usuario - hacer filtrado de fecha en cliente
    const q = query(
      historyRef,
      where('userEmail', '==', userEmail)
    );
    
    const querySnapshot = await getDocs(q);
    const logs: TimeLog[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id } as TimeLog;
      // Filtrar por fecha en cliente
      if (data.date >= cutoffDateStr) {
        logs.push(data);
      }
    });
    
    // Ordenar en cliente
    logs.sort((a, b) => {
      // Primero por fecha, luego por timestamp
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date);
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    
    console.log(`✅ ${logs.length} time logs cargados desde Firebase`);
    return logs;
  } catch (error) {
    console.error('❌ Error obteniendo historial de tiempo:', error);
    return [];
  }
};

// ============================================================================
// 🆕 NUEVAS FUNCIONES - ARQUITECTURA ESPECIALIZADA
// ============================================================================

// 1. OBJETIVOS DEL USUARIO (onboarding profundo)
export const saveUserObjectives = async (objectives: {
  currentGoal: string;
  futureVision: string;
  mainObstacle: string;
}): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    // Sanitizar todos los campos de texto
    const sanitizedObjectives = {
      currentGoal: sanitizeText(objectives.currentGoal, 500),
      futureVision: sanitizeText(objectives.futureVision, 500),
      mainObstacle: sanitizeText(objectives.mainObstacle, 500),
    };

    const docRef = doc(db, 'user_objectives', userEmail);
    await setDoc(docRef, {
      userEmail,
      ...sanitizedObjectives,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }, { merge: true });

    console.log('✅ Objetivos del usuario guardados:', userEmail);
  } catch (error) {
    console.error('❌ Error guardando objetivos:', error);
    throw error;
  }
};

export const getUserObjectives = async (): Promise<{
  currentGoal: string;
  futureVision: string;
  mainObstacle: string;
} | null> => {
  try {
    const userEmail = getUserEmail();
    const docRef = doc(db, 'user_objectives', userEmail);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        currentGoal: data.currentGoal,
        futureVision: data.futureVision,
        mainObstacle: data.mainObstacle,
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo objetivos:', error);
    return null;
  }
};

// 2. INTENCIONES DIARIAS (actualizable durante el día)
export const saveDailyIntention = async (intention: {
  intention: string;
  feelingContext: string;
  isNegativeEmotion: boolean;
  shareThoughts?: string;
}): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${today}`;
    
    // Filtrar campos undefined para evitar errores de Firebase
    const cleanIntention: any = {
      userEmail,
      date: today,
      intention: intention.intention,
      feelingContext: intention.feelingContext,
      isNegativeEmotion: intention.isNegativeEmotion,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // Solo agregar shareThoughts si tiene valor
    if (intention.shareThoughts !== undefined && intention.shareThoughts !== '') {
      cleanIntention.shareThoughts = intention.shareThoughts;
    }
    
    const docRef = doc(db, 'daily_intentions', docId);
    await setDoc(docRef, cleanIntention, { merge: true });

    console.log('✅ Intención diaria guardada:', docId);
  } catch (error) {
    console.error('❌ Error guardando intención diaria:', error);
    throw error;
  }
};

export const getDailyIntention = async (date?: string): Promise<{
  intention: string;
  feelingContext: string;
  shareThoughts?: string;
} | null> => {
  try {
    const userEmail = getUserEmail();
    const targetDate = date || new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${targetDate}`;
    
    const docRef = doc(db, 'daily_intentions', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validar que la fecha del documento coincida
      if (data.date && data.date !== targetDate) {
        console.warn('⚠️ Fecha de intención no coincide:', data.date, 'vs', targetDate);
        return null;
      }
      return {
        intention: data.intention,
        feelingContext: data.feelingContext,
        shareThoughts: data.shareThoughts,
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo intención diaria:', error);
    return null;
  }
};

// 3. ACTIVIDADES DIARIAS (Mi Día completo con facetas)
export const saveDailyActivities = async (activities: Activity[]): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${today}`;
    
    // Calcular estadísticas
    const totalMinutes = activities.reduce((sum, act) => sum + (act.duration || 0), 0);
    const energyDistribution = {
      drain: activities.filter(a => a.energyImpact === 'drain').length,
      neutral: activities.filter(a => a.energyImpact === 'neutral').length,
      boost: activities.filter(a => a.energyImpact === 'boost').length,
    };

    const docRef = doc(db, 'daily_activities', docId);
    await setDoc(docRef, {
      userEmail,
      date: today,
      activities: activities.map(act => ({
        ...act,
        timestamp: Timestamp.now(),
      })),
      totalMinutes,
      activitiesCount: activities.length,
      energyDistribution,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }, { merge: true });

    console.log('✅ Actividades diarias guardadas:', docId, `(${activities.length} actividades)`);
  } catch (error) {
    console.error('❌ Error guardando actividades diarias:', error);
    throw error;
  }
};

export const getDailyActivities = async (date?: string): Promise<Activity[]> => {
  try {
    const userEmail = getUserEmail();
    const targetDate = date || new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${targetDate}`;
    
    const docRef = doc(db, 'daily_activities', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validar que la fecha del documento coincida con la solicitada
      if (data.date && data.date !== targetDate) {
        console.warn('⚠️ Fecha de documento no coincide:', data.date, 'vs', targetDate);
        return [];
      }
      return data.activities || [];
    }
    return [];
  } catch (error) {
    console.error('❌ Error obteniendo actividades diarias:', error);
    return [];
  }
};

// 4. EMOCIONES DIARIAS (check-in emocional)
export const saveDailyEmotion = async (emotion: {
  feeling: string;
  shareThoughts?: string;
  actionIntention?: string;
  isNewUser: boolean;
}): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${today}`;
    
    // Filtrar campos undefined para evitar errores de Firebase
    const cleanEmotion: any = {
      userEmail,
      date: today,
      feeling: emotion.feeling,
      isNewUser: emotion.isNewUser,
      timestamp: Timestamp.now(),
    };

    // Solo agregar campos opcionales si tienen valor
    if (emotion.shareThoughts !== undefined && emotion.shareThoughts !== '') {
      cleanEmotion.shareThoughts = emotion.shareThoughts;
    }

    if (emotion.actionIntention !== undefined && emotion.actionIntention !== '') {
      cleanEmotion.actionIntention = emotion.actionIntention;
    }
    
    const docRef = doc(db, 'daily_emotions', docId);
    await setDoc(docRef, cleanEmotion, { merge: true });

    console.log('✅ Emoción diaria guardada:', docId, emotion.feeling);
  } catch (error) {
    console.error('❌ Error guardando emoción diaria:', error);
    throw error;
  }
};

export const getDailyEmotion = async (date?: string): Promise<{
  feeling: string;
  shareThoughts?: string;
  actionIntention?: string;
} | null> => {
  try {
    const userEmail = getUserEmail();
    const targetDate = date || new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${targetDate}`;
    
    const docRef = doc(db, 'daily_emotions', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validar que la fecha del documento coincida
      if (data.date && data.date !== targetDate) {
        console.warn('⚠️ Fecha de emoción no coincide:', data.date, 'vs', targetDate);
        return null;
      }
      return {
        feeling: data.feeling,
        shareThoughts: data.shareThoughts,
        actionIntention: data.actionIntention,
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo emoción diaria:', error);
    return null;
  }
};

// 5. TAREAS DIARIAS
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${today}`;
    
    const completedTasks = tasks.filter(t => t.completed).length;
    const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

    const docRef = doc(db, 'tasks', docId);
    await setDoc(docRef, {
      userEmail,
      date: today,
      tasks,
      totalTasks: tasks.length,
      completedTasks,
      completionRate,
      updatedAt: Timestamp.now(),
    }, { merge: true });

    console.log('✅ Tareas guardadas:', docId, `(${tasks.length} tareas, ${completedTasks} completadas)`);
  } catch (error) {
    console.error('❌ Error guardando tareas:', error);
    throw error;
  }
};

export const getTasks = async (date?: string): Promise<Task[]> => {
  try {
    const userEmail = getUserEmail();
    const targetDate = date || new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${targetDate}`;
    
    const docRef = doc(db, 'tasks', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validar que la fecha del documento coincida
      if (data.date && data.date !== targetDate) {
        console.warn('⚠️ Fecha de tareas no coincide:', data.date, 'vs', targetDate);
        return [];
      }
      return data.tasks || [];
    }
    return [];
  } catch (error) {
    console.error('❌ Error obteniendo tareas:', error);
    return [];
  }
};

// 6. NOTAS DE DIARIO
export const saveDiaryNote = async (note: string): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${today}`;
    
    // Sanitizar nota antes de guardar
    const sanitizedNote = sanitizeNote(note);
    const wordCount = sanitizedNote.trim().split(/\s+/).length;

    const docRef = doc(db, 'diary_notes', docId);
    await setDoc(docRef, {
      userEmail,
      date: today,
      note: sanitizedNote,
      wordCount,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }, { merge: true });

    console.log('✅ Nota de diario guardada:', docId, `(${wordCount} palabras)`);
  } catch (error) {
    console.error('❌ Error guardando nota de diario:', error);
    throw error;
  }
};

export const getDiaryNote = async (date?: string): Promise<string | null> => {
  try {
    const userEmail = getUserEmail();
    const targetDate = date || new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${targetDate}`;
    
    const docRef = doc(db, 'diary_notes', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validar que la fecha del documento coincida
      if (data.date && data.date !== targetDate) {
        console.warn('⚠️ Fecha de nota no coincide:', data.date, 'vs', targetDate);
        return null;
      }
      return data.note || null;
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo nota de diario:', error);
    return null;
  }
};

// Guardar historia del día (cierre narrativo)
export const saveDayStory = async (dayStory: {
  howStarted?: string
  mostSignificant?: string
  howClosing?: string
}): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${today}`;
    
    // Sanitizar todos los campos
    const sanitizedStory = {
      howStarted: dayStory.howStarted ? sanitizeText(dayStory.howStarted) : undefined,
      mostSignificant: dayStory.mostSignificant ? sanitizeText(dayStory.mostSignificant) : undefined,
      howClosing: dayStory.howClosing ? sanitizeText(dayStory.howClosing) : undefined,
    };

    const docRef = doc(db, 'day_stories', docId);
    await setDoc(docRef, {
      userEmail,
      date: today,
      ...sanitizedStory,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }, { merge: true });

    console.log('✅ Historia del día guardada:', docId);
  } catch (error) {
    console.error('❌ Error guardando historia del día:', error);
    throw error;
  }
};

export const getDayStory = async (date?: string): Promise<{
  howStarted?: string
  mostSignificant?: string
  howClosing?: string
} | null> => {
  try {
    const userEmail = getUserEmail();
    const targetDate = date || new Date().toISOString().split('T')[0];
    const docId = `${userEmail}_${targetDate}`;
    
    const docRef = doc(db, 'day_stories', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validar que la fecha del documento coincida
      if (data.date && data.date !== targetDate) {
        console.warn('⚠️ Fecha de historia no coincide:', data.date, 'vs', targetDate);
        return null;
      }
      return {
        howStarted: data.howStarted,
        mostSignificant: data.mostSignificant,
        howClosing: data.howClosing,
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo historia del día:', error);
    return null;
  }
};

// 7. CATÁLOGO DE ACTIVIDADES (setup inicial)
export const populateActivitiesCatalog = async (): Promise<void> => {
  try {
    // Verificar si ya existe el catálogo
    const existingCatalog = await getActivitiesCatalog();
    if (existingCatalog.length >= 9) {
      console.log('✅ Catálogo ya existe (', existingCatalog.length, 'actividades)');
      return;
    }

    console.log('🔨 Creando catálogo de actividades...');
    
    const activitiesCatalog = [
      {
        id: 'work',
        label: 'Trabajo',
        emoji: '💼',
        color: '#3B82F6',
        defaultDuration: 60,
        facets: [
          { id: 'productivity', label: '¿Qué tan productivo fue?', type: 'rating', emoji: '📊', min: 1, max: 5 },
          { id: 'stress', label: '¿Nivel de estrés?', type: 'rating', emoji: '😰', min: 1, max: 5 },
          { id: 'wasRemote', label: '¿Fue remoto?', type: 'boolean', emoji: '🏠' },
        ],
        order: 1,
      },
      {
        id: 'exercise',
        label: 'Ejercicio',
        emoji: '🏋️',
        color: '#10B981',
        defaultDuration: 45,
        facets: [
          { id: 'intensity', label: '¿Qué tan intenso fue?', type: 'rating', emoji: '💪', min: 1, max: 5 },
          { id: 'enjoyment', label: '¿Qué tanto lo disfrutaste?', type: 'rating', emoji: '😊', min: 1, max: 5 },
        ],
        order: 2,
      },
      {
        id: 'social',
        label: 'Social',
        emoji: '👥',
        color: '#F59E0B',
        defaultDuration: 90,
        facets: [
          { id: 'connection', label: '¿Qué tan conectado te sentiste?', type: 'rating', emoji: '🤝', min: 1, max: 5 },
          { id: 'energy', label: '¿Te dio o quitó energía?', type: 'rating', emoji: '⚡', min: 1, max: 5 },
        ],
        order: 3,
      },
      {
        id: 'study',
        label: 'Estudio',
        emoji: '📚',
        color: '#8B5CF6',
        defaultDuration: 60,
        facets: [
          { id: 'focus', label: '¿Qué tan concentrado estuviste?', type: 'rating', emoji: '🎯', min: 1, max: 5 },
          { id: 'understanding', label: '¿Qué tanto entendiste?', type: 'rating', emoji: '💡', min: 1, max: 5 },
        ],
        order: 4,
      },
      {
        id: 'sleep',
        label: 'Descanso',
        emoji: '😴',
        color: '#6366F1',
        defaultDuration: 480,
        facets: [
          { id: 'quality', label: '¿Calidad del sueño?', type: 'rating', emoji: '🌙', min: 1, max: 5 },
          { id: 'uninterrupted', label: '¿Dormiste de corrido?', type: 'boolean', emoji: '💤' },
        ],
        order: 5,
      },
      {
        id: 'food',
        label: 'Comida',
        emoji: '🍽️',
        color: '#EF4444',
        defaultDuration: 30,
        facets: [
          { id: 'healthy', label: '¿Qué tan saludable fue?', type: 'rating', emoji: '🥗', min: 1, max: 5 },
          { id: 'satisfaction', label: '¿Qué tan satisfecho quedaste?', type: 'rating', emoji: '😋', min: 1, max: 5 },
        ],
        order: 6,
      },
      {
        id: 'hobbies',
        label: 'Hobbies',
        emoji: '🎨',
        color: '#EC4899',
        defaultDuration: 60,
        facets: [
          { id: 'enjoyment', label: '¿Qué tanto lo disfrutaste?', type: 'rating', emoji: '🎉', min: 1, max: 5 },
          { id: 'flow', label: '¿Entraste en flow?', type: 'boolean', emoji: '🌊' },
        ],
        order: 7,
      },
      {
        id: 'health',
        label: 'Salud',
        emoji: '🏥',
        color: '#14B8A6',
        defaultDuration: 45,
        facets: [
          { id: 'necessary', label: '¿Era necesario?', type: 'boolean', emoji: '⚕️' },
          { id: 'stress', label: '¿Nivel de estrés?', type: 'rating', emoji: '😰', min: 1, max: 5 },
        ],
        order: 8,
      },
      {
        id: 'home',
        label: 'Hogar',
        emoji: '🏠',
        color: '#F97316',
        defaultDuration: 45,
        facets: [
          { id: 'satisfaction', label: '¿Qué tan satisfecho quedaste?', type: 'rating', emoji: '✨', min: 1, max: 5 },
          { id: 'wasTiring', label: '¿Fue cansado?', type: 'boolean', emoji: '😓' },
        ],
        order: 9,
      },
    ];

    const batch = writeBatch(db);
    
    for (const activity of activitiesCatalog) {
      const docRef = doc(db, 'activities_catalog', activity.id);
      batch.set(docRef, activity);
    }

    await batch.commit();
    console.log('✅ Catálogo de actividades poblado exitosamente (9 actividades)');
  } catch (error) {
    console.error('❌ Error poblando catálogo de actividades:', error);
    throw error;
  }
};

export const getActivitiesCatalog = async (): Promise<any[]> => {
  try {
    const catalogRef = collection(db, 'activities_catalog');
    const q = query(catalogRef, orderBy('order'));
    const querySnapshot = await getDocs(q);
    
    const catalog: any[] = [];
    querySnapshot.forEach((doc) => {
      catalog.push({ ...doc.data(), id: doc.id });
    });
    
    console.log(`✅ Catálogo de actividades cargado (${catalog.length} actividades)`);
    return catalog;
  } catch (error) {
    console.error('❌ Error obteniendo catálogo de actividades:', error);
    return [];
  }
};

// 8. DASHBOARD DATA (agregación mensual)
export const updateDashboardData = async (month?: string): Promise<void> => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail || userEmail === 'anonymous') {
      throw new Error('Email de usuario no encontrado');
    }

    const targetMonth = month || new Date().toISOString().slice(0, 7); // YYYY-MM
    const docId = `${userEmail}_${targetMonth}`;

    // Aquí se realizaría la agregación de datos del mes
    // Por ahora, creamos una estructura básica
    const docRef = doc(db, 'dashboard_data', docId);
    await setDoc(docRef, {
      userEmail,
      month: targetMonth,
      totalActivities: 0,
      totalMinutes: 0,
      activitiesByType: {},
      emotionsSummary: {},
      energyPatterns: { drain: 0, neutral: 0, boost: 0 },
      activeDays: 0,
      totalDays: 0,
      activePercentage: 0,
      totalTasksCreated: 0,
      totalTasksCompleted: 0,
      avgCompletionRate: 0,
      updatedAt: Timestamp.now(),
    }, { merge: true });

    console.log('✅ Dashboard data actualizado:', docId);
  } catch (error) {
    console.error('❌ Error actualizando dashboard data:', error);
    throw error;
  }
};

export const getDashboardData = async (month?: string): Promise<any | null> => {
  try {
    const userEmail = getUserEmail();
    const targetMonth = month || new Date().toISOString().slice(0, 7);
    const docId = `${userEmail}_${targetMonth}`;
    
    const docRef = doc(db, 'dashboard_data', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo dashboard data:', error);
    return null;
  }
};
