const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const electron = require('electron'),
	path = require('path'),
	url = require('url'),
	shell=electron.shell;


// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let win

function createWindow () {
  // Créer le browser window.
  	win = new BrowserWindow({
		show: false,
		frame: false,
		icon: path.join(__dirname, 'assets/picto/icon.ico'),
		webPreferences: {
			nodeIntegration: true
		}
    })
	win.maximize()
	win.show()

  // et charge le index.html de l'application.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'src/album.html'),
		protocol: 'file:',
		slashes: true,
	}))
	//Créer la barre d'outils d'affichage miniature
	/* win.setThumbarButtons([
		{
			icon: path.join(__dirname, 'assets/picto/p.jpg'),
			click () {console.log('waouuuu cool')}
		},
		{
			icon: path.join(__dirname, 'assets/picto/n.jpg'),
			click () {console.log('C\'est encore super')}
		}
	]) */

	// Ouvre les DevTools.
	//win.webContents.openDevTools()

	// Émit lorsque la fenêtre est fermée.
	win.on('closed', () => {
	// Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
	// dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
	// où vous devez supprimer l'élément correspondant.
	win = null
	})
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.on('ready', createWindow)

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') 
  {
    app.quit()
  }
})

app.on('activate', () =>
{
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null)
  {
    createWindow()
  }
})

//Affiche le Menu principal au clic
ipcMain.on('display-app-menu', (event, arg) =>{
	var menu = Menu.buildFromTemplate([
		{
			label: 'Menu',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'CmdOrCtrl+R',
					role: 'forcereload'
				},
				{
					label: 'About',
					accelerator: 'F5',
					click: function (item, focuseWindow){
						if(focuseWindow){
							const options = {
								type: 'info',
								title:'YAH Playe 1.0.1 (shikamaru 2019)',
								buttons: ['Ok'],
								message: 'YAH Player est un lecteur multimedia desktop (Pc/Mac) de contenus protégés développé par YAH MEDIA & Partners.'
							}
							electron.dialog.showMessageBox(focuseWindow, options, function (){})
						}
					}
				},
				{type: 'separator'},
	
				{
					label: 'Exit',
					accelerator: 'CmdOrCtrl+Q',
					click: function (){
						app.quit();
					}
				},
			]
		},
	
		{
			label: 'Edit',
			role: 'window',
			submenu: [
				{
					label: 'Minimize window',
					accelerator: 'CmdOrCtrl+M',
					role: 'minimize'
				},
				{
					label:'Open the window again',
					accelerator: 'CmdOrCtrl+Shift+T',
					enabled: false,
					key: 'reopenMenuItem',
					click: function (){
						app.emit('activate')
					}
				},
				{
					label:'Toogle Fullscreen',
					accelerator: 'F11',
					role: 'togglefullscreen'
				},
				{type: 'separator'},
				{
					label: 'Zoom in',
					accelerator: 'CmdOrCtrl+Shift+=',
					role:'zoomin'
				},
				{
					label: 'Zoom out',
					accelerator: 'CmdOrCtrl+-',
					role:'zoomout'
				},
			]
		},
	
		{
			label: 'Visit',
			role: 'help',
			submenu: [{
				label: 'Visit  our web site',
				click: function (){
					shell.openExternal('https://yahmedia.media')
				}
			}]
		}
	])
	if (win){
		menu.popup(win, arg.x, arg.y)
	}
})