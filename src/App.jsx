import React, {useState, useEffect} from 'react'
import shortid from 'shortid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export function App() {
	// ESTADOS
	const [nombreP, setNombreP] = useState('')
	const [precioP, setPrecioP] = useState('')
	const [stockP, setStockP] = useState('')
	const [productos, setProductos] = useState([
		{id: 1, nombre: 'Harina', precio: '2000', stock: '3'},
		{id: 2, nombre: 'Azucar', precio: '3000', stock: '1'}
	])

	const [edicion, setEdicion] = useState(false)
	const [id, setId] = useState('')
	const [validacion, setValidacion] = useState(false)
	// FUNCIONES PRINCIPALES
	const agregarProducto = e => {
		e.preventDefault()
		if(!nombreP.trim() || !precioP.trim() || !stockP.trim()){
			setValidacion(true)
			return
		}
		setProductos([...productos, {id: shortid.generate(), nombre: nombreP, precio: precioP, stock: stockP}])
		setValidacion(false)
		setNombreP('')
		setPrecioP('')
		setStockP('')
	}

	const eliminarProducto = id =>{
		const productoFiltrado = productos.filter(producto => producto.id !== id)
		setProductos(productoFiltrado)
	}

	const editarProducto = producto =>{
		setEdicion(true)
		setNombreP(producto.nombre)
		setPrecioP(producto.precio)
		setStockP(producto.stock)
		setId(producto.id)
	}

	const actualizarProducto = e => {
		e.preventDefault()
		if(!nombreP.trim() || !precioP.trim() || !stockP.trim()){
			setValidacion(true)
			return
		}

		const productoActualizado = productos.map(producto => producto.id === id ? {id, nombre: nombreP, precio: precioP, stock: stockP} : producto)

		setProductos(productoActualizado)
		setEdicion(false)
		setValidacion(false)
		setNombreP('')
		setPrecioP('')
		setStockP('')
		console.log(productos);
	}
 	return (
		<Container maxWidth="lg">
		<Box m={4}>
      <Typography variant="h3" align="center" gutterBottom>Control de inventario</Typography>
		</Box>
			<Grid container spacing={3}>
				<Grid item md={4} sm={12}>
					<Card variant="outlined">
						<form onSubmit={edicion ? actualizarProducto: agregarProducto}>
							<CardContent>
							{ validacion ? (<Box m={2}><Typography color="error" variant="h5" gutterBottom>Rellene todos los campos!</Typography></Box>) : false }
								<Box m={2}>
									<TextField autoFocus fullWidth label="Nombre" value={nombreP} onChange={e => setNombreP(e.target.value)} variant="outlined" />
								</Box>
								<Box m={2}>
									<TextField fullWidth label="Precio" value={precioP} onChange={e => setPrecioP(e.target.value)} variant="outlined" />
								</Box>
								<Box m={2}>
									<TextField fullWidth label="Stock" value={stockP} onChange={e => setStockP(e.target.value)} variant="outlined" />
								</Box>
								<Box m={2}>
									{
										edicion ? (
											<Button fullWidth disableElevation color="secondary" size="large" variant="contained" type="submit">Actualizar</Button>
										) : (
											<Button fullWidth disableElevation size="large" variant="contained" type="submit">Agregar</Button>
										)
									}

								</Box>
							</CardContent>
						</form>
					</Card>
				</Grid>
				<Grid item md={8} sm={12}>
					<TableContainer>
					  <Table size="medium" aria-label="a dense table">
					    <TableHead>
					      <TableRow>
					        <TableCell>#</TableCell>
					        <TableCell align="right">Nombre</TableCell>
					        <TableCell align="right">Precio</TableCell>
					        <TableCell align="right">Stock</TableCell>
					        <TableCell align="right">Acciones</TableCell>
					      </TableRow>
					    </TableHead>
					    <TableBody>
					    {productos.map((rows, index) => (
					        <TableRow key={rows.id}>
					          <TableCell align="right">{index + 1}</TableCell>
					          <TableCell align="right">{rows.nombre}</TableCell>
					          <TableCell align="right">{rows.precio}</TableCell>
					          <TableCell align="right">{rows.stock}</TableCell>
					          <TableCell align="right">
					          	<Box m={1}>
					          		<Button fullWidth size="small" variant="contained" disableElevation color="primary" onClick={() => editarProducto(rows)}>Editar</Button>
					          	</Box>
					          	<Box m={1}>
					          		<Button fullWidth size="small" variant="contained" disableElevation color="secondary" onClick={() => eliminarProducto(rows.id)}>Eliminar</Button>
					          	</Box>
					          </TableCell>
					        </TableRow>
					    ))}
					    </TableBody>
					  </Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Container>
	)
}