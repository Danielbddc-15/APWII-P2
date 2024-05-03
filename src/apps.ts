const { PrismaClient } = require('@prisma/client');


import promptSync from 'prompt-sync';

const prisma = new PrismaClient();
const prompt = promptSync();

////////////////////////// AGREGAR DATOS A LA BD AUTOMATICAMENTE PARA USAR LA TRANSACCIONAL ////////////////////////////////
 /* async function main() {
  // Crear un nuevo cliente
 
 const Cliente = await prisma.cliente.create({
  data: {
    nombre: 'Ariel Castillo',
    identificacion: '1234568790'
    }
  });

  console.log('Cliente creado:', Cliente);

  // Crear un nuevo concepto
  const Concepto = await prisma.concepto.create({
    data: {
      descripcion: 'Compra de generador por cortes de luz'
    }
  });

  console.log('Concepto creado:', Concepto);
}

main()
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    });
*/

///////////////////////////////////// AGREGAR DATOS DE GASTO A LA BASE DE DATOS /////////////////////////////////////////
/*
// Definición de la función LLENAR para insertar elementos en la entidad Gasto
async function LLENAR() {
    const gastos = [];
  
    for (let i = 0; i < 1; i++) {
      // Solicitar datos al usuario por consola
      console.log(`Ingresa los datos para el gasto ${i + 1}:`);
      const clienteId = parseInt(prompt('ID del cliente: '));
      const conceptoId = parseInt(prompt('ID del concepto: '));
      const fecha = prompt('Fecha (DD/MM/AAAA): ');
      const hora = prompt('Hora (HH:MM:SS): ');
      const valorGastoStr = prompt('Valor del gasto: ');
      const valorGasto = parseFloat(valorGastoStr);
  
      // Verificar si la entrada es null antes de asignarla
      if (fecha !== null && hora !== null && valorGastoStr !== null) {
        // Agregar el nuevo gasto al array
        gastos.push({
          clienteId,
          conceptoId,
          fecha,
          hora,
          valorGasto
        });
      } else {
        console.log('Se ingresó un valor nulo. El gasto no se registrará.');
      }
    }
  
    // Insertar los gastos en la base de datos
    await prisma.gasto.createMany({
      data: gastos,
    });
  }
  
  // Llamar a la función LLENAR para insertar los gastos
  LLENAR()
    .then(() => {
      console.log('Gastos insertados correctamente.');
    })
    .catch((error) => {
      console.error('Error al insertar los gastos:', error);
    })
    .finally(async () => {
      await prisma.$disconnect(); // Desconectar Prisma al finalizar
    });
*/
//////////////////////////////////  BUSCAR POR ID EN LA TRANSACCIONAL ////////////////////////////////////////////
/*
// Define la interfaz para la entidad Gasto
interface Gasto {
    id: number;
    clienteId: number;
    conceptoId: number;
    fecha: string;
    hora: string;
    valorGasto: number;
  }
  
  // Función para buscar un gasto por su ID
  async function BUSCAR(id: number): Promise<void> {
    try {
      // Busca el gasto por su ID en la base de datos utilizando Prisma
      const gasto = await prisma.gasto.findUnique({
        where: {
          id: id,
        },
      });
  
      // Verifica si se encontró el gasto
      if (gasto) {
        // Muestra el gasto encontrado por consola
        console.log('Gasto encontrado:');
        console.log(gasto);
      } else {
        console.log(`No se encontró ningún gasto con el ID ${id}.`);
      }
    } catch (error) {
      console.error('Error al buscar el gasto:', error);
    } finally {
      // Desconecta Prisma al finalizar
      await prisma.$disconnect();
    }
  }
  
  // Llamar a la función BUSCAR con el ID deseado
  const transaccionId = parseInt(prompt('Ingrese el ID de la transacción a buscar: '));
  if (!isNaN(transaccionId)) {
    BUSCAR(transaccionId)
      .then(() => {
        console.log('Búsqueda completada.');
      })
      .catch((error) => {
        console.error('Error al buscar la transacción:', error);
      });
  } else {
    console.log('El ID de la transacción ingresado no es válido.');
  }
*/
////////////////////////////////////   CONSULTAR EN LA TRANSACCIONAL CON SUS TABLAS MAESTRAS   ////////////////////////////////////////////

// Define la interfaz para la entidad Gasto
// Define la interfaz para la entidad Gasto
interface Gasto {
    id: number;
    cliente: {
      id: number;
      nombre: string;
      identificacion: string;
      // otros atributos de cliente que desees mostrar
    };
    concepto: {
      id: number;
      descripcion: string;
      // otros atributos de concepto que desees mostrar
    };
    fecha: string;
    hora: string;
    valorGasto: number;
  }
  
  // Función para consultar todos los gastos con sus entidades relacionadas
  async function CONSULTAR(): Promise<void> {
    try {
      // Consulta todos los gastos con las entidades relacionadas (Cliente y Concepto)
      const gastos: Gasto[] = await prisma.gasto.findMany({
        include: {
          cliente: true,
          concepto: true,
        },
      });
  
      // Muestra los gastos con sus entidades relacionadas por consola
      console.log('Lista de Gastos:');
      gastos.forEach((gasto: Gasto) => { // Aquí se especifica el tipo de gasto como Gasto
        console.log(`ID: ${gasto.id}`);
        console.log(`Cliente: 
                     ID: ${gasto.cliente.id} 
                     Nombre: ${gasto.cliente.nombre} 
                     Identificación ${gasto.cliente.identificacion}`);
        console.log(`Concepto: 
                     ID: ${gasto.concepto.id} 
                     Descripción: ${gasto.concepto.descripcion}`);
        console.log(`Fecha: ${gasto.fecha}`);
        console.log(`Hora: ${gasto.hora}`);
        console.log(`Valor del Gasto: ${gasto.valorGasto}`);
        console.log('---------------------------------');
      });
    } catch (error) {
      console.error('Error al consultar los gastos:', error);
    } finally {
      // Desconecta Prisma al finalizar
      await prisma.$disconnect();
    }
  }
  
  // Llamar a la función CONSULTAR para mostrar todos los gastos
  CONSULTAR()
    .then(() => {
      console.log('Consulta completada.');
    })
    .catch((error) => {
      console.error('Error al realizar la consulta:', error);
    });
  