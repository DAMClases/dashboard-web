import * as DocumentPicker from 'expo-document-picker';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  DataTable,
  Divider,
  Drawer,
  List,
  Menu,
  Snackbar,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';

type Row = { name: string; group: string; nfc: string; enabled: boolean };
type SectionKey = 'estadisticas' | 'alumnado' | 'profesorado' | 'nfc';

type ImportedUser = {
  id: string;
  name: string;
  municipio: string;
  transporte: boolean;
  desayuno: boolean;
  tarjetaFisica?: number;
  nfcId?: string;
};

type OdooCard = {
  id: number;
  numeroTarjeta: number;
  nfc: string;
  enUso: boolean;
};

export default function HomeScreen() {
  const theme = useTheme();

  // Sidebar
  const [activeSection, setActiveSection] = React.useState<SectionKey>('estadisticas');

  // Demo state
  const [snackVisible, setSnackVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Datos principales
  const [rows, setRows] = React.useState<Row[]>([
    { name: 'García, Ana', group: '2º BACH A', nfc: 'B4:42:3F:89', enabled: true },
    { name: 'Hernández, Pablo', group: '1º CFGS DAW', nfc: 'Sin vincular', enabled: false },
  ]);

  const [studentsData, setStudentsData] = React.useState<{ group: string; students: string[]; transport: string[] }[]>([]);

  const [teachersData, setTeachersData] = React.useState<{ department: string; teachers: string[] }[]>([]);
  const [teachersLoading, setTeachersLoading] = React.useState(false);

  const [loading, setLoading] = React.useState(false);


  // Adición JERO
  const [snackMessage, setSnackMessage] = React.useState(''); // Para mensajes personalizados del Snackbar

  const [dashboardData, setDashboardData] = React.useState<any>(null);

  // Guarda qué filtro estamos viendo ('faltas', 'retrasos', 'recreo', 'salidas_anticipadas')
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null); 
  const [loadingStats, setLoadingStats] = React.useState(false);

  React.useEffect(() => {
    if (activeSection === 'estadisticas') {
      cargarEstadisticas();
    }
  }, [activeSection]);

  const cargarEstadisticas = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${ODOO_URL}/api/ies/dashboard_data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ jsonrpc: '2.0', params: {} }),
      });
      const result = await response.json();
      
      if (result.result && result.result.status === 'success') {
        setDashboardData(result.result.data);
        // Por defecto, mostramos la lista de faltas al cargar
        setActiveFilter('faltas'); 
      } else {
        showSnackMsg('Error al cargar estadísticas');
      }
    } catch (error) {
      showSnackMsg('Error de red al cargar dashboard');
    }
    setLoadingStats(false);
  };

  // Datos para la pestaña NFC
  const [importData, setImportData] = React.useState<ImportedUser[]>([]);
  const [odooCards, setOdooCards] = React.useState<OdooCard[]>([
    { id: 1, numeroTarjeta: 1, nfc: 'A1:B2:C3:D4', enUso: true },
    { id: 2, numeroTarjeta: 2, nfc: 'F5:E6:D7:C8', enUso: false },
    { id: 3, numeroTarjeta: 3, nfc: '99:88:77:66', enUso: false },
    { id: 4, numeroTarjeta: 4, nfc: '11:22:33:44', enUso: false },
    { id: 5, numeroTarjeta: 5, nfc: 'AA:BB:CC:DD', enUso: false },
  ]);

  const showSnackMsg = (msg: string) => {
    setSnackMessage(msg);
    setSnackVisible(true);
  };
  // Adición JERO

  React.useEffect(() => {
    if (activeSection === 'alumnado') {
      setLoading(true);
      setTimeout(() => {
        setStudentsData([
          {
            group: '1º ESO A',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['Si', 'No', 'Si'],
          },
          {
            group: '1º ESO B',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '2º ESO A',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['Si', 'No', 'Si'],
          },
          {
            group: '2º ESO B',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '3º ESO A',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['Si', 'No', 'Si'],
          },
          {
            group: '3º ESO B',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '4º ESO A',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['Si', 'No', 'Si'],
          },
          {
            group: '4º ESO B',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '1º BACH CIENCIAS',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['Si', 'No', 'Si'],
          },
          {
            group: '1º BACH HUMANIDADES',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '2º BACH CIENCIAS',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['Si', 'No', 'Si'],
          },
          {
            group: '2º BACH HUMANIDADES',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '1º CFGM SMYR',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '2º CFGM SMYR',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '1º CFGM ACMN',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '2º CFGM ACMN',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          }, {
            group: '1º CFGS DAM',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          }, {
            group: '2º CFGS DAM',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          },
          {
            group: '1º CFGS GFMN',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport: ['No', 'Si', 'No'],
          },


        ]);
        setLoading(false);
      }, 1000); // Simula carga
    }
  }, [activeSection]);

  React.useEffect(() => {
    if (activeSection === 'profesorado') {
      setTeachersLoading(true);
      setTimeout(() => {
        setTeachersData([
          {
            department: 'Agrarias',
            teachers: [
              'Ana Asprón Nebreda',
              'María de los Reyes Díaz González',
              'Ifara Dorta Almenar',
              'Raúl Salcedo Madridejos',
              'Mónica Saorin Delgado',
              'Julia Esther Yance González'
            ]
          },
          {
            department: 'Biología y Geología',
            teachers: [
              'Carmen Dolores Hernández García',
              'Cristina Rodríguez Mendoza'
            ]
          },
          {
            department: 'Dibujo',
            teachers: [
              'Angel Melchor Domínguez Páez'
            ]
          },
          {
            department: 'Economía',
            teachers: [
              'Marcos Rodríguez de Ancos'
            ]
          },
          {
            department: 'Educación Física',
            teachers: [
              'Juan Carlos Hernández García'
            ]
          },
          {
            department: 'Filosofía',
            teachers: [
              'María del Mar Rodríguez González'
            ]
          },
          {
            department: 'Formacion y Orientación Laboral',
            teachers: [
              'Ancor García Rodríguez'
            ]
          },
          {
            department: 'Francés',
            teachers: [
              'Danielle Marie Segalen'
            ]
          },
          {
            department: 'Geografía e Historia',
            teachers: [
              'José Antonio Lima Cruz',
              'Jaime López Pérez'
            ]
          },
          {
            department: 'Informática',
            teachers: [
              'Lorena García Afonso',
              'Rayco Guerrero Dámaso',
              'Reinaldo González Hernández',
              'Arturo Juan Jiménez González',
              'María Dolores de León Ascensión',
              'Melissa Méndez Luis',
              'Susana Nieto Munguía'
            ]
          },
          {
            department: 'Inglés',
            teachers: [
              'María Jesús Delgado León',
              'Carmen Dolores Rodríguez Hernández',
              'Zenaida Sonia Yanes González'
            ]
          },
          {
            department: 'Lengua + Latín',
            teachers: [
              'Ana Belén González Toste',
              'Sandra María Gutiérrez Arrocha',
              'María Raquel Luis Trujillo',
              'Tatiana Pérez Fernández'
            ]
          },
          {
            department: 'Matemáticas',
            teachers: [
              'Vicente Estévez Mesa',
              'Tiffany López Nicholson',
              'Eva María Quintero Núñez',
              'Rafael Andrés Suárez Ruiz',
            ]
          },
          {
            department: 'Música',
            teachers: [
              'Alfonso Marín Romero'
            ]
          },
          {
            department: 'Orientación/Pedagogía Terapéutica',
            teachers: [
              'Paula Álvarez Alonso'
            ]
          },
          {
            department: 'Religión',
            teachers: [
              'Gustavo Márquez Carro'
            ]
          }
        ]);
        setTeachersLoading(false);
      }, 800);
    }
  }, [activeSection]);


  const toggleEnabled = (i: number) => {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], enabled: !next[i].enabled };
      return next;
    });
    setSnackVisible(true);
  };

  const toggleEnabledTransporte = (i: number) => {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], enabled: !next[i].enabled };
      return next;
    });
    setSnackVisible(true);
  };
  const getDepartmentIcon = (department: string) => {
    const icons: Record<string, string> = {
      'Informática': 'keyboard',
      'Matemáticas': 'calculator',
      'Agrarias': 'sprout',
      'Educación Física': 'run',
      'Música': 'music-note',
      'Biología y Geología': 'dna',
      'Dibujo': 'draw',
      'Economía': 'cash',
      'Filosofía': 'bank',
      'Formacion y Orientación Laboral': 'briefcase',
      'Francés': 'eiffel-tower',
      'Geografía e Historia': 'earth',
      'Inglés': 'chat-outline',
      'Lengua + Latín': 'book',
      'Orientación/Pedagogía Terapéutica': 'account-heart',
      'Religión': 'church',
    };

    const colors: Record<string, string> = {
      'Agrarias': '#4CAF50',
      'Biología y Geología': '#b4bb35',
      'Dibujo': '#9c27b0',
      'Economía': '#ff9800',
      'Educación Física': '#f44336',
      'Filosofía': '#3f51b5',
      'Formacion y Orientación Laboral': '#009688',
      'Francés': '#e91e63',
      'Geografía e Historia': '#795548',
      'Informática': '#2196f3',
      'Inglés': '#673ab7',
      'Lengua + Latín': '#ff5722',
      'Matemáticas': '#1612f8',
      'Música': '#00bcd4',
      'Orientación/Pedagogía Terapéutica': '#8bc34a',
      'Religión': '#607d8b',
    };

    return {
      icon: icons[department] || 'folder',
      color: colors[department],
    };
  };

  // --- LÓGICA NUEVA PARA LA SECCIÓN NFC ---

  const abrirExploradorArchivos = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'application/vnd.ms-excel'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const fileAsset = result.assets[0];

      if (fileAsset.file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const texto = e.target?.result as string;
          procesarTextoCSV(texto);
        };
        reader.readAsText(fileAsset.file, 'UTF-8');
      } else {
        const response = await fetch(fileAsset.uri);
        const texto = await response.text();
        procesarTextoCSV(texto);
      }
    } catch (err) {
      console.error("Error:", err);
      showSnackMsg('Error al leer el archivo.');
    }
  };

  const procesarTextoCSV = (csvText: string) => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return showSnackMsg('CSV vacío o inválido.');

    const headers = lines[0].split(';').map(h => h.replace(/"/g, '').trim());
    const parsedData: ImportedUser[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      const values = line.split(';').map(v => v.replace(/"/g, '').trim());
      const rowData: Record<string, string> = {};
      headers.forEach((header, index) => { rowData[header] = values[index]; });

      const fullName = `${rowData['Nombre'] || ''} ${rowData['Primer apellido'] || ''} ${rowData['Segundo apellido'] || ''}`.trim();
      const municipio = rowData['Municipio actual'] || 'DESCONOCIDO';
      const needsTransport = municipio.toUpperCase() !== 'SAN JUAN DE LA RAMBLA';

      if (fullName.length > 0) {
        parsedData.push({
          id: rowData['Nif - Nie'] || rowData['Cial'] || `ID-${i}`,
          name: fullName,
          municipio: municipio,
          transporte: needsTransport,
        });
      }
    }
    setImportData(parsedData);
    showSnackMsg(`Importados ${parsedData.length} alumnos.`);
  };

  const handleAutoFill = () => {
    if (importData.length === 0) return showSnackMsg('Primero importa un CSV.');

    let poolTarjetas = [...odooCards];
    let usuariosActualizados = [...importData];
    let asignadas = 0;

    usuariosActualizados = usuariosActualizados.map((user) => {
      if (user.tarjetaFisica) return user;
      const freeIndex = poolTarjetas.findIndex((c) => !c.enUso);

      if (freeIndex !== -1) {
        const tarjeta = poolTarjetas[freeIndex];
        poolTarjetas[freeIndex] = { ...tarjeta, enUso: true };
        asignadas++;
        return { ...user, tarjetaFisica: tarjeta.numeroTarjeta, nfcId: tarjeta.nfc };
      }
      return user;
    });

    if (asignadas > 0) {
      setImportData(usuariosActualizados);
      setOdooCards(poolTarjetas);
      showSnackMsg(`Asignadas ${asignadas} tarjetas.`);
    } else {
      showSnackMsg('No hay tarjetas libres.');
    }
  };

  // --- CREDENCIALES DE ODOO ---
  const ODOO_URL = 'https://10.102.11.155';
  const ODOO_DB = 'iesaccess';
  const ODOO_USER = 'admin@admin.com';
  const ODOO_PASS = 'admin';

  // --- LÓGICA PARA SUBIR A ODOO ---
  const subirDatosAOdoo = async () => {
    if (importData.length === 0) return showSnackMsg('No hay datos para subir.');
    showSnackMsg('Conectando con Odoo...');

    try {
      // 1. AUTENTICACIÓN
      const authResponse = await fetch(`${ODOO_URL}/web/session/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            db: ODOO_DB,
            login: ODOO_USER,
            password: ODOO_PASS,
          },
        }),
      });

      const authData = await authResponse.json();
      if (authData.error) {
        console.error("Error de Auth:", authData.error);
        return showSnackMsg('Error de autenticación. Revisa credenciales.');
      }

      // 2. PREPARAR DATOS Y ENVIARLOS
      let subidos = 0;
      let errores = 0;

      for (const user of importData) {
        
        let nfcLimpio;
        if (user.nfcId) {
            nfcLimpio = user.nfcId.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); 
            // Esto convierte "A1:B2:C3:D4" en "A1B2C3D4"
        }
        else{
            nfcLimpio = false;
        }

        const employeeData = {
          name: user.name,
          identification_id: user.id, 
          transporte: user.transporte, 
          barcode: nfcLimpio,
          custom_role: 'student'      
        };

        const createResponse = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              model: 'hr.employee',
              method: 'create',
              // OJO AQUÍ: Odoo espera una lista dentro de la lista de args [[ {...} ]]
              args: [[employeeData]], 
              kwargs: {},
            },
          }),
        });

        const createResult = await createResponse.json();
        
        // --- CONTROL DE ERRORES SILENCIOSOS ---
        if (createResult.error) {
            errores++;
            // Imprimimos el error exacto que escupe Odoo en la consola (Ej: Falta un campo obligatorio)
            console.error(`Odoo rechazó al alumno ${user.name}:`, createResult.error.data.message);
        } else {
            subidos++;
        }
      }

      if (errores > 0) {
        showSnackMsg(`Se subieron ${subidos} registros, pero fallaron ${errores}. Revisa la consola (F12).`);
      } else {
        showSnackMsg(`¡Éxito total! Se han subido ${subidos} registros a Odoo.`);
      }

    } catch (err) {
      console.error("Error de Red/Fetch:", err);
      showSnackMsg('Error crítico de conexión con Odoo.');
    }
  };

  const toggleTransporteImport = (index: number) => {
    setImportData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], transporte: !next[index].transporte };
      return next;
    });
  };

  const toggleDesayunoImport = (index: number) => {
    setImportData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], desayuno: !next[index].desayuno };
      return next;
    });
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.sidebar, { backgroundColor: theme.colors.surface }]}>
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={styles.sidebarTitle}>
            Panel de Control
          </Text>
          <Drawer.Section>
            <Drawer.Item label="Panel de Inicio" active={activeSection === 'estadisticas'} onPress={() => setActiveSection('estadisticas')} icon="view-dashboard-variant" />
            <Drawer.Item label="Alumnado" active={activeSection === 'alumnado'} onPress={() => setActiveSection('alumnado')} icon="account-group" />
            <Drawer.Item label="Profesorado" active={activeSection === 'profesorado'} onPress={() => setActiveSection('profesorado')} icon="account-tie" />
            <Drawer.Item label="Vinculación NFC" active={activeSection === 'nfc'} onPress={() => setActiveSection('nfc')} icon="nfc" />
          </Drawer.Section>
        </View>
        <Drawer.Section style={{ marginTop: 'auto' }}>
          <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#00000022', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image source={require('../../assets/images/f1.jpg')} style={{ width: 40, height: 40, borderRadius: 20 }} />
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text variant="labelSmall" style={{ opacity: 0.7 }}>Jefe de Estudios</Text>
                <Text variant="bodyMedium" style={{ marginTop: 4, fontStyle: 'italic' }}>Reinaldo González Hernández</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Drawer.Item label="Cerrar sesión" onPress={() => console.log('Cerrar sesión')} icon="logout" />
            <Drawer.Item label="Configuración de la cuenta" onPress={() => console.log('Configuración de la cuenta')} icon="cog-outline" />

          </View>
        </Drawer.Section>
      </View>


      {/* CONTENIDO DERECHA */}
      <View style={styles.content}>
        <Appbar.Header>
          <Appbar.Content title="IES San Juan de la Rambla" />
          <Button onPress={() => { }} compact>
            Visión
          </Button>
          <Appbar.Action icon="magnify" onPress={() => { }} />
        </Appbar.Header>

        <ScrollView contentContainerStyle={styles.container}>
          {/* ================== DASHBOARD ================== */}
          {activeSection === 'estadisticas' && (
            <>
              <View style={styles.kpiRow}>
                <Card style={styles.kpiCard}>
                  <Card.Content style={styles.kpiContent}>
                    <Text variant="labelSmall" style={styles.kpiText}>
                      Total de faltas
                    </Text>
                    <Text variant="headlineMedium" style={styles.kpiText}>
                      {dashboardData ? dashboardData.stats.faltas : '-'}
                    </Text>
                  </Card.Content>
                </Card>

                <Card style={styles.kpiCard}>
                  <Card.Content style={styles.kpiContent}>
                    <Text variant="labelSmall" style={styles.kpiText}>
                      Total de retrasos
                    </Text>
                    <Text variant="headlineMedium" style={styles.kpiText}>
                      {dashboardData ? dashboardData.stats.retrasos : '-'}
                    </Text>
                  </Card.Content>
                </Card>
                <Card style={styles.kpiCard}>
                  <Card.Content style={styles.kpiContent}>
                    <Text variant="labelSmall" style={styles.kpiText}>
                      Total de alumnos en el recreo
                    </Text>
                    <Text variant="headlineMedium" style={styles.kpiText}>
                      {dashboardData ? dashboardData.stats.recreo : '-'}
                    </Text>
                  </Card.Content>
                </Card>
                <Card style={styles.kpiCard}>
                  <Card.Content style={styles.kpiContent}>
                    <Text variant="labelSmall" style={styles.kpiText}>
                      Total de salidas anticipadas
                    </Text>
                    <Text variant="headlineMedium" style={styles.kpiText}>
                      {dashboardData ? dashboardData.stats.salidas_anticipadas : '-'}
                    </Text>
                  </Card.Content>
                </Card>
              </View>

              <Card style={styles.block}>
                <Card.Title
                  title="Control de acceso"
                  subtitle={
                    activeFilter 
                      ? `Mostrando: ${activeFilter.replace('_', ' ').toUpperCase()}` 
                      : 'Selecciona un filtro'
                  }
                  right={() => (
                    <Menu
                      visible={menuVisible}
                      onDismiss={closeMenu}
                      anchor={<Button onPress={openMenu} icon="filter">Filtrar por</Button>}
                    >
                      <Menu.Item onPress={() => { setActiveFilter('faltas'); closeMenu(); }} title="Faltas" />
                      <Menu.Item onPress={() => { setActiveFilter('retrasos'); closeMenu(); }} title="Retrasos" />
                      <Menu.Item onPress={() => { setActiveFilter('recreo'); closeMenu(); }} title="Recreo" />
                      <Menu.Item onPress={() => { setActiveFilter('salidas_anticipadas'); closeMenu(); }} title="Salidas anticipadas" />
                    </Menu>
                  )}
                />
                <Card.Content>
                  {loadingStats ? (
                    <ActivityIndicator style={{ margin: 20 }} />
                  ) : dashboardData && activeFilter ? (
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title style={{ flex: 2 }}>Alumno/a</DataTable.Title>
                        <DataTable.Title>Grupo</DataTable.Title>
                        <DataTable.Title>Edad</DataTable.Title>
                        <DataTable.Title>Estado</DataTable.Title>
                      </DataTable.Header>
                      
                      {/* Aquí leemos dinámicamente la lista seleccionada en el menú */}
                      {dashboardData.lists[activeFilter].length === 0 ? (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                          <Text style={{ color: 'gray' }}>No hay registros para este filtro.</Text>
                        </View>
                      ) : (
                        dashboardData.lists[activeFilter].map((student: any, index: number) => (
                          <React.Fragment key={student.id}>
                            <DataTable.Row>
                              <DataTable.Cell style={{ flex: 2 }}>{student.nombre}</DataTable.Cell>
                              <DataTable.Cell>{student.grupo}</DataTable.Cell>
                              <DataTable.Cell>
                                {student.mayor_edad ? (
                                  <Text style={{ color: 'green', fontWeight: 'bold' }}>+18</Text>
                                ) : (
                                  <Text style={{ color: 'red' }}>-18</Text>
                                )}
                              </DataTable.Cell>
                              <DataTable.Cell>
                                <Text style={{ fontStyle: 'italic', color: student.estado === 'FICHADO' ? 'green' : 'gray' }}>
                                  {student.estado}
                                </Text>
                              </DataTable.Cell>
                            </DataTable.Row>
                            {index < dashboardData.lists[activeFilter].length - 1 && <Divider />}
                          </React.Fragment>
                        ))
                      )}
                    </DataTable>
                  ) : (
                    <View style={styles.chartPlaceholder}>
                      <Text variant="labelSmall">Cargando datos del servidor...</Text>
                    </View>
                  )}
                </Card.Content>
              </Card>

              <Card style={styles.block}>
                <Card.Title title="Gestión rápida de permisos" right={() => <Button>Filtrar</Button>} />
                <Card.Content>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Alumno/a</DataTable.Title>
                      <DataTable.Title>Grupo</DataTable.Title>
                      <DataTable.Title>Transporte</DataTable.Title>
                      <DataTable.Title numeric>Permisos</DataTable.Title>
                    </DataTable.Header>
                    {rows.map((r, i) => (
                      <React.Fragment key={`${r.name}-${i}`}>
                        <DataTable.Row>
                          <DataTable.Cell>{r.name}</DataTable.Cell>
                          <DataTable.Cell>{r.group}</DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Switch
                              value={r.enabled}
                              onValueChange={() => toggleEnabledTransporte(i)}
                            />
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Switch value={r.enabled} onValueChange={() => toggleEnabled(i)} />
                          </DataTable.Cell>
                        </DataTable.Row>
                        {i < rows.length - 1 ? <Divider /> : null}
                      </React.Fragment>
                    ))}
                  </DataTable>
                </Card.Content>
              </Card>
            </>
          )}

          {/* ================== ALUMNADO (TREE VIEW) ================== */}
          {activeSection === 'alumnado' && (
            <Card style={styles.block}>
              <Card.Title title="Listado de Alumnado" />
              <Card.Content>
                {loading ? (
                  <ActivityIndicator animating />
                ) : (
                  <>
                    <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
                      Total de alumnos:{' '}
                      {studentsData.reduce((acc, g) => acc + g.students.length, 0)}
                    </Text>

                    {/* Nivel 1: ESO */}
                    <List.Accordion
                      title="ESO"
                      left={(props) => <List.Icon {...props} icon="folder" color="#c03415" />}
                    >
                      {studentsData
                        .filter((g) => g.group.includes('ESO'))
                        .map((group, i) => (
                          <List.Accordion
                            key={`eso-${i}`}
                            title={group.group}
                            left={(props) => (
                              <List.Icon {...props} icon="folder-account" />
                            )}
                          >
                            {group.students.map((student, j) => (
                              <List.Item
                                key={j}
                                title={student}
                                description={`Transporte: ${group.transport[j]}`}
                                left={(props) => (
                                  <List.Icon {...props} icon="account" />
                                )}
                              />
                            ))}
                          </List.Accordion>
                        ))}
                    </List.Accordion>

                    {/* Nivel 1: Bachillerato */}
                    <List.Accordion
                      title="Bachillerato"
                      left={(props) => <List.Icon {...props} icon="folder" color="#f2d725" />}
                    >
                      {studentsData
                        .filter((g) => g.group.includes('BACH'))
                        .map((group, i) => (
                          <List.Accordion
                            key={`bach-${i}`}
                            title={group.group}
                            left={(props) => (
                              <List.Icon {...props} icon="folder-account" />
                            )}
                          >
                            {group.students.map((student, j) => (
                              <List.Item
                                key={j}
                                title={student}
                                description={`Transporte: ${group.transport[j]}`}
                                left={(props) => (
                                  <List.Icon {...props} icon="account" />
                                )}
                              />
                            ))}
                          </List.Accordion>
                        ))}
                    </List.Accordion>

                    {/* Nivel 1: Ciclos formativos */}
                    <List.Accordion
                      title="Ciclos Formativos"
                      left={(props) => <List.Icon {...props} icon="folder" color="#1565C0" />}
                    >
                      {studentsData
                        .filter((g) => g.group.includes('CFGM') || g.group.includes('CFGS'))
                        .map((group, i) => (
                          <List.Accordion
                            key={`ciclos-${i}`}
                            title={group.group}
                            left={(props) => (
                              <List.Icon {...props} icon="folder-account" />
                            )}
                          >
                            {group.students.map((student, j) => (
                              <List.Item
                                key={j}
                                title={student}
                                description={`Transporte: ${group.transport[j]}`}
                                left={(props) => (
                                  <List.Icon {...props} icon="account" />
                                )}
                              />
                            ))}
                          </List.Accordion>
                        ))}
                    </List.Accordion>
                  </>
                )}
              </Card.Content>
            </Card>
          )}
          {/* ================== PROFESORADO (TREE VIEW) ================== */}
          {activeSection === 'profesorado' && (
            <Card style={styles.block}>
              <Card.Title title="Listado de Profesorado" />
              <Card.Content>
                {teachersLoading ? (
                  <ActivityIndicator animating />
                ) : (
                  <>
                    <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
                      Total de profesores:{' '}
                      {teachersData.reduce((acc, d) => acc + d.teachers.length, 0)}
                    </Text>

                    {teachersData.map((dept, i) => (
                      <List.Accordion
                        key={`dept-${i}`}
                        title={`${dept.department} (${dept.teachers.length})`}
                        left={(props) => {
                          const { icon, color } = getDepartmentIcon(dept.department);
                          return <List.Icon {...props} icon={icon} color={color} />;
                        }}
                      >
                        {dept.teachers.map((teacher, j) => (
                          <List.Item
                            key={j}
                            title={teacher}
                            left={(props) => <List.Icon {...props} icon="account-tie" />}
                          />
                        ))}
                      </List.Accordion>
                    ))}

                  </>
                )}
              </Card.Content>
            </Card>
          )}
        {activeSection === 'nfc' && (
            <Card style={styles.block}>
              <Card.Title 
                title="Validación de Datos e Inserción" 
                subtitle="Selecciona un archivo desde tu PC para iniciar"
                right={() => (
                  <View style={{ flexDirection: 'row', gap: 8, paddingRight: 16 }}>
                    <Button mode="outlined" icon="folder-open" onPress={abrirExploradorArchivos}>
                      1. Buscar archivo en PC
                    </Button>
                    <Button mode="contained-tonal" icon="auto-fix" onPress={handleAutoFill} disabled={importData.length === 0}>
                      2. Auto-asignar Tarjetas
                    </Button>
                    <Button 
                      mode="contained" 
                      icon="cloud-upload" 
                      onPress={subirDatosAOdoo}  // <-- CAMBIO AQUÍ
                      disabled={importData.length === 0}>
                      3. Subir a Odoo
                    </Button>
                  </View>
                )} 
              />
              <Card.Content>
                {importData.length === 0 ? (
                  <View style={{ padding: 40, alignItems: 'center' }}>
                    <Text variant="bodyLarge" style={{ color: 'gray' }}>No hay datos. Pulsa "Buscar archivo en PC".</Text>
                  </View>
                ) : (
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title style={{ flex: 2 }}>Nombre Completo</DataTable.Title>
                      <DataTable.Title>Municipio</DataTable.Title>
                      <DataTable.Title numeric>Transporte</DataTable.Title>
                      <DataTable.Title numeric>Desayuno</DataTable.Title>
                      <DataTable.Title numeric>Nº Tarjeta</DataTable.Title>
                      <DataTable.Title>Serial NFC</DataTable.Title>
                    </DataTable.Header>
                    {importData.map((row, i) => (
                      <React.Fragment key={`${row.id}-${i}`}>
                        <DataTable.Row>
                          <DataTable.Cell style={{ flex: 2 }}>{row.name}</DataTable.Cell>
                          <DataTable.Cell><Text numberOfLines={1} style={{ fontSize: 12 }}>{row.municipio}</Text></DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Switch value={row.transporte} onValueChange={() => toggleTransporteImport(i)} />
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Switch value={row.desayuno} onValueChange={() => toggleDesayunoImport(i)} />
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            {row.tarjetaFisica ? <Text style={{ fontWeight: 'bold' }}>#{row.tarjetaFisica}</Text> : <Text style={{ color: 'gray' }}>-</Text>}
                          </DataTable.Cell>
                          <DataTable.Cell>
                            {row.nfcId ? row.nfcId : <Text style={{ color: 'gray', fontStyle: 'italic' }}>Sin asignar</Text>}
                          </DataTable.Cell>
                        </DataTable.Row>
                        {i < importData.length - 1 ? <Divider /> : null}
                      </React.Fragment>
                    ))}
                  </DataTable>
                )}
              </Card.Content>
            </Card>
          )}

        </ScrollView>

        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          action={{ label: 'OK', onPress: () => setSnackVisible(false) }}
        >
          {snackMessage || 'Cambios guardados (demo)'}
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row' },
  sidebar: {
    width: 280,
    paddingTop: 12,
    paddingHorizontal: 8,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#00000022',
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
  },

  sidebarTitle: { paddingHorizontal: 8, paddingVertical: 8 },
  content: { flex: 1 },
  container: { padding: 16, gap: 12 },
  kpiRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  kpiCard: { flexGrow: 1, flexBasis: 220 },
  kpiContent: { alignItems: 'center' },
  kpiText: { textAlign: 'center' },
  block: { marginTop: 8 },
  chartPlaceholder: {
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});