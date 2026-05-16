/* ============================================================
   KUPACK SUITE — app.js
   Núcleo: navegación, temas, idioma, localStorage, utilidades
   ============================================================ */

'use strict';

/* ============================================================
   1. ESTADO GLOBAL
   ============================================================ */
const KupackApp = {
  version: '2.0.0',

  // Preferencias del usuario (persisten en localStorage)
  prefs: {
    theme:    'dark',     // dark | light | contrast
    accent:   'orange',   // orange | blue | green | purple | red
    fontsize: 'normal',   // compact | normal | large
    lang:     'es',       // es | en | fr | de | pt | it
    tempAlert: 45,        // ºC
    chemistry: 'NMC',     // NMC | LFP | NCA | LTO
    units:    'metric',   // metric | imperial
    warnings: true,
  },

  // Vista activa
  currentView: 'home',

  // Historial de recientes
  recents: [],

  // Traducciones cargadas
  i18n: {},
};

/* ============================================================
   2. LOCALIZACIÓN (i18n)
   ============================================================ */
const TRANSLATIONS = {
  es: {
    'nav.home':        'Inicio',
    'nav.calculator':  'Calc',
    'nav.decoder':     'Decoder',
    'nav.balancer':    'Balancer',
    'nav.settings':    'Ajustes',
    'home.tagline':    'Diseño · Análisis · Trazabilidad',
    'home.recent':     'Recientes',
    'home.modules':    'Módulos',
    'home.secondary':  'Herramientas',
    'mod.balancer.name': 'Pack Balancer',
    'mod.balancer.desc': 'Capacidades, topología nS×nP, agrupación de celdas',
    'mod.decoder.name':  'Date Decoder',
    'mod.decoder.desc':  'Fechas de fabricación: Samsung, LG, Panasonic, QR...',
    'mod.calculator.name': 'Pack Calculator',
    'mod.calculator.desc': 'Autonomía, temperatura, descarga, cargador ideal',
    'mod.designer.name': 'Designer 3D',
    'mod.designer.desc': 'Diseño visual del pack con puentes y BMS',
    'mod.comparator.name': 'Comparador',
    'mod.comparator.desc': 'Compara hasta 4 celdas de la base de datos',
    'mod.diagnosis.name': 'Diagnóstico',
    'mod.diagnosis.desc': 'Estado del pack, celdas a reemplazar',
    'mod.welder.name':  'Soldadura',
    'mod.welder.desc':  'Grosor de níquel, pulsos, potencia de soldadora',
    'mod.solar.name':   'Solar',
    'mod.solar.desc':   'Próximamente',
    'settings.title':  'Ajustes',
    'settings.appearance': 'Apariencia',
    'settings.theme':  'Tema',
    'settings.accent': 'Color de acento',
    'settings.fontsize': 'Tamaño de texto',
    'settings.lang':   'Idioma',
    'settings.calc':   'Cálculo',
    'settings.chemistry': 'Química por defecto',
    'settings.units':  'Unidades',
    'settings.temp_alert': 'Alerta de temperatura',
    'settings.warnings': 'Advertencias de seguridad',
    'settings.data':   'Datos',
    'settings.export': 'Exportar proyectos',
    'settings.import': 'Importar proyectos',
    'settings.clear_history': 'Borrar historial',
    'settings.clear_all': 'Borrar todos los datos',
    'settings.about':  'Acerca de',
    'settings.version': 'Versión',
    'settings.youtube': 'Canal YouTube',
    'settings.contact': 'Contacto / Soporte',
    'theme.dark':      'Oscuro',
    'theme.light':     'Claro',
    'theme.contrast':  'Alto contraste',
    'accent.orange':   'Naranja',
    'accent.blue':     'Azul',
    'accent.green':    'Verde',
    'accent.purple':   'Morado',
    'accent.red':      'Rojo',
    'size.compact':    'Compacto',
    'size.normal':     'Normal',
    'size.large':      'Grande',
    'units.metric':    'Métrico',
    'units.imperial':  'Imperial',
    'btn.calculate':   'Calcular',
    'btn.decode':      'Interpretar',
    'btn.compare':     'Comparar',
    'btn.export':      'Exportar',
    'btn.import':      'Importar',
    'btn.close':       'Cerrar',
    'btn.back':        'Volver',
    'badge.new':       'NUEVO',
    'badge.soon':      'PRONTO',
    'toast.saved':     '✅ Guardado correctamente',
    'toast.exported':  '✅ Exportado correctamente',
    'toast.imported':  '✅ Importado correctamente',
    'toast.cleared':   '🗑️ Datos borrados',
    'toast.error':     '❌ Ha ocurrido un error',
    'toast.copied':    '📋 Copiado al portapapeles',
    'confirm.clear_all': '¿Seguro que quieres borrar TODOS los datos? Esta acción no se puede deshacer.',
    'confirm.clear_history': '¿Borrar el historial de cálculos?',
  },

  en: {
    'nav.home':        'Home',
    'nav.calculator':  'Calc',
    'nav.decoder':     'Decoder',
    'nav.balancer':    'Balancer',
    'nav.settings':    'Settings',
    'home.tagline':    'Design · Analysis · Traceability',
    'home.recent':     'Recent',
    'home.modules':    'Modules',
    'home.secondary':  'Tools',
    'mod.balancer.name': 'Pack Balancer',
    'mod.balancer.desc': 'Capacities, nS×nP topology, cell grouping',
    'mod.decoder.name':  'Date Decoder',
    'mod.decoder.desc':  'Manufacturing dates: Samsung, LG, Panasonic, QR...',
    'mod.calculator.name': 'Pack Calculator',
    'mod.calculator.desc': 'Range, temperature, discharge, ideal charger',
    'mod.designer.name': '3D Designer',
    'mod.designer.desc': 'Visual pack design with nickel strips and BMS',
    'mod.comparator.name': 'Comparator',
    'mod.comparator.desc': 'Compare up to 4 cells from the database',
    'mod.diagnosis.name': 'Diagnosis',
    'mod.diagnosis.desc': 'Pack health, cells to replace',
    'mod.welder.name':  'Spot Welding',
    'mod.welder.desc':  'Nickel thickness, pulses, welder power',
    'mod.solar.name':   'Solar',
    'mod.solar.desc':   'Coming soon',
    'settings.title':  'Settings',
    'settings.appearance': 'Appearance',
    'settings.theme':  'Theme',
    'settings.accent': 'Accent color',
    'settings.fontsize': 'Text size',
    'settings.lang':   'Language',
    'settings.calc':   'Calculation',
    'settings.chemistry': 'Default chemistry',
    'settings.units':  'Units',
    'settings.temp_alert': 'Temperature alert',
    'settings.warnings': 'Safety warnings',
    'settings.data':   'Data',
    'settings.export': 'Export projects',
    'settings.import': 'Import projects',
    'settings.clear_history': 'Clear history',
    'settings.clear_all': 'Clear all data',
    'settings.about':  'About',
    'settings.version': 'Version',
    'settings.youtube': 'YouTube channel',
    'settings.contact': 'Contact / Support',
    'theme.dark':      'Dark',
    'theme.light':     'Light',
    'theme.contrast':  'High contrast',
    'accent.orange':   'Orange',
    'accent.blue':     'Blue',
    'accent.green':    'Green',
    'accent.purple':   'Purple',
    'accent.red':      'Red',
    'size.compact':    'Compact',
    'size.normal':     'Normal',
    'size.large':      'Large',
    'units.metric':    'Metric',
    'units.imperial':  'Imperial',
    'btn.calculate':   'Calculate',
    'btn.decode':      'Decode',
    'btn.compare':     'Compare',
    'btn.export':      'Export',
    'btn.import':      'Import',
    'btn.close':       'Close',
    'btn.back':        'Back',
    'badge.new':       'NEW',
    'badge.soon':      'SOON',
    'toast.saved':     '✅ Saved successfully',
    'toast.exported':  '✅ Exported successfully',
    'toast.imported':  '✅ Imported successfully',
    'toast.cleared':   '🗑️ Data cleared',
    'toast.error':     '❌ An error occurred',
    'toast.copied':    '📋 Copied to clipboard',
    'confirm.clear_all': 'Are you sure you want to delete ALL data? This cannot be undone.',
    'confirm.clear_history': 'Clear calculation history?',
  },

  fr: {
    'nav.home':        'Accueil',
    'nav.calculator':  'Calc',
    'nav.decoder':     'Décodeur',
    'nav.balancer':    'Balancer',
    'nav.settings':    'Réglages',
    'home.tagline':    'Conception · Analyse · Traçabilité',
    'home.recent':     'Récents',
    'home.modules':    'Modules',
    'home.secondary':  'Outils',
    'mod.balancer.name': 'Pack Balancer',
    'mod.balancer.desc': 'Capacités, topologie nS×nP, regroupement',
    'mod.decoder.name':  'Décodeur de dates',
    'mod.decoder.desc':  'Dates de fabrication: Samsung, LG, Panasonic, QR...',
    'mod.calculator.name': 'Calculateur',
    'mod.calculator.desc': 'Autonomie, température, décharge, chargeur idéal',
    'mod.designer.name': 'Designer 3D',
    'mod.designer.desc': 'Conception visuelle avec nickel et BMS',
    'mod.comparator.name': 'Comparateur',
    'mod.comparator.desc': 'Comparer jusqu\'à 4 cellules',
    'mod.diagnosis.name': 'Diagnostic',
    'mod.diagnosis.desc': 'État du pack, cellules à remplacer',
    'mod.welder.name':  'Soudure',
    'mod.welder.desc':  'Épaisseur nickel, impulsions, puissance',
    'mod.solar.name':   'Solaire',
    'mod.solar.desc':   'Bientôt disponible',
    'btn.calculate':   'Calculer',
    'btn.decode':      'Décoder',
    'btn.close':       'Fermer',
    'btn.back':        'Retour',
    'badge.new':       'NOUVEAU',
    'badge.soon':      'BIENTÔT',
    'toast.saved':     '✅ Sauvegardé',
    'toast.error':     '❌ Une erreur est survenue',
    'toast.copied':    '📋 Copié',
    'confirm.clear_all': 'Voulez-vous supprimer TOUTES les données?',
  },

  de: {
    'nav.home':        'Start',
    'nav.calculator':  'Rechner',
    'nav.decoder':     'Decoder',
    'nav.balancer':    'Balancer',
    'nav.settings':    'Einstellungen',
    'home.tagline':    'Design · Analyse · Rückverfolgung',
    'home.recent':     'Zuletzt',
    'home.modules':    'Module',
    'home.secondary':  'Werkzeuge',
    'mod.balancer.name': 'Pack Balancer',
    'mod.balancer.desc': 'Kapazitäten, nS×nP Topologie, Zellgruppierung',
    'mod.decoder.name':  'Datums-Decoder',
    'mod.decoder.desc':  'Herstellungsdaten: Samsung, LG, Panasonic, QR...',
    'mod.calculator.name': 'Pack Rechner',
    'mod.calculator.desc': 'Reichweite, Temperatur, Entladung, Ladegerät',
    'mod.designer.name': '3D Designer',
    'mod.designer.desc': 'Visuelles Pack-Design mit Nickel und BMS',
    'mod.comparator.name': 'Vergleich',
    'mod.comparator.desc': 'Bis zu 4 Zellen vergleichen',
    'mod.diagnosis.name': 'Diagnose',
    'mod.diagnosis.desc': 'Pack-Zustand, zu ersetzende Zellen',
    'mod.welder.name':  'Schweißen',
    'mod.welder.desc':  'Nickeldicke, Impulse, Schweißerleistung',
    'mod.solar.name':   'Solar',
    'mod.solar.desc':   'Demnächst',
    'btn.calculate':   'Berechnen',
    'btn.decode':      'Dekodieren',
    'btn.close':       'Schließen',
    'btn.back':        'Zurück',
    'badge.new':       'NEU',
    'badge.soon':      'BALD',
    'toast.saved':     '✅ Gespeichert',
    'toast.error':     '❌ Ein Fehler ist aufgetreten',
    'toast.copied':    '📋 Kopiert',
    'confirm.clear_all': 'Alle Daten löschen?',
  },

  pt: {
    'nav.home':        'Início',
    'nav.calculator':  'Calc',
    'nav.decoder':     'Decoder',
    'nav.balancer':    'Balancer',
    'nav.settings':    'Definições',
    'home.tagline':    'Design · Análise · Rastreabilidade',
    'home.recent':     'Recentes',
    'home.modules':    'Módulos',
    'home.secondary':  'Ferramentas',
    'mod.balancer.name': 'Pack Balancer',
    'mod.balancer.desc': 'Capacidades, topologia nS×nP, agrupamento',
    'mod.decoder.name':  'Decoder de Datas',
    'mod.decoder.desc':  'Datas de fabrico: Samsung, LG, Panasonic, QR...',
    'mod.calculator.name': 'Calculadora',
    'mod.calculator.desc': 'Autonomia, temperatura, descarga, carregador ideal',
    'mod.designer.name': 'Designer 3D',
    'mod.designer.desc': 'Design visual com níquel e BMS',
    'mod.comparator.name': 'Comparador',
    'mod.comparator.desc': 'Comparar até 4 células',
    'mod.diagnosis.name': 'Diagnóstico',
    'mod.diagnosis.desc': 'Estado do pack, células a substituir',
    'mod.welder.name':  'Soldadura',
    'mod.welder.desc':  'Espessura níquel, impulsos, potência',
    'mod.solar.name':   'Solar',
    'mod.solar.desc':   'Em breve',
    'btn.calculate':   'Calcular',
    'btn.decode':      'Interpretar',
    'btn.close':       'Fechar',
    'btn.back':        'Voltar',
    'badge.new':       'NOVO',
    'badge.soon':      'BREVE',
    'toast.saved':     '✅ Guardado',
    'toast.error':     '❌ Ocorreu um erro',
    'toast.copied':    '📋 Copiado',
    'confirm.clear_all': 'Apagar TODOS os dados?',
  },

  it: {
    'nav.home':        'Home',
    'nav.calculator':  'Calc',
    'nav.decoder':     'Decoder',
    'nav.balancer':    'Balancer',
    'nav.settings':    'Impostazioni',
    'home.tagline':    'Progettazione · Analisi · Tracciabilità',
    'home.recent':     'Recenti',
    'home.modules':    'Moduli',
    'home.secondary':  'Strumenti',
    'mod.balancer.name': 'Pack Balancer',
    'mod.balancer.desc': 'Capacità, topologia nS×nP, raggruppamento celle',
    'mod.decoder.name':  'Decoder Date',
    'mod.decoder.desc':  'Date di produzione: Samsung, LG, Panasonic, QR...',
    'mod.calculator.name': 'Calcolatore',
    'mod.calculator.desc': 'Autonomia, temperatura, scarica, caricabatterie',
    'mod.designer.name': 'Designer 3D',
    'mod.designer.desc': 'Design visivo con nichel e BMS',
    'mod.comparator.name': 'Comparatore',
    'mod.comparator.desc': 'Confronta fino a 4 celle',
    'mod.diagnosis.name': 'Diagnosi',
    'mod.diagnosis.desc': 'Stato del pack, celle da sostituire',
    'mod.welder.name':  'Saldatura',
    'mod.welder.desc':  'Spessore nichel, impulsi, potenza',
    'mod.solar.name':   'Solare',
    'mod.solar.desc':   'Prossimamente',
    'btn.calculate':   'Calcola',
    'btn.decode':      'Interpreta',
    'btn.close':       'Chiudi',
    'btn.back':        'Indietro',
    'badge.new':       'NUOVO',
    'badge.soon':      'PRESTO',
    'toast.saved':     '✅ Salvato',
    'toast.error':     '❌ Si è verificato un errore',
    'toast.copied':    '📋 Copiato',
    'confirm.clear_all': 'Eliminare TUTTI i dati?',
  },
};

/** Traducir una clave. Si no existe en el idioma activo, fallback a ES, luego a la clave */
function t(key) {
  const lang = KupackApp.prefs.lang;
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key])
    || (TRANSLATIONS['es'] && TRANSLATIONS['es'][key])
    || key;
}

/* ============================================================
   3. LOCALSTORE — Guardar y cargar preferencias
   ============================================================ */
const LS_PREFS   = 'kupack_prefs';
const LS_RECENTS = 'kupack_recents';
const LS_HISTORY = 'kupack_history';

function savePrefs() {
  try { localStorage.setItem(LS_PREFS, JSON.stringify(KupackApp.prefs)); } catch(e) {}
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem(LS_PREFS);
    if (raw) Object.assign(KupackApp.prefs, JSON.parse(raw));
  } catch(e) {}
}

function saveRecents() {
  try { localStorage.setItem(LS_RECENTS, JSON.stringify(KupackApp.recents)); } catch(e) {}
}

function loadRecents() {
  try {
    const raw = localStorage.getItem(LS_RECENTS);
    if (raw) KupackApp.recents = JSON.parse(raw);
  } catch(e) {}
}

/** Añadir entrada al historial de recientes */
function addRecent(type, label, color, data) {
  KupackApp.recents.unshift({ type, label, color, data, ts: Date.now() });
  KupackApp.recents = KupackApp.recents.slice(0, 10); // máx 10
  saveRecents();
  renderRecents();
}

/* ============================================================
   4. SISTEMA DE TEMAS
   ============================================================ */
function applyTheme(theme, accent, fontsize) {
  const root = document.documentElement;
  root.setAttribute('data-theme',    theme    || KupackApp.prefs.theme);
  root.setAttribute('data-accent',   accent   || KupackApp.prefs.accent);
  root.setAttribute('data-fontsize', fontsize || KupackApp.prefs.fontsize);
}

function setTheme(theme) {
  KupackApp.prefs.theme = theme;
  applyTheme();
  savePrefs();
}

function setAccent(accent) {
  KupackApp.prefs.accent = accent;
  applyTheme();
  savePrefs();
}

function setFontSize(size) {
  KupackApp.prefs.fontsize = size;
  applyTheme();
  savePrefs();
}

/* ============================================================
   5. NAVEGACIÓN
   ============================================================ */
const VIEWS = ['home', 'calculator', 'decoder', 'balancer', 'settings',
               'comparator', 'diagnosis', 'welder', 'designer'];
const NAV_ITEMS = ['home', 'calculator', 'decoder', 'balancer', 'settings'];

function goTo(viewName) {
  // Ocultar todas las vistas
  VIEWS.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.classList.remove('active');
  });

  // Mostrar vista destino
  const target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('active');

  // Actualizar nav inferior
  NAV_ITEMS.forEach(v => {
    const el = document.getElementById('nav-' + v);
    if (el) el.classList.remove('active');
  });
  const navEl = document.getElementById('nav-' + viewName);
  if (navEl) navEl.classList.add('active');

  // Designer: modo inmersivo
  if (viewName === 'designer') {
    document.getElementById('bottom-nav')?.classList.add('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    document.getElementById('bottom-nav')?.classList.remove('hidden');
    document.body.style.overflow = '';
  }

  KupackApp.currentView = viewName;

  // Scroll al tope
  const body = target?.querySelector('.module-body');
  if (body) body.scrollTop = 0;
}

/* ============================================================
   6. SISTEMA DE TOASTS
   ============================================================ */
function showToast(message, type = 'default', duration = 2800) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ============================================================
   7. EXPORTAR / IMPORTAR PROYECTOS
   ============================================================ */
function exportProject(tipo, datos) {
  const payload = {
    version: KupackApp.version,
    tipo,
    fecha: new Date().toISOString().split('T')[0],
    datos,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `kupack_${tipo}_${payload.fecha}.kupack.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(t('toast.exported'), 'success');
}

function importProject(callback) {
  const input = document.createElement('input');
  input.type  = 'file';
  input.accept = '.json,.kupack.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        showToast(t('toast.imported'), 'success');
        if (callback) callback(data);
      } catch {
        showToast(t('toast.error'), 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function exportAllProjects() {
  try {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('kupack_')) {
        all[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `kupack_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('toast.exported'), 'success');
  } catch {
    showToast(t('toast.error'), 'error');
  }
}

/* ============================================================
   8. UTILIDADES GENERALES
   ============================================================ */

/** Copiar texto al portapapeles */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(t('toast.copied'));
  } catch {
    showToast(t('toast.error'), 'error');
  }
}

/** Formatear número con decimales */
function fmt(n, decimals = 1) {
  return Number(n).toFixed(decimals);
}

/** Convertir unidades si el usuario usa imperial */
function toUserUnit(value, type) {
  if (KupackApp.prefs.units === 'imperial') {
    if (type === 'km') return { val: fmt(value * 0.6214, 1), unit: 'mi' };
    if (type === 'kg') return { val: fmt(value * 2.2046, 2), unit: 'lb' };
  }
  if (type === 'km') return { val: fmt(value, 1), unit: 'km' };
  if (type === 'kg') return { val: fmt(value, 2), unit: 'kg' };
  return { val: fmt(value, 1), unit: type };
}

/** Interpolar temperatura desde datos medidos */
function interpolateTemp(cell, currentA) {
  // Datos disponibles: temp_5a, temp_10a, temp_15a, temp_20a
  const points = [
    { a: 1,  t: cell.temp_1a  || 25 },
    { a: 5,  t: cell.temp_5a  || 30 },
    { a: 10, t: cell.temp_10a || null },
    { a: 15, t: cell.temp_15a || null },
    { a: 20, t: cell.temp_20a || null },
  ].filter(p => p.t !== null);

  if (points.length < 2) return null;
  if (currentA <= points[0].a) return points[0].t;
  if (currentA >= points[points.length - 1].a) return points[points.length - 1].t;

  for (let i = 0; i < points.length - 1; i++) {
    if (currentA >= points[i].a && currentA <= points[i+1].a) {
      const ratio = (currentA - points[i].a) / (points[i+1].a - points[i].a);
      return points[i].t + ratio * (points[i+1].t - points[i].t);
    }
  }
  return null;
}

/** Color semántico según temperatura */
function tempColor(temp) {
  if (temp === null) return 'var(--text-muted)';
  if (temp < 40)  return 'var(--green)';
  if (temp < 55)  return 'var(--yellow)';
  return 'var(--red)';
}

/** Recomendar conector según amperaje */
function recommendConnector(amperes) {
  if (amperes <= 15) return 'XT30';
  if (amperes <= 40) return 'XT60';
  return 'XT90';
}

/* ============================================================
   9. RENDER DEL HOME
   ============================================================ */
function renderHome() {
  renderRecents();
  applyI18nToHome();
}

function applyI18nToHome() {
  const tagline = document.getElementById('home-tagline');
  if (tagline) tagline.textContent = t('home.tagline');

  // Módulos principales
  const moduleNames = ['balancer', 'decoder', 'calculator', 'designer',
                       'comparator', 'diagnosis', 'welder', 'solar'];
  moduleNames.forEach(m => {
    const nameEl = document.getElementById(`mod-name-${m}`);
    const descEl = document.getElementById(`mod-desc-${m}`);
    if (nameEl) nameEl.textContent = t(`mod.${m}.name`);
    if (descEl) descEl.textContent = t(`mod.${m}.desc`);
  });

  // Nav labels
  ['home','calculator','decoder','balancer','settings'].forEach(v => {
    const el = document.getElementById(`nav-label-${v}`);
    if (el) el.textContent = t(`nav.${v}`);
  });
}

function renderRecents() {
  const container = document.getElementById('recents-container');
  if (!container) return;

  if (!KupackApp.recents.length) {
    container.innerHTML = '<div class="empty-state" style="padding:12px 0;"><div class="empty-state-text" style="font-size:0.68rem">Sin actividad reciente</div></div>';
    return;
  }

  container.innerHTML = KupackApp.recents.slice(0, 5).map(r => `
    <div class="recent-chip" onclick="goTo('${r.type}')">
      <div class="recent-chip-dot" style="background:${r.color}"></div>
      <div class="recent-chip-text">${r.label}</div>
    </div>
  `).join('');
}

/* ============================================================
   10. IDIOMA — Actualizar toda la UI
   ============================================================ */
function setLanguage(lang) {
  KupackApp.prefs.lang = lang;
  savePrefs();
  applyI18nToHome();
  // Notificar a módulos si están activos
  document.dispatchEvent(new CustomEvent('kupack:langchange', { detail: lang }));
}

/* ============================================================
   11. BORRAR DATOS
   ============================================================ */
function clearHistory() {
  if (!confirm(t('confirm.clear_history'))) return;
  localStorage.removeItem(LS_HISTORY);
  KupackApp.recents = [];
  saveRecents();
  renderRecents();
  showToast(t('toast.cleared'));
}

function clearAllData() {
  if (!confirm(t('confirm.clear_all'))) return;
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith('kupack_')) keysToRemove.push(localStorage.key(i));
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
  KupackApp.recents = [];
  Object.assign(KupackApp.prefs, {
    theme:'dark', accent:'orange', fontsize:'normal', lang:'es',
    tempAlert:45, chemistry:'NMC', units:'metric', warnings:true,
  });
  applyTheme();
  renderRecents();
  showToast(t('toast.cleared'));
}

/* ============================================================
   12. INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Cargar preferencias guardadas
  loadPrefs();
  loadRecents();

  // Aplicar tema
  applyTheme();

  // Render inicial
  renderHome();

  // Ir al home
  goTo('home');

  // Gestos de swipe para volver al home (móvil)
  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 60 && touchStartX < 30 && KupackApp.currentView !== 'home') {
      goTo('home');
    }
  }, { passive: true });

  console.log(`🔋 KUPACK Suite v${KupackApp.version} — Ready`);
});

/* ============================================================
   13. EXPONER GLOBALES
   ============================================================ */
window.KupackApp   = KupackApp;
window.t           = t;
window.goTo        = goTo;
window.showToast   = showToast;
window.setTheme    = setTheme;
window.setAccent   = setAccent;
window.setFontSize = setFontSize;
window.setLanguage = setLanguage;
window.exportProject    = exportProject;
window.importProject    = importProject;
window.exportAllProjects = exportAllProjects;
window.clearHistory     = clearHistory;
window.clearAllData     = clearAllData;
window.addRecent        = addRecent;
window.copyToClipboard  = copyToClipboard;
window.fmt              = fmt;
window.toUserUnit       = toUserUnit;
window.interpolateTemp  = interpolateTemp;
window.tempColor        = tempColor;
window.recommendConnector = recommendConnector;
