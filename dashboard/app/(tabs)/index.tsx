import * as React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  DataTable,
  Divider,
  Drawer,
  Snackbar,
  Menu,
  Switch,
  Text,
  List,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';

type Row = { name: string; group: string; nfc: string; enabled: boolean };
type SectionKey = 'estadisticas' | 'alumnado' | 'profesorado' | 'nfc';

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
            transport:['No', 'Si', 'No'],
          },
          {
            group: '2º ESO A',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport:['Si', 'No', 'Si'],
          },
          {
            group: '2º ESO B',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '3º ESO A',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport:['Si', 'No', 'Si'],
          },
          {
            group: '3º ESO B',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '4º ESO A',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport:['Si', 'No', 'Si'],
          },
          {
            group: '4º ESO B',
            students: ['García, Ana', 'López, Marta', 'Díaz, Tomás'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '1º BACH CIENCIAS',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['Si', 'No', 'Si'],
          },
          {
            group: '1º BACH HUMANIDADES',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '2º BACH CIENCIAS',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['Si', 'No', 'Si'],
          },
          {
            group: '2º BACH HUMANIDADES',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '1º CFGM SMYR',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '2º CFGM SMYR',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '1º CFGM ACMN',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '2º CFGM ACMN',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },          {
            group: '1º CFGS DAM',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },          {
            group: '2º CFGS DAM',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
          },
          {
            group: '1º CFGS GFMN',
            students: ['Hernández, Pablo', 'Morales, Laura'],
            transport:['No', 'Si', 'No'],
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
              <View style={{ flex: 1, flexDirection: 'column'}}>
                <Text variant="labelSmall" style={{ opacity: 0.7 }}>Jefe de Estudios</Text>
                <Text variant="bodyMedium" style={{ marginTop: 4, fontStyle: 'italic'}}>Reinaldo González Hernández</Text>
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
          <Button onPress={() => {}} compact>
            Visión
          </Button>
          <Appbar.Action icon="magnify" onPress={() => {}} />
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
                      0
                    </Text>
                  </Card.Content>
                </Card>

                <Card style={styles.kpiCard}>
                  <Card.Content style={styles.kpiContent}>
                    <Text variant="labelSmall" style={styles.kpiText}>
                      Total de retrasos
                    </Text>
                    <Text variant="headlineMedium" style={styles.kpiText}>
                      0
                    </Text>
                  </Card.Content>
                </Card>
                <Card style={styles.kpiCard}>
                  <Card.Content style={styles.kpiContent}>
                    <Text variant="labelSmall" style={styles.kpiText}>
                      Total de alumnos en el recreo
                    </Text>
                    <Text variant="headlineMedium" style={styles.kpiText}>
                      0
                    </Text>
                  </Card.Content>
                </Card>                
                <Card style={styles.kpiCard}>
                  <Card.Content style={styles.kpiContent}>
                    <Text variant="labelSmall" style={styles.kpiText}>
                      Total de salidas anticipadas
                    </Text>
                    <Text variant="headlineMedium" style={styles.kpiText}>
                      0
                    </Text>
                  </Card.Content>
                </Card>
              </View>

              <Card style={styles.block}>
                <Card.Title
                  title="Control de acceso"
                  right={() => (
                    <Menu
                      visible={menuVisible}
                      onDismiss={closeMenu}
                      anchor={<Button onPress={openMenu}>Filtrar por</Button>}
                    >
                      <Menu.Item onPress={() => closeMenu()} title="Faltas" />
                      <Menu.Item onPress={() => closeMenu()} title="Retrasos" />
                      <Menu.Item onPress={() => closeMenu()} title="Recreo" />
                      <Menu.Item onPress={() => closeMenu()} title="Salidas anticipadas" />
                    </Menu>
                  )}
                />
                <Card.Content>
                  <View style={styles.chartPlaceholder}>
                    <Text variant="labelSmall">Gráficas (placeholder)</Text>
                  </View>
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
                      left={(props) => <List.Icon {...props} icon="folder" color="#c03415"/>}
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
                      left={(props) => <List.Icon {...props} icon="folder" color="#f2d725"/>}
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
                      left={(props) => <List.Icon {...props} icon="folder" color="#1565C0"/>}
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


        </ScrollView>

        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          action={{ label: 'OK', onPress: () => setSnackVisible(false) }}
        >
          Cambios guardados (demo)
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